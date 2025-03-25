import { Trash } from '@obosbbl/grunnmuren-icons-react';
import { useFormValidation } from '@react-aria/form';
import { useFormReset, useUpdateEffect } from '@react-aria/utils';
import { useFormValidationState } from '@react-stately/form';
import { useControlledState } from '@react-stately/utils';
import { cx } from 'cva';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useField } from 'react-aria';
import {
  ButtonContext,
  FieldErrorContext,
  FormContext,
  InputContext,
  LabelContext,
  Provider,
  useSlottedContext,
} from 'react-aria-components';
import { ErrorMessage } from '../label';
import { ErrorMessageOrFieldError } from '../label/error-messsage-or-field-error';
import { type Locale, useLocale } from '../use-locale';
import { FileTrigger, type FileTriggerProps } from './file-trigger';

type FileUploadProps = Omit<FileTriggerProps, 'onSelect'> & {
  children: ReactNode;
  files?: File[];
  onChange?: Dispatch<SetStateAction<File[]>>;
  validate?: (files: File) => true | string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
};

type Translation = {
  [key in Locale]: string;
};

type Translations = {
  [x: string]: Translation;
};

const translations: Translations = {
  remove: {
    nb: 'Fjern',
    sv: 'Ta bort',
    en: 'Remove',
  },
};

/**
 * Converts an array of files to a DataTransfer object which can be used as a FileList.
 * This is necessary for setting the files on a native file input.
 * @param files An array of files
 * @returns The files as a DataTransfer object which can be used as a FileList
 */
function filesToDataTransfer(files: File[]) {
  const dataTransfer = new DataTransfer();
  for (const file of files) {
    dataTransfer.items.add(file);
  }
  return dataTransfer.files;
}

/**
 * Generates unique file names for files with the same original name.
 * Any duplicate files will have a number in parentheses appended to their name.
 * @param files An array of files
 * @returns An array of files with unique names
 */
function uniqueFileNames(files: File[]) {
  const fileNameCounts: { [key: string]: number } = {};
  return files.map((file) => {
    const fileName = file.name;
    // Filter out the extension and any trailing numbers in parentheses
    const baseName = fileName.replace(/\s*\(\d+\)|(\.[^.]+)$/g, '');
    // Extract the file extension
    const extension = fileName.match(/(\.[^.]+)$/)?.[0] || '';

    if (!fileNameCounts[baseName]) {
      // Extract any number from the file name (if any, otherwise default to 0)
      const baseNameCount = Number.parseInt(
        fileName.match(/\((\d+)\)/)?.[1] ?? '0',
      );
      fileNameCounts[baseName] = baseNameCount;
    }

    fileNameCounts[baseName]++;

    if (fileNameCounts[baseName] > 1) {
      return new File(
        [file],
        // Follow the pattern of adding a number in parentheses to the base name (e.g. "file (1).txt")
        `${baseName} (${fileNameCounts[baseName] - 1})${extension}`,
      );
    }

    return file;
  });
}

const FileUpload = ({
  children,
  files: _files,
  onChange,
  validate,
  isInvalid: _isInvalid,
  errorMessage,
  isRequired,
  allowsMultiple,
  ref,
  ...fileTriggerProps
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>(_files ?? []);

  const isInvalid = !!errorMessage || _isInvalid;

  const id = useId();
  const locale = useLocale();

  const _inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = ref ?? _inputRef;

  const slottedContext = useSlottedContext(FormContext) || {};
  const validationBehavior =
    fileTriggerProps.validationBehavior ??
    slottedContext.validationBehavior ??
    'native';

  const validateFiles = useCallback(
    (files: File[]) => {
      if (validate === undefined) return true;

      const errors = [] as string[];
      for (const file of files) {
        if (!validate) continue;
        const validation = validate(file);
        if (typeof validation === 'string') errors.push(validation);
      }
      if (errors.length === 0) return true;

      return errors;
    },
    [validate],
  );

  const validationState = useFormValidationState({
    ...fileTriggerProps,
    validationBehavior,
    validate: validateFiles,
    isRequired,
    isInvalid,
    value: _files ?? files ?? null,
  });

  const controlledOrUncontrolledFiles =
    // Use controlled files if they are provided, otherwise use internal files - but map them to File objects (remove validation prop)
    _files ?? files;
  useEffect(() => {
    // Keep the native file input in sync with the internal file state
    if (inputRef.current) {
      inputRef.current.files = filesToDataTransfer(
        controlledOrUncontrolledFiles,
      );
    }
  }, [controlledOrUncontrolledFiles, inputRef]);

  const { fieldProps } = useField({
    ...fileTriggerProps,
    validate: validateFiles,
    validationBehavior,
    isInvalid,
    errorMessage,
  });

  const [value, setValue] = useControlledState<File[]>(_files, [], onChange);
  useFormReset(inputRef, value, setValue);

  useFormValidation(
    {
      ...fileTriggerProps,
      validationBehavior,
      validate: validateFiles,
      isRequired,
      isInvalid,
    },
    validationState,
    inputRef,
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { displayValidation } = validationState;

  useUpdateEffect(() => {
    // Fixes a bug where validation state is not reset after being set to customError
    // This happens if the file upload ends up in an invalid state and then is emptied: the old valdiations is still lingering
    if (
      controlledOrUncontrolledFiles.length === 0 &&
      validationState.displayValidation.validationDetails.customError
    ) {
      validationState.commitValidation();
    }
  }, [controlledOrUncontrolledFiles]);

  return (
    <Provider values={[[FieldErrorContext, displayValidation]]}>
      <div
        data-slot="file-upload"
        className="group grid w-72 max-w-full gap-2"
        data-required={isRequired}
      >
        <Provider
          values={[
            [
              LabelContext,
              {
                htmlFor: id,
              },
            ],
            [
              ButtonContext,
              {
                // The button acts as the trigger for the file input, which is why we connect the label to the button id
                id,
                // Needed for RAC auto-focusing behavior to work
                ref: buttonRef,
                className: 'w-fit',
              },
            ],
            [InputContext, fieldProps],
          ]}
        >
          <FileTrigger
            {...fileTriggerProps}
            isRequired={isRequired}
            allowsMultiple={allowsMultiple}
            onSelect={(selectedFiles) => {
              if (selectedFiles === null) return;

              const newFiles = Array.from(selectedFiles);

              // For controlled component
              onChange?.((prevFiles) =>
                allowsMultiple
                  ? uniqueFileNames(prevFiles.concat(newFiles))
                  : newFiles,
              );

              // For internal file state
              setFiles((prevFiles) =>
                allowsMultiple
                  ? uniqueFileNames(prevFiles.concat(newFiles))
                  : newFiles,
              );
            }}
            isInvalid={isInvalid || validationState.displayValidation.isInvalid}
            ref={inputRef}
            // Delegate focus to the button when the hidden file input is focused (for RAC auto-focusing behavior)
            onFocus={() => buttonRef.current?.focus()}
          >
            {children}
          </FileTrigger>
        </Provider>
        <ul className="mt-4 grid gap-y-2">
          {controlledOrUncontrolledFiles.map((file, fileIndex) => {
            let fileName = file.name;
            if (
              fileTriggerProps.acceptDirectory &&
              file.webkitRelativePath !== ''
            ) {
              fileName = file.webkitRelativePath;
            }

            const validation = validate?.(file) ?? true;
            const hasError = validation !== true;

            return (
              <li key={fileName}>
                <div
                  className={cx(
                    'flex items-center justify-between gap-2 rounded-lg border-2 px-4 py-2',
                    hasError
                      ? 'border-red bg-red-light'
                      : 'border-gray bg-gray-lightest',
                  )}
                >
                  {fileName}{' '}
                  <button
                    className={cx(
                      '-m-2 grid h-11 w-11 shrink-0 place-items-center rounded-xl',
                      // Focus styles
                      'focus-visible:-outline-offset-8 focus-visible:outline-focus',
                    )}
                    onClick={() => {
                      // For controlled component
                      onChange?.((prevFiles) =>
                        prevFiles.filter((_, index) => index !== fileIndex),
                      );

                      // For internal file state
                      setFiles((prevFiles) =>
                        prevFiles.filter((_, index) => index !== fileIndex),
                      );

                      // Make sure screen readers doesn't loose track of focus
                      // (without this, the focus will be set to the top of the page for screen readers)
                      buttonRef.current?.focus();
                    }}
                    aria-label={translations.remove[locale]}
                    type="button"
                  >
                    <Trash />
                  </button>
                </div>
                {hasError && (
                  <ErrorMessage className="mt-1 block w-full">
                    {validation}
                  </ErrorMessage>
                )}
              </li>
            );
          })}
        </ul>
        {/*
          This is necessary since we want to display individual errors for each file based on the validate prop.
          But the FieldErrorContext is used to display the general error message for the entire component
          (this is the best way to leverage the built-in RAC form validation)
          We also want to enable the display of the general error message when there are no files selected (e.g. required but empty).
        */}
        {(controlledOrUncontrolledFiles.length === 0 || !!errorMessage) && (
          <ErrorMessageOrFieldError errorMessage={errorMessage} />
        )}
      </div>
    </Provider>
  );
};

export {
  FileUpload as UNSAFE_FileUpload,
  type FileUploadProps as UNSAFE_FileUploadProps,
};

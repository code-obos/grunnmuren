import { Trash } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {
  ButtonContext,
  FieldError,
  FieldErrorContext,
  FormContext,
  InputContext,
  Provider,
  useSlottedContext,
} from 'react-aria-components';
import { FileTrigger, type FileTriggerProps } from './file-trigger';
import { type Locale, useLocale } from '../use-locale';
import { ErrorMessage } from '../label';
import { formFieldError } from '../classes';
import { useFormValidation } from '@react-aria/form';
import { useFormValidationState } from '@react-stately/form';
import { useControlledState } from '@react-stately/utils';
import { useField } from 'react-aria';
import { useFormReset, useUpdateEffect } from '@react-aria/utils';

type Props = Omit<FileTriggerProps, 'onSelect'> & {
  label: string;
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
      fileNameCounts[baseName] = 0;
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
  label,
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
}: Props) => {
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
    'aria';

  const validateAll = (files: File[]) => {
    if (validate === undefined) return true;

    const errors = [] as string[];
    for (const file of files) {
      if (!validate) continue;
      const validation = validate(file);
      if (typeof validation === 'string') errors.push(validation);
    }
    if (errors.length === 0) return true;

    return errors;
  };

  const validationState = useFormValidationState({
    ...fileTriggerProps,
    validationBehavior,
    validate: validateAll,
    isRequired,
    isInvalid,
    value: _files ?? files ?? null,
  });

  useEffect(() => {
    // Keep the native file input in sync with the internal file state
    if (inputRef.current) {
      const controlledOrUncontrolledFiles =
        // Use controlled files if they are provided, otherwise use internal files - but map them to File objects (remove validation prop)
        _files ?? files.map((file) => new File([file], file.name));
      inputRef.current.files = filesToDataTransfer(
        controlledOrUncontrolledFiles,
      );
    }
  }, [files, _files, inputRef]);

  useUpdateEffect(() => {
    validationState.commitValidation();
  }, [files, _files]);

  const { errorMessageProps, fieldProps } = useField({
    ...fileTriggerProps,
    validate: validateAll,
    validationBehavior,
    isInvalid,
    errorMessage:
      errorMessage ?? validationState.displayValidation.validationErrors,
  });

  const [value, setValue] = useControlledState<File[]>(_files, [], onChange);
  useFormReset(inputRef, value, setValue);

  // TODO: Prevent the form from submitting if the file input is invalid
  // TODO: Dislpay error message when file input is required and empty
  useFormValidation(
    {
      ...fileTriggerProps,
      validationBehavior,
      validate: validateAll,
      isRequired,
      isInvalid,
    },
    validationState,
    inputRef,
  );

  return (
    <Provider values={[[FieldErrorContext, validationState.displayValidation]]}>
      <div
        data-slot="file-upload"
        className="group grid w-72 max-w-full gap-2"
        data-required={isRequired}
      >
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <Provider
          values={[
            [
              ButtonContext,
              {
                // The button acts as the trigger for the file input, which is why we connect the label to the button id
                id,
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
            isInvalid={isInvalid}
            ref={inputRef}
          >
            {children}
          </FileTrigger>
        </Provider>
        <ul className="mt-4 grid gap-y-2">
          {files.map((file, fileIndex) => {
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
        <FieldError {...errorMessageProps} className={formFieldError} />
      </div>
    </Provider>
  );
};

export { FileUpload as UNSAFE_FileUpload };

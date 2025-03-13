import { Trash } from '@obosbbl/grunnmuren-icons-react';
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
import {
  ButtonContext,
  FieldErrorContext,
  FormContext,
  InputContext,
  Provider,
  useSlottedContext,
} from 'react-aria-components';
import { FileTrigger, type FileTriggerProps } from './file-trigger';
import { type Locale, useLocale } from '../use-locale';
import { ErrorMessage } from '../label';
import { useFormValidation } from '@react-aria/form';
import { useFormValidationState } from '@react-stately/form';
import { useControlledState } from '@react-stately/utils';
import { useField } from 'react-aria';
import { useFormReset } from '@react-aria/utils';
import { ErrorMessageOrFieldError } from '../label/error-messsage-or-field-error';

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

  const content = (
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
              // Needed for RAC auto-focusing behavior to work
              ref: buttonRef,
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
      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </div>
  );

  // Conditionally render the validation context based on whether the component has individual file errors or a general error for the entire component
  // This is necessary since we want to display individual errors for each file based on the validate prop
  //  And the FieldErrorContext is used to display the general error message for the entire component (this is the best way to leverage the built-in RAC form validation)
  return displayValidation.validationDetails.customError ? (
    content
  ) : (
    <Provider values={[[FieldErrorContext, displayValidation]]}>
      {content}
    </Provider>
  );
};

export { FileUpload as UNSAFE_FileUpload };

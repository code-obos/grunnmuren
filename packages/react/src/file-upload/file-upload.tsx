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
 * Extracts a simple file extension from a file name or converts MIME type to extension
 * @param file The file object
 * @returns A simple file extension (e.g., "pdf", "jpg", "svg")
 */
function getFileExtension(file: File): string {
  const match = file.name.match(/\.([^.]+)$/);
  if (match) {
    return match[1].toUpperCase();
  }

  const mimeType = file.type;
  if (!mimeType) {
    return '';
  }

  const parts = mimeType.split('/');
  if (parts.length === 2) {
    const subtype = parts[1].split('+')[0]; // Handle cases like "svg+xml"
    return subtype.toUpperCase();
  }

  return '';
}

/**
 * Formats a file size in bytes to a human-readable string (B, KB, MB, GB, etc.)
 * @param bytes The file size in bytes
 * @returns A formatted string with the appropriate unit
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const base = 1024;
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
  const size = bytes / base ** unitIndex;

  return `${size.toFixed(2).replace(/\.?0+$/, '')} ${units[unitIndex]}`;
}

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
        10,
      );
      fileNameCounts[baseName] = baseNameCount;
    }

    fileNameCounts[baseName]++;

    if (fileNameCounts[baseName] > 1) {
      return new File(
        [file],
        // Follow the pattern of adding a number in parentheses to the base name (e.g. "file (1).txt")
        `${baseName} (${fileNameCounts[baseName] - 1})${extension}`,
        {
          type: file.type,
        },
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
        className="group grid gap-2"
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
        {controlledOrUncontrolledFiles.length > 0 && (
          <ul className="mt-4 grid max-w-fit gap-y-2">
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
                      'flex items-center justify-between gap-3 rounded-lg border p-1.5',
                      hasError ? 'border-red bg-red-light' : 'border-gray',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="footnote rounded-md border border-gray-light bg-gray-lightest px-2.5 py-2">
                        {getFileExtension(file)}
                      </div>
                      <div className="flex flex-col">
                        <span className="description truncate font-medium">
                          {fileName}
                        </span>
                        <span className="footnote text-gray-dark">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={translations.remove[locale]}
                      className={cx(
                        '-m-2 grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl',
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
        )}
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

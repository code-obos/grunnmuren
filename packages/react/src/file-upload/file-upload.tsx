import { Trash } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useId,
  useState,
} from 'react';
import {
  ButtonContext,
  FileTrigger,
  type FileTriggerProps,
  Provider,
} from 'react-aria-components';
import { type Locale, useLocale } from '../use-locale';
import { ErrorMessage } from '../label';

type Props = Omit<FileTriggerProps, 'onSelect'> & {
  label: string;
  children: ReactNode;
  files?: File[];
  onChange?: Dispatch<SetStateAction<File[]>>;
  validation?: (files: File) => true | string;
  isRequired?: boolean;
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

const FileUpload = ({
  label,
  children,
  files,
  onChange,
  validation,
  isRequired,
  ...fileTriggerProps
}: Props) => {
  const [_files, _setFiles] = useState(files ?? ([] as File[]));

  const id = useId();
  const locale = useLocale();

  return (
    <div data-slot="file-upload" className="group grid w-72 max-w-full gap-2">
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
        ]}
      >
        <FileTrigger
          {...fileTriggerProps}
          onSelect={(event) => {
            if (event === null) return;

            const files = Array.from(event);

            // For controlled component
            onChange?.((prevFiles) => prevFiles.concat(files));

            // For internal file state
            _setFiles((prevFiles) => prevFiles.concat(files));
          }}
        >
          {children}
        </FileTrigger>
      </Provider>
      <ul className="mt-4 grid gap-y-2">
        {_files.map((file, fileIndex) => {
          let fileName = file.name;
          if (
            fileTriggerProps.acceptDirectory &&
            file.webkitRelativePath !== ''
          ) {
            fileName = file.webkitRelativePath;
          }

          const error = validation === undefined || validation(file);
          const hasError = error !== true;
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
                    _setFiles((prevFiles) =>
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
                  {error}
                </ErrorMessage>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { FileUpload as UNSAFE_FileUpload };

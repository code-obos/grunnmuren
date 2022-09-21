import { useState } from 'react';
import { cx } from '@/utils';
import { InfoCircle } from '@obosbbl/grunnmuren-icons';
import { SnackbarButton } from '.';

export interface SnackbarProps {
  children?: React.ReactNode;

  id?: string;
  heading: string;

  closeSnackbar?: () => void;
}

export const Snackbar = (props: SnackbarProps) => {
  const { heading, children, closeSnackbar } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="container max-w-[59rem]">
      <div className="bg-orange-light rounded-lg p-4">
        <div className="snackbar grid items-center">
          <InfoCircle className="text-orange snackbar-icon mr-4 md:mr-8 md:text-2xl" />

          <h3
            className={cx(
              'snackbar-header min-w-0 max-w-prose text-base font-medium',
              {
                'overflow-hidden overflow-ellipsis whitespace-nowrap':
                  !isExpanded,
              },
            )}
          >
            {heading}
          </h3>

          <div className="snackbar-actions <md:mt-3 flex justify-end gap-4 md:ml-4">
            <SnackbarButton
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Les mindre' : 'Les mer'}
            </SnackbarButton>
            <SnackbarButton onClick={closeSnackbar}>Ok</SnackbarButton>
          </div>

          {isExpanded && children}
        </div>
      </div>
    </div>
  );
};

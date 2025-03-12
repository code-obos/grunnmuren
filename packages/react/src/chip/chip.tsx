import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cva } from 'cva';
import { type Ref, forwardRef, useCallback } from 'react';
import {
  Button,
  type TagGroupProps as RACTagGroupProps,
  type TagProps as RACTagProps,
  Tag,
  TagGroup,
  TagList,
} from 'react-aria-components';

const chipVariants = cva({
  base: [
    'inline-flex cursor-default items-center gap-2 rounded-lg font-medium text-sm transition-colors duration-200',
    'focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none',
    'bg-white text-black shadow-[inset_0_0_0_2px_#1e64b5]',
  ],
  variants: {
    /**
     * Whether the chip is selected
     * @default false
     */
    isSelected: {
      true: '!bg-sky !text-black',
      false: 'hover:shadow-[inset_0_0_0_2px_#004b45]',
    },
    /**
     * Whether the chip is removable
     * @default false
     */
    isRemovable: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    isSelected: false,
    isRemovable: false,
  },
});

const removeButtonVariants =
  'ml-1 flex items-center justify-center rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none';

export type ChipGroupProps = Omit<RACTagGroupProps, 'className'> & {
  /**
   * The selection mode of the chip group
   * @default single
   */
  selectionMode?: 'single' | 'multiple';
  /**
   * CSS classes to apply to the chip group
   */
  className?: string;
};

export type ChipProps = Omit<RACTagProps, 'className'> & {
  children: React.ReactNode;
  /**
   * The function to call when the chip is removed
   */
  onRemove?: (key: React.Key) => void;
  /**
   * CSS classes to apply to the chip
   */
  className?: string;
  /**
   * Whether the remove button should be hidden
   * @default false
   */
  hideRemoveButton?: boolean;
};

/**
 * A group component for Chip components that enables selection and organization of options.
 */
function ChipGroup(props: ChipGroupProps, ref: Ref<HTMLDivElement>) {
  const { selectionMode = 'single', className, children, ...restProps } = props;

  return (
    <TagGroup
      {...restProps}
      ref={ref}
      className={className}
      selectionMode={selectionMode}
    >
      <TagList className="flex flex-wrap gap-2">{children}</TagList>
    </TagGroup>
  );
}

/**
 * Interactive chip component for selections, filtering, and categorization.
 */
function Chip(props: ChipProps, ref: Ref<HTMLDivElement>) {
  const {
    onRemove,
    className,
    hideRemoveButton = false,
    children,
    ...restProps
  } = props;

  // Create a stable reference to the onRemove callback
  const handleRemove = useCallback(() => {
    if (onRemove && props.id) {
      onRemove(props.id);
    }
  }, [onRemove, props.id]);

  const isRemovable = !!onRemove && !hideRemoveButton;

  return (
    <Tag
      {...restProps}
      ref={ref}
      className={({ isSelected }) =>
        chipVariants({
          className,
          isSelected,
          isRemovable: false,
        })
      }
    >
      {
        <div className="flex items-center px-3 py-1.5">
          <span className="flex items-center gap-1 align-middle">
            {children}
          </span>
          {isRemovable && (
            <Button
              className={removeButtonVariants}
              onPress={handleRemove}
              aria-label="Remove"
              slot="remove"
            >
              <Close className="h-4 w-4" />
            </Button>
          )}
        </div>
      }
    </Tag>
  );
}

const _ChipGroup = forwardRef(ChipGroup);
const _Chip = forwardRef(Chip);

export { _ChipGroup as ChipGroup, _Chip as Chip };

import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cva } from 'cva';
import type { RefAttributes } from 'react';
import {
  Button,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  type TagGroupProps as RACTagGroupProps,
  TagList as RACTagList,
  type TagListProps as RACTagListProps,
  type TagProps as RACTagProps,
} from 'react-aria-components';

const tagVariants = cva({
  base: [
    'inline-flex cursor-pointer items-center gap-2 rounded-lg font-medium text-sm transition-colors duration-200',
    //Focus
    'focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none',
    //Border
    'shadow-[inset_0_0_0_2px_#002169]',
    //Backgrounds
    "hover:!bg-sky bg-white text-black aria-selected:bg-sky-light [&:has([slot='remove'])]:bg-sky-light",
  ],
});

const removeButtonStyling =
  'focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none flex w-full items-center px-3 py-1.5';

export type TagGroupProps = Omit<RACTagGroupProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * The selection mode of the tag group
     * @default single
     */
    selectionMode?: 'single' | 'multiple';
    /**
     * CSS classes to apply to the tag group
     */
    className?: string;
    /**
     * The function to call when the tag is removed
     */
    onRemove?: (key: React.Key) => void;
  };

//The usage of <object> here could probably be replaced with a generic for more type safety in usage
export type TagListProps = Omit<RACTagListProps<object>, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tag list
     */
    className?: string;
  };

export type TagProps = Omit<RACTagProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    /**
     * CSS classes to apply to the tag
     */
    className?: string;
  };

/**
 * A group component for Tag components that enables selection and organization of options.
 */
function TagGroup(props: TagGroupProps) {
  const { onRemove, selectionMode, className, children, ...restProps } = props;

  return (
    <RACTagGroup
      {...restProps}
      className={className}
      selectionMode={selectionMode}
      onRemove={onRemove}
    >
      {children}
    </RACTagGroup>
  );
}

/**
 * A container component for Tag components within a TagGroup.
 */
function TagList(props: TagListProps) {
  const { className = 'flex flex-wrap gap-2', children, ...restProps } = props;

  return (
    <RACTagList {...restProps} className={className}>
      {children}
    </RACTagList>
  );
}

/**
 * Interactive tag component for selections, filtering, and categorization.
 */
function Tag(props: TagProps) {
  const { className, children, ...restProps } = props;

  const spanStyling = 'flex items-center gap-1 align-middle';

  return (
    <RACTag
      {...restProps}
      className={tagVariants({
        className,
      })}
    >
      {({ allowsRemoving }) =>
        allowsRemoving ? (
          <Button className={removeButtonStyling} slot={'remove'}>
            <span className={spanStyling}>{children}</span>
            <Close className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <div className="flex items-center px-3 py-1.5">
            <span className={spanStyling}>{children}</span>
          </div>
        )
      }
    </RACTag>
  );
}

export {
  TagGroup as UNSAFE_TagGroup,
  TagList as UNSAFE_TagList,
  Tag as UNSAFE_Tag,
};

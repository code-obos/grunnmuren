import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx } from 'cva';
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
    'relative flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 font-medium text-sm transition-colors duration-200',
    //Focus
    'focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none',
    //Border
    'shadow-[inset_0_0_0_2px_#002169]',
    //Backgrounds
    'data-[hovered]:!bg-sky bg-white text-black aria-selected:bg-sky-light data-[allows-removing]:bg-sky-light',
    //Icons
    '[&_svg]:h-4 [&_svg]:w-4',
  ],
});

export type TagGroupProps = Omit<RACTagGroupProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tag group
     */
    className?: string;
    /**
     * The function to call when the tag is removed
     */
    onRemove?: (key: React.Key) => void;

    /**
     * The selection mode for the tag group
     * @default "single"
     */
    selectionMode?: 'single' | 'multiple';
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
  const {
    onRemove,
    selectionMode = 'single',
    className,
    children,
    ...restProps
  } = props;

  return (
    <RACTagGroup
      {...restProps}
      className={className}
      selectionMode={onRemove ? 'none' : selectionMode}
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
  const { className, children, ...restProps } = props;

  return (
    <RACTagList
      {...restProps}
      className={cx('flex flex-wrap gap-2', className)}
    >
      {children}
    </RACTagList>
  );
}

/**
 * Interactive tag component for selections, filtering, and categorization.
 */
function Tag(props: TagProps) {
  const { className, children, ...restProps } = props;

  const textValue = typeof children === 'string' ? children : undefined;

  return (
    <RACTag
      className={tagVariants({
        className,
      })}
      textValue={textValue}
      {...restProps}
    >
      {({ allowsRemoving }) =>
        allowsRemoving ? (
          <>
            {children}
            <Button
              className="outline-none after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0"
              slot="remove"
            >
              <Close className="ml-1" />
            </Button>
          </>
        ) : (
          children
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

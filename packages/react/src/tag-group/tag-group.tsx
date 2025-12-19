import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx } from 'cva';
import {
  Button,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  type TagGroupProps as RACTagGroupProps,
  TagList as RACTagList,
  type TagListProps as RACTagListProps,
  type TagProps as RACTagProps,
} from 'react-aria-components';
import type { RACTypeHelper } from '../type-helpers';

const tagVariants = cva({
  base: [
    'relative flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 font-medium text-sm transition-colors duration-200',
    // Resting
    'border-2 border-black bg-white text-black',
    //Focus
    'focus-visible:outline-focus-offset',
    // Hover
    'data-hovered:bg-sky',
    // Selected
    // Allows removing
    'data-allows-removing:border-transparent',
    'data-allows-removing:bg-blue',
    'data-allows-removing:data-hovered:bg-blue-dark',
    'data-allows-removing:text-white',
    // Selected
    'aria-selected:border-transparent',
    'aria-selected:bg-blue',
    'aria-selected:data-hovered:bg-blue-dark',
    'aria-selected:text-white',
    //Icons
    '[&_svg]:h-4 [&_svg]:w-4',
  ],
});

type TagGroupProps = {
  /**
   * @default "single"
   */
  selectionMode?: RACTagGroupProps['selectionMode'];
} & RACTypeHelper<RACTagGroupProps, HTMLDivElement>;

type TagListProps = RACTypeHelper<RACTagListProps<object>, HTMLDivElement>;

type TagProps = RACTypeHelper<RACTagProps, HTMLDivElement>;

/**
 * A group component for Tag components that enables selection and organization of options.
 */
function TagGroup(props: TagGroupProps) {
  const { selectionMode = 'single', children, ...restProps } = props;

  return (
    <RACTagGroup
      {...restProps}
      selectionMode={props.onRemove ? 'none' : selectionMode}
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
              className="cursor-pointer outline-none after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0"
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
  TagGroup,
  TagList,
  Tag,
  type TagGroupProps,
  type TagListProps,
  type TagProps,
};

import { Close } from "@obosbbl/grunnmuren-icons-react";
import { cva } from "cva";
import { type Ref, forwardRef, useCallback } from "react";
import {
  Button,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  type TagGroupProps as RACTagGroupProps,
  type TagProps as RACTagProps,
  TagList,
} from "react-aria-components";

const tagVariants = cva({
  base: [
    "inline-flex cursor-pointer items-center gap-2 rounded-lg font-medium text-sm transition-colors duration-200",
    "focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none",
    "shadow-[inset_0_0_0_2px_#002169]",
    "bg-white text-black aria-selected:bg-sky",
  ],
});

const removeButtonStyling =
  "focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none flex w-full items-center px-3 py-1.5";

export type TagGroupProps = Omit<RACTagGroupProps, "className"> & {
  /**
   * The selection mode of the tag group
   * @default single
   */
  selectionMode?: "single" | "multiple";
  /**
   * CSS classes to apply to the tag group
   */
  className?: string;
};

export type TagProps = Omit<RACTagProps, "className"> & {
  children: React.ReactNode;
  /**
   * The function to call when the tag is removed
   */
  onRemove?: (key: React.Key) => void;
  /**
   * CSS classes to apply to the tag
   */
  className?: string;
  /**
   * Whether the remove button should be hidden
   * @default false
   */
  hideRemoveButton?: boolean;
};

/**
 * A group component for Tag components that enables selection and organization of options.
 */
function TagGroup(props: TagGroupProps, ref: Ref<HTMLDivElement>) {
  const { selectionMode = "single", className, children, ...restProps } = props;

  return (
    <RACTagGroup
      {...restProps}
      ref={ref}
      className={className}
      selectionMode={selectionMode}
    >
      <TagList className="flex flex-wrap gap-2">{children}</TagList>
    </RACTagGroup>
  );
}

/**
 * Interactive tag component for selections, filtering, and categorization.
 */
function Tag(props: TagProps, ref: Ref<HTMLDivElement>) {
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
  const spanStyling = "flex items-center gap-1 align-middle";

  return (
    <RACTag
      {...restProps}
      ref={ref}
      className={tagVariants({
        className,
      })}
    >
      {isRemovable ? (
        <Button
          className={removeButtonStyling}
          onPress={handleRemove}
          slot={"remove"}
        >
          <span className={spanStyling}>{children}</span>
          <Close className="ml-1 h-4 w-4" />
        </Button>
      ) : (
        <div className="flex items-center px-3 py-1.5">
          <span className={spanStyling}>{children}</span>
        </div>
      )}
    </RACTag>
  );
}

const _TagGroup = forwardRef(TagGroup);
const _Tag = forwardRef(Tag);

export { _TagGroup as UNSAFE_TagGroup, _Tag as UNSAFE_Tag };

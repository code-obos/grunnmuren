import { Close } from "@obosbbl/grunnmuren-icons-react";
import { cva } from "cva";
import { type Ref, forwardRef, useCallback } from "react";
import {
  Button,
  type TagGroupProps as RACTagGroupProps,
  type TagProps as RACTagProps,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  TagList,
} from "react-aria-components";

const tagVariants = cva({
  base: [
    "inline-flex cursor-default items-center gap-2 rounded-lg font-medium text-sm transition-colors duration-200",
    "focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none",
    "bg-white text-black shadow-[inset_0_0_0_2px_#002169]",
  ],
  variants: {
    /**
     * Whether the tag is selected
     * @default false
     */
    isSelected: {
      true: "!bg-sky !text-black",
      false: "",
    },
    /**
     * Whether the tag is removable
     * @default false
     */
    isRemovable: {
      true: "cursor-pointer",
      false: "",
    },
  },
  defaultVariants: {
    isSelected: false,
    isRemovable: false,
  },
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

  return (
    <RACTag
      {...restProps}
      ref={ref}
      className={({ isSelected }) =>
        tagVariants({
          className,
          isSelected,
          isRemovable,
        })
      }
    >
      {isRemovable ? (
        <Button
          className={removeButtonStyling}
          onPress={handleRemove}
          slot={"remove"}
        >
          <span className="flex items-center gap-1 align-middle">
            {children}
          </span>
          <Close className="ml-1 h-4 w-4" />
        </Button>
      ) : (
        <div className="flex items-center px-3 py-1.5">
          <span className="flex items-center gap-1 align-middle">
            {children}
          </span>
        </div>
      )}
    </RACTag>
  );
}

const _TagGroup = forwardRef(TagGroup);
const _Tag = forwardRef(Tag);

export { _TagGroup as TagGroup, _Tag as Tag };

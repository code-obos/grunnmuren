import { Close } from "@obosbbl/grunnmuren-icons-react";
import { type VariantProps, cva } from "cva";
import { type Ref, forwardRef, useCallback } from "react";
import {
  Button,
  Tag,
  TagGroup,
  TagList,
  type TagGroupProps as RACTagGroupProps,
  type TagProps as RACTagProps,
} from "react-aria-components";

const chipVariants = cva({
  base: [
    "inline-flex cursor-default items-center gap-2 rounded-lg font-medium text-sm transition-colors duration-200",
    "focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none",
  ],
  variants: {
    /**
     * The variant of the chip
     * @default primary
     */
    variant: {
      primary: "",
      secondary: "shadow-[inset_0_0_0_2px]",
    },
    /**
     * The color variant of the chip
     * @default green
     */
    color: {
      green: "data-[focus-visible]:outline-focus",
      white:
        "data-[focus-visible]:outline-focus data-[focus-visible]:outline-white",
    },
    /**
     * Whether the chip is selected
     * @default false
     */
    isSelected: {
      true: "",
      false: "",
    },
    /**
     * Whether the chip is disabled
     * @default false
     */
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
      false: "",
    },
    /**
     * Whether the chip is removable
     * @default false
     */
    isRemovable: {
      true: "cursor-pointer",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      color: "green",
      className: "bg-green text-white hover:shadow-[inset_0_0_0_2px_#00524c]", //green-dark
    },
    {
      variant: "primary",
      color: "white",
      className: "bg-white text-black hover:shadow-[inset_0_0_0_2px_#bedfec]", //sky
    },
    {
      variant: "secondary",
      color: "green",
      className:
        "bg-white text-black shadow-green hover:shadow-green-dark active:shadow-green-dark",
    },
    {
      variant: "secondary",
      color: "white",
      className:
        "bg-transparent text-white shadow-white hover:shadow-sky active:shadow-sky",
    },
    {
      color: "green",
      isSelected: true,
      variant: "primary",
      className: "bg-green-dark",
    },
    {
      color: "white",
      isSelected: true,
      variant: "primary",
      className: "bg-sky",
    },
    {
      color: "green",
      isSelected: true,
      variant: "secondary",
      className: "bg-green text-white",
    },
    {
      color: "white",
      isSelected: true,
      variant: "secondary",
      className: "bg-white text-black",
    },
  ],
  defaultVariants: {
    color: "green",
    variant: "primary",
    isSelected: false,
    isDisabled: false,
    isRemovable: false,
  },
});

const removeButtonVariants = cva({
  base: [
    "ml-1 flex items-center justify-center rounded-full p-0.5",
    "focus-visible:outline-focus-offset [&:not([data-focus-visible])]:outline-none",
    "hover:bg-black/10",
  ],
});

export type ChipGroupProps = Omit<RACTagGroupProps, "className"> & {
  /**
   * The selection mode of the chip group
   * @default single
   */
  selectionMode?: "single" | "multiple";
  /**
   * CSS classes to apply to the chip group
   */
  className?: string;
};

export type ChipProps = Omit<RACTagProps, "className"> & {
  children: React.ReactNode;
  /**
   * The color variant of the chip
   * @default green
   */
  color?: VariantProps<typeof chipVariants>["color"];
  /**
   * The variant of the chip
   * @default primary
   */
  variant?: VariantProps<typeof chipVariants>["variant"];
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
  const { selectionMode = "single", className, children, ...restProps } = props;

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
    color = "green",
    variant = "primary",
    onRemove,
    className,
    hideRemoveButton = false,
    children,
    ...restProps
  } = props;

  // Create a stable reference to the onRemove callback
  const handleRemove = useCallback(() => {
    if (onRemove && props.id && !props.isDisabled) {
      onRemove(props.id);
    }
  }, [onRemove, props.id, props.isDisabled]);

  const isRemovable = !!onRemove && !hideRemoveButton;

  return (
    <Tag
      {...restProps}
      ref={ref}
      className={({ isSelected, isDisabled }) =>
        chipVariants({
          className,
          color,
          variant,
          isSelected,
          isDisabled,
          isRemovable: false,
        })
      }
    >
      {({ isDisabled }) => (
        <div className="flex items-center px-3 py-1.5">
          <span className="flex items-center gap-1 align-middle">
            {children}
          </span>
          {isRemovable && (
            <Button
              className={removeButtonVariants()}
              onPress={handleRemove}
              isDisabled={isDisabled}
              aria-label="Remove"
              slot="remove"
            >
              <Close className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </Tag>
  );
}

const _ChipGroup = forwardRef(ChipGroup);
const _Chip = forwardRef(Chip);

export { _ChipGroup as ChipGroup, _Chip as Chip };

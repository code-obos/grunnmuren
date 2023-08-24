---
to: packages/components/<%=name%>/src/<%=Name%>.tsx
---
import { cva, type VariantProps } from 'class-variance-authority';

const <%=name%>Variants = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {
    variant: undefined,
  },
});

export interface <%=Name%>Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, ''>,
    VariantProps<typeof <%=name%>Variants> {}

function <%=Name%>({ className, variant, ...props }: <%=Name%>Props) {
  return <div className={<%=name%>Variants({ className, variant })} {...props} />;
}

export { <%=Name%>, <%=name%>Variants };

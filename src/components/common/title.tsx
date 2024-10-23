import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const titleVariants = cva("text-center", {
  variants: {
    color: {
      white: "text-white",
      primary: "text-amber-300",
    },
    variant: {
      pageTitle: "text-4xl font-semibold uppercase",
      sectionTitle: "text-3xl font-semibold",
    },
  },
  defaultVariants: {
    color: "white",
    variant: "pageTitle",
  },
});

export type TitleProps = VariantProps<typeof titleVariants> &
  React.HTMLProps<HTMLHeadingElement>;

const Title = ({
  className,
  color,
  variant,
  children,
  ...props
}: TitleProps) => {
  const Comp = variant === "pageTitle" ? "h1" : "h2";
  return (
    <Comp
      className={cn(titleVariants({ color, variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
};
Title.displayName = "Title";

export { Title, titleVariants };

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const titleVariants = cva('text-center', {
  variants: {
    color: {
      white: 'text-white',
      primary: 'text-primary',
    },
    variant: {
      pageTitle: 'text-3xl md:text-4xl font-semibold uppercase',
      sectionTitle: 'text-2xl md:text-3xl font-semibold',
    },
  },
  defaultVariants: {
    color: 'white',
    variant: 'pageTitle',
  },
});

export type TitleProps = VariantProps<typeof titleVariants> &
  React.HTMLProps<HTMLHeadingElement>;

const Title: React.FC<TitleProps> = ({
  className,
  color,
  variant,
  children,
  ...props
}) => {
  const Comp = variant === 'pageTitle' ? 'h1' : 'h2';
  return (
    <Comp
      className={cn(titleVariants({ color, variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
};
Title.displayName = 'Title';

export { Title, titleVariants };

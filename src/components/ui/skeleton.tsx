import { cn } from '~/lib/utils';

export const Skeleton: React.FC = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-800', className)}
      {...props}
    />
  );
};

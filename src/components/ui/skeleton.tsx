import { cn } from '~/lib/utils';

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={cn('animate-pulse rounded-md bg-neutral-800', className)} />
  );
};

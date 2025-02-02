import { Skeleton } from '~/components/ui/skeleton';

const LinksLoading: React.FC = () => {
  return (
    <>
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
    </>
  );
};

export default LinksLoading;

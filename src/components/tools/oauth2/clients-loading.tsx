import { Skeleton } from '~/components/ui/skeleton';

const ClientsLoading: React.FC = () => {
  return (
    <>
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
    </>
  );
};

export default ClientsLoading;

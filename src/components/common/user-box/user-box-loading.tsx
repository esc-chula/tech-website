import { Skeleton } from '~/components/ui/skeleton';

const UserBoxLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-5">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};

export default UserBoxLoading;

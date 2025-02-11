import { Skeleton } from '~/components/ui/skeleton';

const QrCodeLoading: React.FC = () => {
  return (
    <>
      <Skeleton className="rounded-3xl w-full max-w-[350px] md:min-h-[420px] h-full" />
      <Skeleton className="rounded-3xl w-full max-w-[350px] md:min-h-[420px] h-full" />
      <Skeleton className="rounded-3xl w-full max-w-[350px] md:min-h-[420px] h-full" />
    </>
  );
};

export default QrCodeLoading;

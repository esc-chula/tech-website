import { Skeleton } from "../ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-8 w-40" />
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="aspect-[3/2] w-full" />
        <Skeleton className="aspect-[3/2] w-full" />
        <Skeleton className="aspect-[3/2] w-full" />
        <Skeleton className="aspect-[3/2] w-full" />
        <Skeleton className="aspect-[3/2] w-full" />
      </div>
    </div>
  );
}

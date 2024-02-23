import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="w-[320px] h-[229px] min-h-64 p-5 flex flex-col gap-2 justify-between text-ellipsis shadow-md dark:bg-zinc-900">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default CardSkeleton;

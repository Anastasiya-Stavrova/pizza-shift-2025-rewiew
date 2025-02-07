import { Skeleton } from "@/components";

export const BasketItemSkeleton = ({}) => {
  return (
    <div className={"w-full flex flex-row items-center gap-6"}>
      <Skeleton className="size-[63px] rounded-md bg-muted" />
      <Skeleton className="w-[750px] h-[63px] rounded-md bg-muted" />
      <Skeleton className="w-[50px] h-[50px] rounded-md bg-muted ml-auto" />
    </div>
  );
};

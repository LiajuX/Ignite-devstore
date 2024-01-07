import { Skeleton } from '@/components/skeleton'

export default function HomeLoading() {
  return (
    <div className="grid grid-rows-6 grid-cols-9 gap-6 h-full">
      <Skeleton className="row-span-6 col-span-6 h-[860px]" />

      <Skeleton className="row-span-3 col-span-3" />
      <Skeleton className="row-span-3 col-span-3" />
    </div>
  )
}

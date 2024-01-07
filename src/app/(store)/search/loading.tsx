'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { CurrentSearch } from './current-search'
import { Skeleton } from '@/components/skeleton'

export default function SearchLoading() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <CurrentSearch />
      </Suspense>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[480px]" />
      </div>
    </div>
  )
}

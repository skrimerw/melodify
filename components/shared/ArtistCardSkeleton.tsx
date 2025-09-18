import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ArtistCardSkeleton() {
  return (
    <div className='flex flex-col gap-4 items-center'>
        <Skeleton className='rounded-full aspect-square w-full' />
        <Skeleton className='h-4 w-20'/>
    </div>
  )
}

import { Skeleton } from '../ui/skeleton'

const MembersLoading: React.FC = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      <Skeleton className='flex h-14 w-36 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4'>
        <Skeleton className='h-10 w-10 rounded-full bg-white' />
      </Skeleton>
      <Skeleton className='flex h-14 w-36 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4'>
        <Skeleton className='h-10 w-10 rounded-full bg-white' />
      </Skeleton>
      <Skeleton className='flex h-14 w-36 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4'>
        <Skeleton className='h-10 w-10 rounded-full bg-white' />
      </Skeleton>
      <Skeleton className='flex h-14 w-36 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4'>
        <Skeleton className='h-10 w-10 rounded-full bg-white' />
      </Skeleton>
      <Skeleton className='flex h-14 w-36 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4'>
        <Skeleton className='h-10 w-10 rounded-full bg-white' />
      </Skeleton>
    </div>
  )
}

export default MembersLoading

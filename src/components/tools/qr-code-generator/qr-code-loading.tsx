import { Skeleton } from '~/components/ui/skeleton'

const QrCodeLoading: React.FC = () => {
  return (
    <>
      <Skeleton className='h-full w-full max-w-[350px] rounded-3xl md:min-h-[420px]' />
      <Skeleton className='h-full w-full max-w-[350px] rounded-3xl md:min-h-[420px]' />
      <Skeleton className='h-full w-full max-w-[350px] rounded-3xl md:min-h-[420px]' />
    </>
  )
}

export default QrCodeLoading

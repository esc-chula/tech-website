'use client'

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context'

const ContainerLines: React.FC = () => {
  const { offset } = useGridTunnelContext()

  return (
    <div className='pointer-events-none fixed inset-0 z-30 px-3 sm:px-8'>
      <div className='mx-auto h-screen max-w-screen-xl pl-[46.5px] sm:pl-[110px]'>
        <div
          className='flex h-full w-full justify-between duration-50'
          style={{
            height: `${Math.max(0, Math.min(100, (offset - 2500) / 7))}%`,
          }}
        >
          <div className='h-full w-0.5 bg-white/10' />
          <div className='h-full w-0.5 bg-white/10' />
        </div>
      </div>
    </div>
  )
}

export default ContainerLines

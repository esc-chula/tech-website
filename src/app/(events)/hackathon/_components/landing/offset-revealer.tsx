/* eslint-disable no-nested-ternary -- Ternary is used for conditional styling */

'use client'

import { cn } from '~/lib/utils'

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context'

interface OffsetRevealerProps {
  children: React.ReactNode
  className?: string
  offsetThreshold?: number
  zPosition?: number
}

const OffsetRevealer: React.FC<OffsetRevealerProps> = ({
  children,
  className,
  offsetThreshold,
  zPosition,
}) => {
  const { offset } = useGridTunnelContext()

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center text-center duration-500',
        className
      )}
      style={{
        opacity: offsetThreshold ? (offset > offsetThreshold ? 1 : 0) : 1,
        transform: `translateZ(${zPosition ?? 0}px)`,
      }}
    >
      {children}
    </div>
  )
}

export default OffsetRevealer

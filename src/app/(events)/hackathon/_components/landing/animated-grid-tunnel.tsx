'use client'

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context'
import GridTunnel from '../common/grid-tunnel'

interface AnimatedGridTunnelProps {
  children: React.ReactNode
}

const AnimatedGridTunnel: React.FC<AnimatedGridTunnelProps> = ({
  children,
}) => {
  const { offset, perspective } = useGridTunnelContext()

  return (
    <>
      <div
        className='sticky left-0 top-0 h-dvh w-screen overflow-hidden bg-hackathon-background'
        style={{
          zIndex: offset > 2100 ? -10 : 0,
        }}
      >
        <GridTunnel
          gradientSteps={2}
          offset={offset}
          perspective={perspective}
          squares={390}
        >
          {children}
        </GridTunnel>
      </div>
      <div className='h-[1570px]' />
    </>
  )
}

export default AnimatedGridTunnel

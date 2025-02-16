/* eslint-disable no-nested-ternary -- Ternary is used to determine opacity */

'use client'

import { cn } from '~/lib/utils'

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context'

interface SectionProps {
  children: React.ReactNode
  className?: string
  title: React.ReactNode
  offsetThreshold?: number
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  title,
  offsetThreshold,
}) => {
  const { offset } = useGridTunnelContext()

  return (
    <section
      className={cn('px-3 duration-700 sm:px-8', className)}
      style={{
        opacity: offsetThreshold ? (offset > offsetThreshold ? 1 : 0) : 1,
      }}
    >
      <div className='mx-auto flex max-w-screen-xl'>
        <div className='sticky top-0 h-screen w-12 sm:w-24'>
          <h2 className='select-none pt-8 font-ndot47 text-4xl [writing-mode:vertical-lr] sm:text-8xl'>
            {title}
          </h2>
        </div>
        <div className='min-h-screen w-full pb-32 pl-5 pr-4 sm:pb-40 sm:pl-8 sm:pr-5'>
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section

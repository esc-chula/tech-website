/* eslint-disable no-nested-ternary -- Ternary is used to determine opacity */

'use client';

import { cn } from '~/lib/utils';

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title: React.ReactNode;
  offsetThreshold?: number;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  title,
  offsetThreshold,
}) => {
  const { offset } = useGridTunnelContext();

  return (
    <section
      className={cn('duration-700 px-3 sm:px-8', className)}
      style={{
        opacity: offsetThreshold ? (offset > offsetThreshold ? 1 : 0) : 1,
      }}
    >
      <div className="mx-auto max-w-screen-xl flex">
        <div className="sticky w-12 sm:w-24 h-screen top-0">
          <h2 className="font-ndot47 pt-8 select-none text-4xl sm:text-8xl [writing-mode:vertical-lr]">
            {title}
          </h2>
        </div>
        <div className="min-h-screen pr-4 sm:pr-5 w-full pl-5 sm:pl-8 pb-32 sm:pb-40">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;

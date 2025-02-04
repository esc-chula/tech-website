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
    <div
      className={cn('duration-700 px-3 sm:px-8', className)}
      style={{
        opacity: offsetThreshold ? (offset > offsetThreshold ? 1 : 0) : 1,
      }}
    >
      <div className="mx-auto max-w-screen-xl flex">
        <div className="sticky w-14 sm:w-24 h-screen top-0">
          <h2 className="font-ndot47 text-5xl sm:text-8xl [writing-mode:vertical-lr]">
            {title}
          </h2>
        </div>
        <div className="min-h-screen pl-3 sm:pl-5">{children}</div>
      </div>
    </div>
  );
};

export default Section;

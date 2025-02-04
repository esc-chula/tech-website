'use client';

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context';

const ContainerLines: React.FC = () => {
  const { offset } = useGridTunnelContext();

  return (
    <div className="fixed inset-0 pointer-events-none px-3 sm:px-8">
      <div className="mx-auto max-w-screen-xl h-screen pl-[54px] sm:pl-24">
        <div
          className="w-full h-full flex justify-between duration-[50]"
          style={{
            // height from 0% to 100%, start from offset 1900 to 2600
            height: `${Math.max(0, Math.min(100, (offset - 1900) / 7))}%`,
          }}
        >
          <div className="w-0.5 h-full bg-white/10" />
          <div className="w-0.5 h-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default ContainerLines;

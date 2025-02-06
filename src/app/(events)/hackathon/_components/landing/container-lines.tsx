'use client';

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context';

const ContainerLines: React.FC = () => {
  const { offset } = useGridTunnelContext();

  return (
    <div className="fixed inset-0 pointer-events-none px-3 sm:px-8">
      <div className="mx-auto max-w-screen-xl h-screen pl-[46.5px] sm:pl-[110px]">
        <div
          className="w-full h-full flex justify-between duration-50"
          style={{
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

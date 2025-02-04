/* eslint-disable react/no-array-index-key -- Array index is used as key for grid cells */
'use client';

import { useGridTunnelContext } from '../../_contexts/grid-tunnel-context';

const gridSquares = Array(330).fill(0);

const walls = [
  // left
  {
    origin: 'bottom',
    transform: 'rotateY(90deg) rotateZ(90deg)',
    height: 'auto',
    width: '100vh',
    bottom: '50vh',
    left: '-50vh',
  },
  //   top
  {
    origin: 'bottom',
    transform: 'rotateX(-90deg) rotateZ(180deg)',
    height: 'auto',
    width: '100vw',
    bottom: '100%',
    left: '0px',
  },
  //   right
  {
    origin: 'bottom',
    transform: 'rotateY(-90deg) rotateZ(-90deg)',
    height: 'auto',
    width: '100vh',
    bottom: '50vh',
    right: '-50vh',
  },
  //   bottom
  {
    origin: 'bottom',
    transform: 'rotateX(90deg)',
    height: 'auto',
    width: '100vw',
    left: '0px',
    bottom: '0px',
  },
];

interface GridTunnelProps {
  children: React.ReactNode;
}

const GridTunnel: React.FC<GridTunnelProps> = ({ children }) => {
  const { offset, perspective } = useGridTunnelContext();

  return (
    <div
      className="top-0 left-0 sticky w-screen overflow-hidden h-dvh bg-hackathon-background"
      style={{
        zIndex: offset > 2100 ? -10 : 0,
      }}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: '100%',
          height: '100%',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${offset}px)`,
          }}
        >
          {children}
          {walls.map((wall, idx) => (
            <div
              key={`wall-${idx}`}
              className="absolute bg-gradient-to-t from-white/10 to-white/0 px-0.5 grid gap-x-1 gap-y-0.5 grid-cols-10 grid-rows-10"
              style={{
                transform: wall.transform,
                transformOrigin: wall.origin,
                width: wall.width,
                height: wall.height,
                left: wall.left ?? undefined,
                right: wall.right ?? undefined,
                bottom: wall.bottom,
              }}
            >
              {gridSquares.map((_, idx) => (
                <div
                  key={`cell-${idx}`}
                  className="bg-hackathon-background hover:bg-opacity-50 delay-50 duration-200 h-16"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridTunnel;

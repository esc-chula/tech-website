/* eslint-disable react/no-array-index-key -- Array index is used as key for grid cells */

'use client';

import { useEffect, useState } from 'react';

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
  children?: React.ReactNode;
  squares?: number;
  perspective?: number;
  offset?: number;
  gradientSteps?: 1 | 2;
}

const GridTunnel: React.FC<GridTunnelProps> = ({
  children,
  squares = 100,
  perspective = 500,
  offset = 0,
  gradientSteps = 1,
}) => {
  const [gridSquares, setGridSquares] = useState<number[]>([]);

  useEffect(() => {
    setGridSquares(Array(squares).fill(0));
  }, [squares]);

  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        perspective: `${perspective}px`,
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
            className="absolute px-0.5 grid gap-x-1 gap-y-0.5 grid-cols-10 grid-rows-10"
            style={{
              background:
                gradientSteps === 1
                  ? 'linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
                  : 'linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 33%, rgba(255,255,255,0.1) 66%, rgba(255,255,255,0) 100%)',
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
  );
};

export default GridTunnel;

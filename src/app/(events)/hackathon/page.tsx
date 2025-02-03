/* eslint-disable react/no-array-index-key -- Array index is used as key for grid cells */
'use client';

import React, { useEffect, useState } from 'react';

const gridSquares = Array(150).fill(0);

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

const Page: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = (): void => {
      setOffset(0.5 * window.scrollY);
    };

    // Attach scroll listener to start zooming tunnel just before appearance
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="h-[300vh]">
      <div className="fixed inset-0 w-full h-full bg-neutral-950">
        <div
          style={{
            perspective: '200px',
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
            {walls.map((wall) => (
              <div
                key={wall.origin}
                className="absolute bg-gradient-to-t from-white/10 to-white/0 px-1 grid gap-x-1 gap-y-0.5 grid-cols-10 grid-rows-10"
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
                {gridSquares.map((_, j) => (
                  <div key={`cell-${j}`} className="bg-neutral-950 h-16" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

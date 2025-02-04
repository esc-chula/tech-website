/* eslint-disable react/no-array-index-key -- Array index is used as key for grid cells */
'use client';

import React, { useEffect, useState } from 'react';

import HackathonTitle from '../common/hackathon-title';
import Button from '../ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      <GridTunnel>
        <div className="absolute inset-0 gap-8 sm:gap-10 md:gap-12 flex flex-col justify-center items-center text-center">
          <HackathonTitle className="text-5xl sm:text-6xl md:text-8xl pt-10 sm:pt-8 md:pt-4" />
          <Button className="cursor-default select-text">
            <span className="cursor-text">28 - 30 March 2025</span>
          </Button>
          {/* <Button>
            <span>Register</span>
            <span>{'->'}</span>
          </Button> */}
        </div>
      </GridTunnel>
      <div className="h-screen" />
    </div>
  );
};

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

interface GridTunnelProps {
  children: React.ReactNode;
}

const GridTunnel: React.FC<GridTunnelProps> = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [perspective, setPerspective] = useState(500);

  useEffect(() => {
    const onScroll = (): void => {
      console.log(window.scrollY);
      setOffset(1.2 * window.scrollY);
      setPerspective(Math.max(500 - window.scrollY * 0.9, 80));
    };

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="top-0 left-0 sticky w-screen h-screen bg-neutral-900">
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
                  className="bg-neutral-900 hover:bg-opacity-50 delay-50 duration-200 h-16"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

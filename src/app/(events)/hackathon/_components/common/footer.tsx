'use client';

import { useEffect, useRef, useState } from 'react';

import HackathonTitle from './hackathon-title';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight);
    }
  }, [footerRef]);

  return (
    <>
      <footer
        ref={footerRef}
        className="w-full border-y-2 h-72 sm:h-64 px-3 sm:px-8 border-white/10 bg-hackathon-background z-40 absolute bottom-0"
      >
        <div className="max-w-screen-xl mx-auto h-full flex flex-col text-center sm:text-left gap-5 sm:flex-row sm:items-center justify-center sm:justify-between">
          <HackathonTitle className="text-3xl sm:text-4xl md:text-5xl sm:pb-14" />
          <div className="sm:text-right">
            <p className="text-white/50 font-semibold text-sm">
              © 2025 All Rights Reserved
            </p>
            <br />
            <p className="text-white/50 font-semibold text-sm">
              Made in Intania,
              <br />
              Engineering Student Committee,
              <br />
              Chulalongkorn University
            </p>
          </div>
        </div>
      </footer>
      <div
        style={{
          height: footerHeight,
        }}
      />
    </>
  );
};

export default Footer;

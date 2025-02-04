'use client';

import { useEffect, useRef, useState } from 'react';

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
        className="w-full border-t-2 h-64 border-white/10 bg-hackathon-background z-40 absolute bottom-0"
      >
        footer
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

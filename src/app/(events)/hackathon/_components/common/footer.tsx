'use client'

import { useEffect, useRef, useState } from 'react'

import HackathonTitle from './hackathon-title'

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight)
    }
  }, [footerRef])

  return (
    <>
      <footer
        ref={footerRef}
        className='absolute bottom-0 z-40 h-72 w-full border-y-2 border-white/10 bg-hackathon-background px-3 sm:h-64 sm:px-8'
      >
        <div className='mx-auto flex h-full max-w-screen-xl flex-col justify-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left'>
          <HackathonTitle className='text-3xl sm:pb-14 sm:text-4xl md:text-5xl' />
          <div className='sm:text-right'>
            <p className='text-sm font-semibold text-white/50'>
              © 2025 All Rights Reserved
            </p>
            <br />
            <p className='text-sm font-semibold text-white/50'>
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
  )
}

export default Footer

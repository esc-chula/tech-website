'use client'

import Link from 'next/link'
import { Link as Scroll } from 'react-scroll'

const items = [
  { label: 'Hero', id: 'hero' },
  { label: 'Tech Month?', id: 'techmonth' },
  { label: 'Schedule', id: 'schedule' },
]

const Navigation: React.FC = () => {
  return (
    <nav className='sticky top-4 z-50 mt-[calc(100vh-72px)] hidden select-none justify-center font-tiny5 lg:flex'>
      <div className='flex h-14 w-full max-w-screen-md gap-4'>
        <div className='flex h-full w-full items-center justify-between bg-techmonth-white px-4 text-3xl'>
          {items.map((item) => (
            <Scroll
              key={item.label}
              smooth
              spy
              activeClass='bg-techmonth-green'
              className='cursor-pointer px-1 text-techmonth-black hover:bg-techmonth-magenta'
              duration={400}
              to={item.id}
            >
              {item.label}
            </Scroll>
          ))}
        </div>
        <Link
          className='grid h-full w-min place-content-center whitespace-nowrap bg-techmonth-yellow px-3 text-2xl text-techmonth-black duration-300 ease-in-out hover:translate-x-2'
          href='/techmonth/stamps'
        >
          {`COLLECT STAMP ->`}
        </Link>
      </div>
    </nav>
  )
}

export default Navigation

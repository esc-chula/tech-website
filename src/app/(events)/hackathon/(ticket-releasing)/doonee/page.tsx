import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Doonee',
}

const DooNeePage: React.FC = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center font-ndot47'>
      <p className='text-center font-semibold text-white'>
        ลองไปดูที่ <br />
        &quot;<span className='text-3xl'>/about</span>&quot;
      </p>
    </div>
  )
}

export default DooNeePage

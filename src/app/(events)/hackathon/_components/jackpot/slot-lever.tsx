import { motion } from 'framer-motion'
import React from 'react'

interface LeverProps {
  onPullEnd: () => void
}

const Lever: React.FC<LeverProps> = ({ onPullEnd }) => {
  return (
    <div className='relative flex h-[200px] w-[20px] items-start rounded-full bg-gray-300'>
      <motion.div
        animate={{ y: 0 }}
        className='h-[40px] w-[40px] cursor-pointer rounded-full shadow-lg'
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        initial={{ y: 0 }}
        style={{ backgroundColor: '#68141C' }}
        transition={{ type: 'spring', stiffness: 300, damping: 100 }}
        onDragEnd={onPullEnd}
      />
    </div>
  )
}

export default Lever

'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  href?: string
}

const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const router = useRouter()

  if (!href) {
    return (
      <button
        className='absolute bottom-6 left-3 aspect-square rounded-full border-2 border-white/10 bg-white/10 p-2 backdrop-blur-sm md:bottom-auto md:left-6 md:top-6'
        type='button'
        onClick={() => router.back()}
      >
        <ChevronLeft size={24} />
      </button>
    )
  }

  return (
    <Link
      className='absolute bottom-6 left-3 aspect-square rounded-full border-2 border-white/10 bg-white/10 p-2 backdrop-blur-sm md:bottom-auto md:left-6 md:top-6'
      href={href}
    >
      <ChevronLeft size={24} />
    </Link>
  )
}

export default BackButton

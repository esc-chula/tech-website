import { SiInstagram, SiLine } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

const Socials: React.FC = () => {
  return (
    <div className='sm:auto fixed bottom-2 left-2 z-50 flex h-20 flex-col justify-around rounded-2xl border-2 border-white/10 bg-black/5 p-2 backdrop-blur-lg sm:bottom-3.5 sm:left-3.5 sm:h-auto sm:w-28 sm:flex-row sm:rounded-3xl sm:p-4'>
      <Link
        className='scale-75 sm:scale-100'
        href='https://instagram.com/intania.tech'
        rel='noopener noreferrer'
        target='_blank'
      >
        <SiInstagram size={24} />
      </Link>
      <Link
        className='scale-75 sm:scale-100'
        href='https://line.me/ti/g2/nbKZtxj5NALJoZyzb-WuByWoqw6Gpj5ES3MUhg'
        rel='noopener noreferrer'
        target='_blank'
      >
        <SiLine size={24} />
      </Link>
    </div>
  )
}

export default Socials

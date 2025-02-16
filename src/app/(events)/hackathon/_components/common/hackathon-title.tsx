import { cn } from '~/lib/utils'

interface HackathonTitleProps {
  className?: string
}

const HackathonTitle: React.FC<HackathonTitleProps> = ({ className }) => {
  return (
    <span className={cn('select-none font-ndot47 text-5xl', className)}>
      INTANIA
      <br />
      HACKATH<span className='text-hackathon-primary'>0</span>N
    </span>
  )
}

export default HackathonTitle

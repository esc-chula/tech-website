import { cn } from '~/lib/utils';

interface HackathonTitleProps {
  className?: string;
}

const HackathonTitle: React.FC<HackathonTitleProps> = ({ className }) => {
  return (
    <span className={cn('text-5xl font-ndot47 select-none', className)}>
      INTANIA
      <br />
      HACKATH<span className="text-hackathon-primary">0</span>N
    </span>
  );
};

export default HackathonTitle;

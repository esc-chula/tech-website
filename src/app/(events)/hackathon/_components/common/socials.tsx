import { SiInstagram, SiLine } from '@icons-pack/react-simple-icons';
import Link from 'next/link';

const Socials: React.FC = () => {
  return (
    <div className="fixed left-3.5 flex justify-around bottom-3.5 z-50 bg-black/5 backdrop-blur-lg rounded-3xl border-2 border-white/10 w-28 p-4">
      <Link
        href="https://instagram.com/intania.tech"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SiInstagram size={24} />
      </Link>
      <Link
        href="https://line.me/ti/g2/nbKZtxj5NALJoZyzb-WuByWoqw6Gpj5ES3MUhg"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SiLine size={24} />
      </Link>
    </div>
  );
};

export default Socials;

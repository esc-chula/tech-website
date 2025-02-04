import { SiInstagram, SiLine } from '@icons-pack/react-simple-icons';
import Link from 'next/link';

const Socials: React.FC = () => {
  return (
    <div className="fixed left-2 bottom-2 sm:left-3.5 sm:bottom-3.5 flex flex-col sm:flex-row justify-around z-50 bg-black/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-white/10 h-20 sm:h-auto sm:auto sm:w-28 p-2 sm:p-4">
      <Link
        className="scale-75 sm:scale-100"
        href="https://instagram.com/intania.tech"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SiInstagram size={24} />
      </Link>
      <Link
        className="scale-75 sm:scale-100"
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

import Image from 'next/image';
import Link from 'next/link';

interface MemberButtonProps {
  nameTag: string;
  url: string;
  imgLink: string;
}

const MemberButton: React.FC<MemberButtonProps> = ({
  nameTag,
  url,
  imgLink,
}) => {
  return (
    <Link
      className="flex h-14 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt={`${nameTag}-profile`}
        className="h-10 w-10 rounded-full bg-white"
        height={300}
        src={imgLink}
        width={300}
      />
      <p>{nameTag}</p>
    </Link>
  );
};

export default MemberButton;

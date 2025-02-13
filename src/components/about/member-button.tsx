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
      className="flex h-12 md:h-14 text-xs sm:text-sm md:text-base items-center justify-start gap-2 sm:gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-3 sm:px-4"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt={`${nameTag}-profile`}
        className="w-8 sm:w-10 aspect-square rounded-full bg-white"
        height={300}
        src={imgLink}
        width={300}
      />
      <p>{nameTag}</p>
    </Link>
  );
};

export default MemberButton;

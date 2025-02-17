import Image from 'next/image'
import Link from 'next/link'

interface MemberButtonProps {
  nameTag: string
  url: string
  imgLink: string
}

const MemberButton: React.FC<MemberButtonProps> = ({
  nameTag,
  url,
  imgLink,
}) => {
  return (
    <Link
      className='flex h-12 items-center justify-start gap-2 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-3 text-xs sm:gap-4 sm:px-4 sm:text-sm md:h-14 md:text-base'
      href={url}
      rel='noopener noreferrer'
      target='_blank'
    >
      <Image
        alt={`${nameTag}-profile`}
        className='aspect-square w-8 rounded-full bg-white sm:w-10'
        height={300}
        src={imgLink}
        width={300}
      />
      <p>{nameTag}</p>
    </Link>
  )
}

export default MemberButton

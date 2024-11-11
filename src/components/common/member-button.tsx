import Link from "next/link";
import Image from "next/image";

export const MemberButton = ({
  nameTag,
  url,
  imgLink,
}: {
  nameTag: string;
  url: string;
  imgLink: string;
}) => {
  return (
    <Link
      href={url}
      className="flex h-14 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4"
    >
      <Image
        src={imgLink}
        width={300}
        height={300}
        alt={`${nameTag}-profile`}
        className="h-10 w-10 rounded-full bg-white"
      />
      <p>{nameTag}</p>
    </Link>
  );
};

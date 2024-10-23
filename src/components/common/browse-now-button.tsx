import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const BrowseNowButton = ({
  className,
  link,
}: {
  className?: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      className={cn(
        "flex h-10 w-40 items-center justify-center space-x-2 rounded-lg bg-gradient-to-t from-[#262626] to-[#404040] p-2 text-sm font-semibold text-white",
        className,
      )}
    >
      <p>
        Browse <span className="font-bold">Now</span>
      </p>
      <ExternalLink color="yellow" />
    </Link>
  );
};

import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

export const ViewRepo = ({
  className,
  link,
}: {
  className?: string;
  link: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className={cn(
        "flex h-10 w-40 items-center justify-center space-x-2 rounded-lg border-[4px] border-[#404040] p-2 text-sm font-semibold text-white",
        className,
      )}
    >
      <Github color="yellow" />
      <p>
        View <span className="font-bold">Repo</span>
      </p>
    </a>
  );
};
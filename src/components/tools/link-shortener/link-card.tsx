import Card from "@/components/ui/card";
import Link from "next/link";
import CopyButton from "./copy-button";
import { Eye } from "lucide-react";

interface LinkCardProps {
  editedAt: Date;
  name?: string;
  url: string;
  slug: string;
  count: number;
}

export default function LinkCard({
  editedAt,
  name,
  url,
  slug,
  count,
}: LinkCardProps) {
  return (
    <Card className="relative h-36 space-y-1">
      <CopyButton
        value={`https://intania.link/${slug}`}
        className="absolute right-4 top-4"
      />
      <Link href={`/tools/link-shortener/${slug}`} className="h-full space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between">
            <h3 className="space-x-0.5 truncate text-xl font-semibold">
              <span className="hidden text-neutral-500 sm:inline">
                intania.link
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-amber-300">{slug}</span>
            </h3>
          </div>
          <p className="truncate font-medium">{name}</p>
          <p className="truncate text-xs text-neutral-500">{url}</p>
        </div>
        <div className="flex items-center justify-between gap-1 text-neutral-500">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <p className="text-xs sm:text-sm">{count}</p>
          </div>
          <p className="text-xs sm:text-sm">
            {editedAt.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </Link>
    </Card>
  );
}

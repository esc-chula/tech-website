import Card from "@/components/ui/card";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface LinkCardProps {
  editedAt: Date;
  name?: string;
  url: string;
  slug: string;
}

export default function LinkCard({ editedAt, name, url, slug }: LinkCardProps) {
  return (
    <Card className="h-32 space-y-1">
      <div className="flex justify-between">
        <Link
          href={`https://intania.link/${slug}`}
          target="_blank"
          className="space-x-0.5 truncate text-xl font-semibold"
        >
          <span className="text-neutral-500">/</span>
          <span className="text-amber-300">{slug}</span>
        </Link>
        <div className="flex items-center gap-1">
          <Ellipsis size={16} />
        </div>
      </div>
      <p className="truncate font-medium">{name}</p>
      <p className="truncate text-xs text-neutral-500">{url}</p>
      <div className="flex items-center justify-end gap-1 text-neutral-500">
        <p className="text-sm">
          {editedAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </Card>
  );
}

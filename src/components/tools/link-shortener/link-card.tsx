import { Eye } from 'lucide-react';
import Link from 'next/link';
import { env } from 'next-runtime-env';

import { Card } from '~/components/ui/card';

import CopyButton from './copy-button';

const SHORTENED_LINK_ORIGIN =
  env('NEXT_PUBLIC_SHORTENED_LINK_ORIGIN') ?? 'https://intania.link';

interface LinkCardProps {
  editedAt: Date;
  name?: string;
  url: string;
  slug: string;
  count: number;
}

const LinkCard: React.FC<LinkCardProps> = ({
  editedAt,
  name,
  url,
  slug,
  count,
}) => {
  return (
    <Card className="relative space-y-1">
      <CopyButton
        className="absolute right-4 top-4 h-auto p-0 hover:bg-transparent"
        value={`${SHORTENED_LINK_ORIGIN}/${slug}`}
      />
      <Link className="h-full space-y-3" href={`/tools/link-shortener/${slug}`}>
        <div className="space-y-1">
          <div className="flex justify-between">
            <h3 className="space-x-0.5 truncate text-xl font-semibold">
              <span className="hidden text-neutral-500 sm:inline">
                {SHORTENED_LINK_ORIGIN.split('//')[1]}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-primary">{slug}</span>
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
            {editedAt.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default LinkCard;

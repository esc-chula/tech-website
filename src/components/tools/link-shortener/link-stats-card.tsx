'use client';

import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Card } from '~/components/ui/card';
import { utmTags } from '~/constants/link-shortener';
import { groupUtmData } from '~/lib/link-shortener';
import { cn } from '~/lib/utils';
import type {
  ShortenedLinkWithVisitedRecords,
  UtmTag,
} from '~/types/link-shortener';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

import LinkStats from './link-stats';

interface LinkStatsCardProps {
  className?: string;
  shortenedLink: ShortenedLinkWithVisitedRecords;
}

const LinkStatsCard: React.FC<LinkStatsCardProps> = ({
  className,
  shortenedLink,
}) => {
  const [groupBy, setGroupBy] = useState<UtmTag[1] | ''>('');
  const links = shortenedLink.userShortenedLinkVisitedRecords;

  const groupedData = useMemo(() => {
    if (!groupBy) return null;
    return groupUtmData(links, groupBy);
  }, [groupBy, links]);

  return (
    <Card className={cn('flex flex-col h-min gap-2', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Stats</h4>
        <div className="flex items-center gap-1 text-neutral-400">
          <Eye size={16} />
          <p className="text-xs sm:text-sm">{shortenedLink.count}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <p>Group By:</p>
        <Select
          value={groupBy}
          onValueChange={(value) => setGroupBy(value as UtmTag[1])}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select UTM tag" />
          </SelectTrigger>
          <SelectContent>
            {utmTags.map(([label, value]: UtmTag) => (
              <SelectItem key={label} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="py-4">
        {groupBy && groupedData ? (
          <LinkStats groupBy={groupBy} groupedData={groupedData} />
        ) : (
          <>please select tag to group</>
        )}
      </div>
    </Card>
  );
};

export default LinkStatsCard;

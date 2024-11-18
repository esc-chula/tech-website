import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackButton from '~/components/common/button/back-button';
import CopyButton from '~/components/tools/link-shortener/copy-button';
import DeleteButton from '~/components/tools/link-shortener/delete-button';
import LinkEditCard from '~/components/tools/link-shortener/link-edit-card';
import LinkStatsCard from '~/components/tools/link-shortener/link-stats-card';
import QrCodeButton from '~/components/tools/link-shortener/qr-code-button';
import { env } from '~/env';
import { api } from '~/trpc/server';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params;

  const res = await api.linkShortener.getBySlugWithStats({
    slug,
  });

  if (!res.success || !res.data) {
    notFound();
  }

  return (
    <>
      <BackButton href="/tools/link-shortener" />
      <div className="pb-10 pt-24">
        <div className="flex items-center justify-between">
          <Link
            href={`${env.NEXT_PUBLIC_SHORTENED_LINK_ORIGIN}/${slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h3 className="space-x-0.5 truncate text-3xl font-semibold">
              <span className="hidden text-neutral-500 sm:inline">
                {env.NEXT_PUBLIC_SHORTENED_LINK_ORIGIN.split('//')[1]}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-amber-300">{slug}</span>
            </h3>
          </Link>
          <div className="flex items-center">
            <QrCodeButton />
            <CopyButton
              value={`${env.NEXT_PUBLIC_SHORTENED_LINK_ORIGIN}/${slug}`}
            />
            <DeleteButton slug={slug} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 pb-16">
        <LinkEditCard className="lg:w-1/3" shortenedLink={res.data} />
        <LinkStatsCard className="lg:w-2/3" shortenedLink={res.data} />
      </div>
    </>
  );
};

export default Page;

import { notFound } from 'next/navigation';

import BackButton from '~/components/common/button/back-button';
import CopyButton from '~/components/tools/link-shortener/copy-button';
import DeleteButton from '~/components/tools/link-shortener/delete-button';
import EditLinkCard from '~/components/tools/link-shortener/edit-link-card';
import QrCodeButton from '~/components/tools/link-shortener/qr-code-button';
import { Card } from '~/components/ui/card';
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
          <h3 className="space-x-0.5 truncate text-3xl font-semibold">
            <span className="hidden text-neutral-500 sm:inline">
              intania.link
            </span>
            <span className="text-neutral-500">/</span>
            <span className="text-amber-300">{slug}</span>
          </h3>
          <div className="flex items-center">
            <QrCodeButton />
            <CopyButton value={`https://intania.link/${slug}`} />
            <DeleteButton slug={slug} />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <EditLinkCard className="w-1/3" shortenedLink={res.data} />
        <Card className="w-2/3">test</Card>
      </div>
    </>
  );
};

export default Page;

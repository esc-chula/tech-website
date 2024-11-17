import { BackButton } from "@/components/common/button/back-button";
import CopyButton from "@/components/tools/link-shortener/copy-button";
import DeleteButton from "@/components/tools/link-shortener/delete-button";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const res = await api.linkShortener.getBySlug({
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
            <DeleteButton slug={slug} />
            <CopyButton value={`https://intania.link/${slug}`} />
          </div>
        </div>
      </div>
    </>
  );
}

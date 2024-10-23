interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <div className="">
      <h3 className="space-x-0.5 truncate text-3xl font-semibold">
        <span className="hidden text-neutral-500 sm:inline">intania.link</span>
        <span className="text-neutral-500">/</span>
        <span className="text-amber-300">{slug}</span>
      </h3>
    </div>
  );
}

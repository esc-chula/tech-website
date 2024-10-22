import Links from "@/components/tools/link-shortener/links";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10 lg:gap-8">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-medium">Your Links</h2>
      </div>
      <Links />
    </div>
  );
}

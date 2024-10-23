import Links from "@/components/tools/link-shortener/links";
import LinksLoading from "@/components/tools/link-shortener/links-loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10 lg:gap-8">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-medium">Your Links</h2>
      </div>
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <Suspense fallback={<LinksLoading />}>
          <Links />
        </Suspense>
      </div>
    </div>
  );
}

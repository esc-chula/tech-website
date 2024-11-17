import { BackButton } from "@/components/common/button/back-button";
import { Title } from "@/components/ui/title";
import CreateLinkDialog from "@/components/tools/link-shortener/create-link-dialog";
import LinksContainer from "@/components/tools/link-shortener/links-container";
import LinksLoading from "@/components/tools/link-shortener/links-loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <BackButton href="/" />
      <div className="flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8 lg:pt-8">
        <Title className="hidden lg:inline">Link Shortener</Title>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-medium">Your Links</h2>
          <CreateLinkDialog />
        </div>
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          <Suspense fallback={<LinksLoading />}>
            <LinksContainer />
          </Suspense>
        </div>
      </div>
    </>
  );
}

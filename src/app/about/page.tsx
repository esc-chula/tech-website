import { Header } from "@/components/common/header";
import { AboutSession } from "@/components/about/about-session";
import { ProjectsSession } from "@/components/about/projects-session";
import { MemberSession } from "@/components/about/member-session";
import { BackButton } from "@/components/common/back-button";

export default function RootHead() {
  return (
    <>
      <body>
        <Header />
        <BackButton backUrl="/" />
        <AboutSession />
        <ProjectsSession />
        <MemberSession />
      </body>
    </>
  );
}

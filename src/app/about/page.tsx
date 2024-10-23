import { Header } from "../../components/common/header";
import { AboutSection } from "../../components/about/about-section";
import { ProjectsSection } from "../../components/about/projects-section";
import { MemberSection } from "../../components/about/member-section";
import { BackButton } from "../../components/common/back-button";

export default function RootHead() {
  return (
    <>
      <body>
        <Header />
        <BackButton backUrl="/" />
        <AboutSection />
        <ProjectsSection />
        <MemberSection />
      </body>
    </>
  );
}

import { AboutSection } from "@/components/about/about-section";
import { MemberSection } from "@/components/about/member-section";
import { ProjectsSection } from "@/components/about/projects-section";
import { BackButton } from "@/components/common/back-button";

export default function Page() {
  return (
    <>
      <BackButton href="/" fixed />
      <AboutSection />
      <ProjectsSection />
      <MemberSection />
    </>
  );
}

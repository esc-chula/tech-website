import { MembersSection } from "@/components/about/members-section";
import { ProjectsSection } from "@/components/about/projects-section";
import { BackButton } from "@/components/common/button/back-button";

export default function Page() {
  return (
    <>
      <BackButton href="/" fixed />
      <ProjectsSection />
      <MembersSection />
    </>
  );
}

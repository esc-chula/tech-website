import { Header } from "../../components/common/Header";
import { AboutSession } from "../../components/about/about-section";
import { ProjectsSession } from "../../components/about/projects-section";
import { MemberSession } from "../../components/about/member-section";
import { BackButton } from "../../components/common/back-button";

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

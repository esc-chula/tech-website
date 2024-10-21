import { Header } from "../../components/common/Header";
import { AboutSession } from "../../components/about/AboutSession";
import { ProjectsSession } from "../../components/about/ProjectsSession";
import { MemberSession } from "../../components/about/MemberSession";
import { BackButton } from "../../components/common/Back-Button";

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

import HeroSection from "./_components/section-hero";
import ScheduleSection from "./_components/section-schedule";
import TechMonthSection from "./_components/section-techmonth";

export default function Page(): JSX.Element {
  return (
    <>
      <HeroSection />
      <TechMonthSection />
      <ScheduleSection />
    </>
  );
}

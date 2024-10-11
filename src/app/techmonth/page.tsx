import Navigation from "./_components/navigation";
import HeroSection from "./_components/section-hero";
import ScheduleSection from "./_components/section-schedule";
import TechMonthSection from "./_components/section-techmonth";

export default function Page(): JSX.Element {
  return (
    <>
      <Navigation />
      <main className="flex w-full flex-col items-center lg:-mt-[calc(100vh-14px)]">
        <HeroSection />
        <TechMonthSection />
        <ScheduleSection />
      </main>
    </>
  );
}

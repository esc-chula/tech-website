import Section from './section';

const Timeline: React.FC = () => {
  return (
    <Section className="" offsetThreshold={2000} title="TIMELINE">
      <div className="h-[200vh] flex flex-col gap-10">
        <div className="bg-hackathon-primary w-5 aspect-square rounded-full" />
        <div className="bg-white w-5 aspect-square rounded-full" />
        <div className="bg-white/20 w-5 aspect-square rounded-full" />
      </div>
    </Section>
  );
};

export default Timeline;

import Section from './section';

const competitionPrizes = [
  {
    title: 'Winner',
    prize: 50000,
  },
  {
    title: '1st Runner-up',
    prize: 30000,
  },
  {
    title: '2nd Runner-up',
    prize: 20000,
  },
  {
    title: 'Special Awards',
    description: 'For many other teams!',
    prize: 11111,
  },
];

const PrizesSection: React.FC = () => {
  return (
    <Section title="PRIZES">
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-14 pt-10">
        <div className="relative text-center">
          <p className="text-5xl sm:text-6xl md:text-8xl font-ndot47 select-none">
            1,<span className="text-hackathon-primary">111</span>,111
          </p>
          <div className="flex flex-col tiems-center -gap-1 mt-4">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              Prize Pool
            </p>
            <p className="text-xs text-white/50">(baht)</p>
          </div>
          <div className="-z-10 rounded-full absolute w-[200px] md:w-[250px] top-1/2 -mt-5 sm:-mt-5 md:-mt-6 -left-10 sm:-left-7 md:left-3 -translate-y-1/2 aspect-[5/4] bg-hackathon-radial-gradient opacity-60" />
        </div>
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-10 w-full sm:px-5 lg:px-8">
          <PrizeCard prize={111111} title="Competition Prize">
            {competitionPrizes.map((prize) => (
              <div key={prize.title}>
                <div className="flex justify-between items-center">
                  <p className="text-sm sm:text-base font-semibold text-white/70">
                    {prize.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold font-geistMono">
                    {prize.prize.toLocaleString()}
                  </p>
                </div>
                {prize.description ? (
                  <span className="absolute -mt-1 text-xs font-normal text-white/50">
                    {prize.description}
                  </span>
                ) : null}
              </div>
            ))}
          </PrizeCard>
          <PrizeCard prize={1000000} title="Innovation Support">
            <p className="text-sm text-white/70">
              1-on-1 mentorship with industry experts
            </p>
            <p className="text-sm text-white/70">
              Access to exclusive startup programs
            </p>
            <p className="text-sm text-white/70">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur iste dolorem similique, tempore quae officia minus
              fuga aliquid sint tenetur adipisci doloremque? Sapiente sunt nobis
              voluptates et quaerat, ipsam dicta?
            </p>
          </PrizeCard>
        </div>
      </div>
    </Section>
  );
};

export default PrizesSection;

interface PrizeCardProps {
  children: React.ReactNode;
  prize: number;
  title: string;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ children, prize, title }) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border-2 border-white/10 p-6">
      <div className="select-none">
        <h4 className="font-ndot47 text-3xl md:text-5xl">
          {prize.toLocaleString()}
          <span className="text-2xl sm:text-3xl text-white/50 ml-1.5">.-</span>
        </h4>
        <h5 className="font-ndot47 text-lg md:text-2xl text-hackathon-primary">
          {title}
        </h5>
      </div>
      <hr className="border-white/20" />
      <div className="flex flex-col gap-4 pb-4">{children}</div>
    </div>
  );
};

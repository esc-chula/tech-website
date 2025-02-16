import ScrollRevealer from '~/components/common/animation/scroll-revealer'

import Section from './section'

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
]

const PrizesSection: React.FC = () => {
  return (
    <Section title='PRIZES'>
      <div className='flex flex-col items-center gap-8 pt-10 sm:gap-10 md:gap-14'>
        <div className='relative text-center'>
          <p className='select-none font-ndot47 text-5xl sm:text-6xl md:text-8xl'>
            1,<span className='text-hackathon-primary'>111</span>,111
          </p>
          <div className='tiems-center -gap-1 mt-4 flex flex-col'>
            <p className='text-lg font-semibold sm:text-xl md:text-2xl'>
              Prize Pool
            </p>
            <p className='text-xs text-white/50'>(baht)</p>
          </div>
          <div className='absolute -left-10 top-1/2 -z-10 -mt-5 aspect-[5/4] w-[200px] -translate-y-1/2 rounded-full bg-hackathon-radial-gradient opacity-60 sm:-left-7 sm:-mt-5 md:left-3 md:-mt-6 md:w-[250px]' />
        </div>
        <div className='grid w-full gap-5 sm:gap-10 sm:px-5 lg:grid-cols-2 lg:px-8'>
          <ScrollRevealer initialTranslateY='15%'>
            <PrizeCard prize={111111} title='Competition Prize'>
              {competitionPrizes.map((prize) => (
                <div key={prize.title}>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold text-white/70 sm:text-base'>
                      {prize.title}
                    </p>
                    <p className='font-geistMono text-xl font-bold sm:text-2xl'>
                      {prize.prize.toLocaleString()}
                    </p>
                  </div>
                  {prize.description ? (
                    <span className='absolute -mt-1 text-xs font-normal text-white/50'>
                      {prize.description}
                    </span>
                  ) : null}
                </div>
              ))}
            </PrizeCard>
          </ScrollRevealer>
          <ScrollRevealer delay={0.5} initialTranslateY='15%'>
            <PrizeCard prize={1000000} title='Innovation Fund'>
              <p className='text-sm text-white/70'>
                1-on-1 mentorship with industry experts
              </p>
              <p className='text-sm text-white/70'>
                Access to exclusive startup programs
              </p>
              <p className='text-sm text-white/70'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur iste dolorem similique, tempore quae officia minus
                fuga aliquid sint tenetur adipisci doloremque? Sapiente sunt
                nobis voluptates et quaerat, ipsam dicta?
              </p>
            </PrizeCard>
          </ScrollRevealer>
        </div>
      </div>
    </Section>
  )
}

export default PrizesSection

interface PrizeCardProps {
  children: React.ReactNode
  prize: number
  title: string
}

const PrizeCard: React.FC<PrizeCardProps> = ({ children, prize, title }) => {
  return (
    <div className='flex h-full flex-col gap-4 rounded-3xl border-2 border-white/10 p-6'>
      <div className='select-none'>
        <h4 className='font-ndot47 text-3xl md:text-5xl'>
          {prize.toLocaleString()}
          <span className='ml-1.5 text-2xl text-white/50 sm:text-3xl'>.-</span>
        </h4>
        <h5 className='font-ndot47 text-lg text-hackathon-primary md:text-2xl'>
          {title}
        </h5>
      </div>
      <hr className='border-white/20' />
      <div className='flex flex-col gap-4 pb-4'>{children}</div>
    </div>
  )
}

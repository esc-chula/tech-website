import Hero from '~/components/home/hero'
import ToolCard from '~/components/tools/tool-card'
import { tools } from '~/constants/tools'

const Home: React.FC = () => {
  return (
    <div className='flex w-full flex-col items-center gap-10 pb-24 pt-12'>
      <h1 className='hidden'>ESC Technology Department Website</h1>
      <Hero />
      <section
        className='grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3'
        id='tools-list'
      >
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            description={tool.description}
            href={tool.href}
            image={tool.image}
            title={tool.title}
          />
        ))}
      </section>
    </div>
  )
}

export default Home

import { motion } from 'framer-motion'

interface TicketFormProps {
  onSubmit: () => void
}

const CreateTeamBox = ({ onSubmit }: TicketFormProps): JSX.Element => {
  return (
    <motion.div
      className='flex flex-col rounded-3xl border-2 border-white/40 px-12 py-8 backdrop-blur-sm sm:px-20 sm:py-12'
      transition={{ duration: 0.75, ease: 'easeOut' }}
      animate={{
        backgroundColor: 'rgba(0, 0, 0, 1)',
        scale: 1,
        boxShadow: `0 0 0px 0px rgba(255, 255, 255, 1)`,
      }}
      initial={{
        backgroundColor: 'rgba(255, 255, 255, 0)',
        scale: 1.25,
        boxShadow: `0 0 240px 200px rgba(255, 255, 255, 0)`,
      }}
    >
      <h2 className='text-center font-ndot47 text-4xl font-normal tracking-tighter text-white sm:text-6xl'>
        Team
        <br />
        Ticket
      </h2>
      <button
        className='mt-4 rounded-full border-2 border-white/40 bg-white/20 px-4 py-1 tracking-tight text-white backdrop-blur-sm hover:bg-white/25 sm:mt-8 sm:px-8 sm:py-2.5'
        type='button'
        onClick={onSubmit}
      >
        Register
      </button>
    </motion.div>
  )
}

export default CreateTeamBox

interface TicketFormProps {
  onSubmit: () => void
}

const CreateTeamBox = ({ onSubmit }: TicketFormProps): JSX.Element => {
  return (
    <div className='flex flex-col rounded-3xl border-2 border-white/40 bg-black px-20 py-12 backdrop-blur-sm'>
      <h2 className='text-center font-ndot47 text-6xl font-normal tracking-tighter text-white'>
        Team
        <br />
        Ticket
      </h2>
      <button
        className='mt-8 rounded-full border-2 border-white/40 bg-white/20 px-8 py-2.5 tracking-tight text-white opacity-50 backdrop-blur-sm hover:bg-white/25'
        type='button'
        onClick={onSubmit}
      >
        Register
      </button>
    </div>
  )
}

export default CreateTeamBox

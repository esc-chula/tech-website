interface Ticket {
  isClaimed: boolean
  isRegistered: boolean
  teamTicketId: number | null
}

interface TicketStatsProps {
  tickets: Ticket[]
}

const TicketStats: React.FC<TicketStatsProps> = ({ tickets }) => {
  const claimedCount = tickets.filter((t) => t.isClaimed).length
  const registeredCount = tickets.filter((t) => t.isRegistered).length
  const teamCount = new Set(tickets.map((t) => t.teamTicketId)).size

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='text-center'>Claimed: {claimedCount}</div>
      <div className='text-center'>Registered: {registeredCount}</div>
      <div className='text-center'>Teams: {teamCount}</div>
    </div>
  )
}

export default TicketStats

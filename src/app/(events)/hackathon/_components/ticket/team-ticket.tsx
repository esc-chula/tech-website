import Link from 'next/link'


import { countHackathonRegistrations } from '~/server/actions/hackathon'
import {
  type HackathonRegistration,
  type HackathonTeamMember,
  type HackathonTeamTicket,
  type HackathonTicket,
} from '~/types/hackathon'

import TeamTicketQrCode from './team-ticket-qrcode'

interface TeamTicketProps {
  registration: HackathonRegistration & {
    teamMembers: HackathonTeamMember[]
  }
  teamTicket: HackathonTeamTicket & {
    tickets: HackathonTicket[]
  }
}

const TeamTicket: React.FC<TeamTicketProps> = async ({
  registration,
  teamTicket,
}) => {
  const resCountRegistrations = await countHackathonRegistrations()
  if (!resCountRegistrations.success) {
    return 'Something went wrong, please try again later...'
  }

  return (
    <div className='flex w-full max-w-screen-sm flex-col items-center gap-6'>
      <div className='aspect-square w-full max-w-xs rounded-3xl border-2 border-white/10 bg-white/10 p-3.5 backdrop-blur-md'>
        <div className='relative h-full w-full overflow-hidden rounded-2xl'>
          <TeamTicketQrCode publicId={teamTicket.publicId} />
        </div>
      </div>
      <Link
        className='rounded-full bg-hackathon-primary px-6 py-1.5 text-sm sm:text-base'
        href='/hackathon/ticket/share'
      >
        Share
      </Link>
      <div className='grid w-full grid-cols-2 rounded-3xl border-2 border-white/10 bg-white/10 p-4 backdrop-blur-md'>
        <div>
          <p className='text-xs text-white/50 sm:text-sm'>Team Name</p>
          <p className='text-xl font-semibold'>{registration.teamName}</p>
        </div>
        <div>
          <p className='text-xs text-white/50 sm:text-sm'>Team No.</p>
          <p className='text-xl font-semibold'>{resCountRegistrations.data}</p>
        </div>
      </div>
      <div className='grid w-full grid-cols-2 rounded-3xl border-2 border-white/10 bg-white/10 p-4 backdrop-blur-md'>
        <div>
          <p className='text-xs text-white/50 sm:text-sm'>Ticket Code #1</p>
          <p className='text-sm font-semibold sm:text-xl'>
            {teamTicket.tickets[0]?.code}
          </p>
        </div>
        <div>
          <p className='text-xs text-white/50 sm:text-sm'>Ticket Code #2</p>
          <p className='text-sm font-semibold sm:text-xl'>
            {teamTicket.tickets[1]?.code}
          </p>
        </div>
      </div>
      <div className='grid w-full gap-6 rounded-3xl border-2 border-white/10 bg-white/10 p-4 backdrop-blur-md'>
        {registration.teamMembers.map((teamMember, index) => (
          <div key={teamMember.id} className='space-y-4'>
            <div>
              <p className='text-xs text-white/50 sm:text-sm'>
                Hacker #{index + 1} - {teamMember.role}
              </p>
              <hr className='mt-1 border-white/25' />
            </div>
            <div>
              <p className='text-xs text-white/50 sm:text-sm'>Name</p>
              <p>
                {teamMember.firstName} {teamMember.lastName} (
                {teamMember.nickname}) - {teamMember.pronoun}
              </p>
            </div>
            <div>
              <p className='text-xs text-white/50 sm:text-sm'>Contact</p>
              <p>
                {teamMember.email}
                <br />
                {teamMember.phoneNumber}
              </p>
            </div>
            <div>
              <p className='text-xs text-white/50 sm:text-sm'>Education</p>
              <p>{teamMember.studentId}</p>
              <p>{teamMember.faculty}</p>
              <p>{teamMember.department}</p>
              <p>{teamMember.university}</p>
            </div>
            {(teamMember.foodRestriction ??
            teamMember.medication ??
            teamMember.medicalCondition) ? (
              <div>
                <p className='text-xs text-white/50 sm:text-sm'>Health</p>
                <p>{teamMember.foodRestriction}</p>
                <p>{teamMember.medication}</p>
                <p>{teamMember.medicalCondition}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamTicket

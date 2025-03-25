'use client'

import { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'

import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { findTeamTicketByPublicId } from '~/server/actions/hackathon'
import { type HackathonTeam } from '~/types/hackathon'

const Page: React.FC = () => {
  const [qrData, setQrData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [teamData, setTeamData] = useState<HackathonTeam | null>(null)

  useEffect(() => {
    if (qrData) {
      setLoading(true)
      console.log(`Searching Team Ticket for: ${qrData}`)
      findTeamTicketByPublicId(qrData)
        .then((res) => {
          if (!res.success) {
            setError(res.message ?? null)
            console.log(res.errors)
            return
          }
          setTeamData(res.data)
        })
        .catch((err: unknown) => {
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [qrData])

  return (
    <div className='min-h-dvh w-full px-4 pb-6'>
      <div className='relative mx-auto h-full w-full max-w-screen-sm'>
        <div className='absolute left-1/2 top-1/2 z-10 aspect-square w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-[3px] border-white/50' />
        <QrReader
          className='aspect-square w-full'
          constraints={{}}
          onResult={(result) => {
            if (result) {
              setQrData(result.getText())
            }
          }}
        />
      </div>
      {error ? <p>{error}</p> : null}
      {loading ? <p>Searching...</p> : null}
      {teamData ? (
        <>
          <div className='mb-4 w-full border-collapse text-left'>
            <div className='w-full border p-2 font-bold'>Team Information</div>
            <TableRow field='Team Name' value={teamData.teamName} />
            <TableRow field='Team ID' value={teamData.id.toString()} />
            <TableRow field='Team Public ID' value={teamData.publicId} />
          </div>
          {teamData.teamMembers.map((teamMember, idx) => (
            <div
              key={teamMember.id}
              className='mb-4 mt-10 w-full border-collapse text-left'
            >
              <div className='w-full border p-2 font-bold'>
                Member {idx + 1}
              </div>
              <TableRow className='font-bold' field='Field' value='Value' />
              <TableRow field='First Name' value={teamMember.firstName} />
              <TableRow field='Last Name' value={teamMember.lastName} />
              <TableRow field='Nickname' value={teamMember.nickname} />
              <TableRow field='Pronoun' value={teamMember.pronoun} />
              <TableRow field='Email' value={teamMember.email} />
              <TableRow field='Phone Number' value={teamMember.phoneNumber} />
              <TableRow field='Student ID' value={teamMember.studentId} />
              <TableRow field='Faculty' value={teamMember.faculty} />
              <TableRow field='Department' value={teamMember.department} />
              <TableRow field='University' value={teamMember.university} />
              <TableRow field='Role' value={teamMember.role} />
            </div>
          ))}
          <Button
            className='mt-2 w-full'
            onClick={() => {
              setQrData(null)
              setTeamData(null)
            }}
          >
            Clear
          </Button>
        </>
      ) : null}
    </div>
  )
}

export default Page

interface TableRowProps {
  field: string
  value: string
  className?: string
}

const TableRow: React.FC<TableRowProps> = ({ field, value, className }) => {
  return (
    <div className={cn('grid grid-cols-8', className)}>
      <div className='col-span-3 border p-2'>{field}</div>
      <div className='col-span-5 border p-2'>{value}</div>
    </div>
  )
}

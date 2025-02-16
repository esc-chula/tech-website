import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { HACKATHON_MAX_TEAMS } from '~/constants/hackathon'
import { me } from '~/server/actions/auth'
import {
  countHackathonRegistrations,
  findMyRegistration,
} from '~/server/actions/hackathon'

import BirdsBackground from '../../_components/common/birds-background'
import UserBox from '../../_components/common/user-box'
import RegistrationForm from '../../_components/registration/registration-form'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration',
}

const Page: React.FC = async () => {
  const resMe = await me()
  if (!resMe.success) {
    return notFound()
  }

  const resMyRegistration = await findMyRegistration()
  if (!resMyRegistration.success) {
    return notFound()
  }
  if (resMyRegistration.data) {
    return redirect('/hackathon/registration/success')
  }

  const resCountRegistrations = await countHackathonRegistrations()
  if (!resCountRegistrations.success) {
    return 'Something went wrong, please try again later...'
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
        <UserBox />
        <div className='flex flex-col items-center gap-2 text-center md:gap-6'>
          <h1 className='text-4xl font-semibold md:text-5xl'>Registration</h1>
          <p className='text-sm text-white/60'>
            Registered teams: {resCountRegistrations.data} /{' '}
            {HACKATHON_MAX_TEAMS}
          </p>
        </div>
        {resCountRegistrations.data >= HACKATHON_MAX_TEAMS ? (
          <div>
            <p className='text-center text-white'>Registration is full.</p>
          </div>
        ) : (
          <RegistrationForm currentUserData={resMe.data} />
        )}
      </div>
      <BirdsBackground />
    </>
  )
}

export default Page

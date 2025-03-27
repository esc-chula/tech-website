import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { HACKATHON_MAX_TEAMS } from '~/constants/hackathon'
import { me } from '~/server/actions/auth'
import {
  countHackathonRegistrations,
  findMyRegistration,
} from '~/server/actions/hackathon'

import BackButton from '../../_components/common/back-button'
import BirdsBackground from '../../_components/common/birds-background'
import UserBox from '../../_components/common/user-box'
import RegistrationForm from '../../_components/registration/registration-form'
import RemoveRegistrationButton from '../../_components/registration/remove-registration-button'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration',
}

const Page: React.FC = async () => {
  const resMe = await me()
  if (!resMe.success) {
    return redirect('/hackathon/login?redirectUrl=/hackathon/registration')
  }

  const resMyRegistration = await findMyRegistration()
  if (!resMyRegistration.success) {
    return redirect('/hackathon/ticket')
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
      <BackButton href='/hackathon' />
      <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
        <UserBox />
        <div className='flex flex-col items-center gap-2 text-center md:gap-6'>
          <h1 className='text-4xl font-semibold md:text-5xl'>Registration</h1>
          <p className='text-sm text-white/60'>
            Registered teams: {resCountRegistrations.data + 5} /{' '}
            {HACKATHON_MAX_TEAMS}
          </p>
        </div>
        {resCountRegistrations.data >= HACKATHON_MAX_TEAMS ? (
          <>
            <div className='flex max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-white/10 bg-white/10 p-4 text-center backdrop-blur-sm'>
              <p className='text-center text-lg font-semibold text-white'>
                Registration is full for this round.
              </p>
              <p className='text-white/60'>
                Thank you for your interest in Intania Hackathon. Please stay
                tuned for our next event.
                <br />
                :D
              </p>
            </div>
            <RemoveRegistrationButton />
          </>
        ) : (
          <RegistrationForm currentUserData={resMe.data} />
        )}
      </div>
      <BirdsBackground />
    </>
  )
}

export default Page

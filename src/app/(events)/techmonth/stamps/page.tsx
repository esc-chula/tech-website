import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getEvents } from '~/server/actions/techmonth'
import { api } from '~/trpc/server'

import { Modal, ModalContent, TriggerModal } from './_components/add-modal'
import Header from './_components/header'
import StampsLadder from './_components/stamps-ladder'

const Page: React.FC = async () => {
  const cookieStore = cookies()
  const studentId = cookieStore.get('studentId')?.value
  if (!studentId) {
    redirect('/techmonth/login')
  }

  const stamps = await api.techmonth.getStampsByStudentId({
    studentId,
  })

  const res = await getEvents()
  if (!res.success) {
    return <div>Something went wrong...</div>
  }
  const events = res.data
  const eventMap = new Map(events.map((event) => [event.eventId, event]))

  const stampsWithEvent = stamps.map((stamp) => ({
    ...stamp,
    event: eventMap.get(stamp.eventId),
  }))

  return (
    <Modal>
      <ModalContent />
      <main className='flex w-full flex-col items-center'>
        <div className='flex min-h-screen w-full max-w-screen-xl flex-col space-y-16 px-8 py-16 font-tiny5 md:px-16 xl:px-4'>
          <Header studentId={studentId} />
          <div className='flex flex-col justify-between lg:flex-row'>
            <div className='flex flex-col space-y-2 lg:space-y-1'>
              <h2 className='text-5xl uppercase md:text-6xl lg:text-8xl'>
                <span className='text-techmonth-green'>STAMPS</span> BOOK
              </h2>
              <Link
                className='w-max font-press-start-2p text-techmonth-magenta underline hover:text-techmonth-yellow'
                href='/techmonth/stamps/rewards'
              >{`REWARDS ->`}</Link>
            </div>
            <TriggerModal className='mt-4 h-min bg-techmonth-yellow px-6 py-2 text-2xl text-techmonth-black duration-200 hover:translate-x-3 lg:text-3xl'>
              {`ADD ->`}
            </TriggerModal>
          </div>
          <StampsLadder
            numberOfRows={events.length}
            stampsWithEvent={stampsWithEvent}
          />
        </div>
      </main>
    </Modal>
  )
}

export default Page

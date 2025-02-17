import { Suspense } from 'react'

import NavItems from '../common/navigation/nav-items'
import UserBox from '../common/user-box/user-box'
import UserBoxLoading from '../common/user-box/user-box-loading'
import { Card } from '../ui/card'

import CarouselContainer from './carousel-container'
import CarouselLoading from './carousel-loading'

const Hero: React.FC = () => {
  return (
    <Card className='grid w-full overflow-hidden p-0 lg:grid-cols-7'>
      {/* banner */}
      <Suspense fallback={<CarouselLoading />}>
        <CarouselContainer />
      </Suspense>

      {/* menu */}
      <div className='col-span-2 hidden flex-col justify-between lg:flex'>
        <NavItems />
        <Suspense fallback={<UserBoxLoading />}>
          <UserBox />
        </Suspense>
      </div>
    </Card>
  )
}

export default Hero

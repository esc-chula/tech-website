import Image from 'next/image';
import { Suspense } from 'react';

import NavItems from '../common/navigation/nav-items';
import UserBox from '../common/user-box/user-box';
import UserBoxLoading from '../common/user-box/user-box-loading';
import { Card } from '../ui/card';

const Hero: React.FC = () => {
  return (
    <Card className="grid w-full overflow-hidden p-0 lg:grid-cols-7">
      {/* banner */}
      <div className="relative col-span-5 aspect-video bg-neutral-700 lg:aspect-[4/2]">
        <Image
          fill
          alt="banner"
          className="select-none object-cover"
          src="/assets/mock/banner.png"
        />
        <div className="absolute z-10 h-full w-full bg-gradient-to-t from-black to-transparent to-35%" />
        <div className="absolute z-20 flex h-full flex-col justify-end p-4 lg:gap-1 lg:px-7 lg:py-6">
          <h4 className="align-bottom text-lg font-semibold text-white lg:text-2xl">
            TECH website is now open!
          </h4>
          <p className="align-bottom text-xs font-light text-white">
            A place of tools and knowledges for geeks.
          </p>
        </div>
      </div>

      {/* menu */}
      <div className="col-span-2 hidden flex-col justify-between lg:flex">
        <NavItems />
        <Suspense fallback={<UserBoxLoading />}>
          <UserBox />
        </Suspense>
      </div>
    </Card>
  );
};

export default Hero;

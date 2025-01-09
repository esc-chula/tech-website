import React, { Suspense } from 'react';

import { env } from '~/env';
import { getCarousel } from '~/server/actions/hero';

import NavItems from '../common/navigation/nav-items';
import UserBox from '../common/user-box/user-box';
import UserBoxLoading from '../common/user-box/user-box-loading';
import { Card } from '../ui/card';

import HeroCarousel from './carousel';

const Hero: React.FC = async () => {
  const res = await getCarousel();
  if (!res.success) {
    return <div>Something went wrong ...</div>;
  }
  const slides = res.data;
  slides.map((slide) => {
    slide.image = `${env.DIRECTUS_URL}/assets/${slide.image}`;
    return slide;
  });

  return (
    <Card className="grid w-full overflow-hidden p-0 lg:grid-cols-7">
      {/* banner */}
      <HeroCarousel slides={slides} />

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

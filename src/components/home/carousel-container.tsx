import { env } from '~/env';
import { getCarousel } from '~/server/actions/hero';

import Carousel from './carousel';

const CarouselContainer: React.FC = async () => {
  const res = await getCarousel();
  if (!res.success) {
    console.error(res.errors);
    return (
      <span className="col-span-5 aspect-video lg:aspect-[4/2] select-none grid place-content-center text-white/20">
        Failed to load carousel slides. Please try again later
      </span>
    );
  }

  const slides = res.data;

  slides.map((slide) => {
    slide.image = `${env.DIRECTUS_URL}/assets/${slide.image}`;
    return slide;
  });

  return <Carousel slides={slides} />;
};

export default CarouselContainer;

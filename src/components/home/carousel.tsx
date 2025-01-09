'use client';

import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { type Slide } from '~/types/hero';

interface CarouselProps {
  slides: Slide[];
}

const HeroCarousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      className="col-span-5"
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      renderIndicator={(onClickHandler, isSelected, index, label) => (
        <li
          key={index}
          aria-label={`${label} ${index + 1}`}
          className={`rounded-full h-2 w-2 cursor-pointer inline-block mx-1 bg-white float-right ${isSelected ? 'opacity-100' : 'opacity-30'}`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- This element is interactive as an indicator
          role="button"
          tabIndex={0}
          title={`${label} ${index + 1}`}
          value={index}
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
        />
      )}
    >
      {slides.map((slide) => (
        <React.Fragment key={slide.id}>
          <div className="h-full col-span-5 aspect-video bg-neutral-700 lg:aspect-[4/2]">
            <Image
              fill
              alt={slide.title}
              className="select-none object-cover"
              src={slide.image}
            />
            <div className="absolute z-10 h-full w-full bg-gradient-to-t from-black to-transparent to-35%" />
            <div className="absolute z-20 flex h-full flex-col justify-end text-left p-4 lg:gap-1 lg:px-7 lg:py-6">
              <h4 className="align-bottom text-lg font-semibold text-white lg:text-2xl">
                {slide.title}
              </h4>
              <p className="align-bottom text-xs font-light text-white">
                {slide.description}
              </p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;

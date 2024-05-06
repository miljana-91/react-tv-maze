import React, { ReactElement, memo } from 'react';
import AliceCarousel from 'react-alice-carousel';
import './HeaderSlider.scss';

const HeaderSlider = (): ReactElement => {
  const images: { alt: string; src: string }[] = [
    { alt: 'set', src: `${process.env.PUBLIC_URL}/images/set.jpg` },
    { alt: 'show', src: `${process.env.PUBLIC_URL}/images/show.jpg` },
    { alt: 'camera', src: `${process.env.PUBLIC_URL}/images/camera.jpg` },
    { alt: 'camera-2', src: `${process.env.PUBLIC_URL}/images/camera-2.jpg` },
  ];

  const carouselItems = (): ReactElement[] => {
    return images.map((image: { alt: string; src: string }) => {
      return (
        <div key={image.src} className="header-slider">
          <img src={image.src} alt={image.alt} className="header-slider__img" />
        </div>
      );
    });
  };

  return (
    <AliceCarousel
      infinite={true}
      disableButtonsControls={true}
      autoPlay={true}
      autoPlayInterval={400}
      animationDuration={1000}
      disableDotsControls={true}
      items={carouselItems()}
    ></AliceCarousel>
  );
};

export default memo(HeaderSlider);

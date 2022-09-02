import React, { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "./slider.styles.scss";
import "@splidejs/react-splide/css";

export enum SliderSize {
  big = "big",
  card = "card",
}
export type SliderProps = {
  images: string[];
  headline: string;
  size?: SliderSize;
};

const Slider: FC<SliderProps> = ({
  images,
  headline,
  size = SliderSize.big,
}) => {
  return (
    <div className={`slider-container ${size}`}>
      {images.length > 1 ? (
        <Splide aria-label={headline}>
          {images &&
            images.map((image, index) => (
              <SplideSlide key={index}>
                <img src={image} alt={`${headline} ${index + 1}`} />
              </SplideSlide>
            ))}
        </Splide>
      ) : (
        <img src={images[0]} alt={headline} className={"slider-container"} />
      )}
    </div>
  );
};

export default Slider;

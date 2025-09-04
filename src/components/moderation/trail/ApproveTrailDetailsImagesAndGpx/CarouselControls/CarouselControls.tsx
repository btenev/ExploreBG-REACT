import { FC } from "react";

import CarouselArrow from "./CarouselArrow";

import "./CarouselControls.scss";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const CarouselControls: FC<CarouselControlsProps> = ({ onPrev, onNext }) => {
  return (
    <div className="carousel-controls">
      <CarouselArrow direction="left" onClick={onPrev} />
      <CarouselArrow direction="right" onClick={onNext} />
    </div>
  );
};

export default CarouselControls;

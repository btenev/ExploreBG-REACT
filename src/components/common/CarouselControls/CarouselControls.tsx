import { FC } from 'react';

import './CarouselControls.scss';

import CarouselArrow from '../CarouselArrow';

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

import { FC, MouseEventHandler } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "./CarouselArrow.scss";

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CarouselArrow: FC<CarouselArrowProps> = ({ direction, onClick }) => {
  return (
    <button className={`carousel-arrow ${direction}`} onClick={onClick}>
      {direction === "left" ? (
        <FiChevronLeft size={24} />
      ) : (
        <FiChevronRight size={24} />
      )}
    </button>
  );
};

export default CarouselArrow;

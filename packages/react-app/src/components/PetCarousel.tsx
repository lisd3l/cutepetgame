import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SamplePet from "../assets/imgs/sample-pet.png";

const PetCarousel: React.FC = () => {
  return (
    <div className="pet-carousel" style={{ paddingRight: "66px" }}>
      <Swiper slidesPerView="auto" spaceBetween={66}>
        <SwiperSlide>
          <div className="pet-slide">
            <div className="pet-container">
              <div className="pet-thumb" style={{ backgroundImage: `url(${SamplePet})` }}></div>
              <div className="mt-2 leading-5 text-md">Dog Jery</div>
              <div className="mt-2 text-xs leading-4">From chen</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="pet-slide">
            <div className="pet-container">
              <div className="pet-thumb" style={{ backgroundImage: `url(${SamplePet})` }}></div>
              <div className="mt-2 leading-5 text-md">Dog Jery</div>
              <div className="mt-2 text-xs leading-4">From chen</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="pet-slide">
            <div className="pet-container">
              <div className="pet-thumb" style={{ backgroundImage: `url(${SamplePet})` }}></div>
              <div className="mt-2 leading-5 text-md">Dog Jery</div>
              <div className="mt-2 text-xs leading-4">From chen</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="pet-slide">
            <div className="pet-container">
              <div className="pet-thumb" style={{ backgroundImage: `url(${SamplePet})` }}></div>
              <div className="mt-2 leading-5 text-md">Dog Jery</div>
              <div className="mt-2 text-xs leading-4">From chen</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="pet-slide">
            <div className="pet-container">
              <div className="pet-thumb" style={{ backgroundImage: `url(${SamplePet})` }}></div>
              <div className="mt-2 leading-5 text-md">Dog Jery</div>
              <div className="mt-2 text-xs leading-4">From chen</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="pet-slide">
            <div className="pet-container">
              <div className="pet-thumb" style={{ backgroundImage: `url(${SamplePet})` }}></div>
              <div className="mt-2 leading-5 text-md">Dog Jery</div>
              <div className="mt-2 text-xs leading-4">From chen</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PetCarousel;

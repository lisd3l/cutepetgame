import React from "react";
import { Icon } from ".";
import PetGif from "../assets/imgs/pet.gif";

export default function Footer() {
  return (
    <footer className="relative flex justify-between overflow-hidden text-white lg:flex-wrap sm:flex-col sm:flex-nowrap section-footer px-36 2xl:px-24 lg:px-10 pt-120px lg:pt-12 pb-120px">
      <img src={PetGif} alt="Pet walk" className="pet-logo" />
      <div className="font-rb2-b text-6md 2xl:text-4md lg:w-full sm:mb-8">ConPet</div>
      <div className="text-2xs 2xl:text-lg lg:text-md sm:mb-8">
        ������ƂȂ�O�ɁA���̓������Ō�܂Ŏ�����̂��A�^���ɍl���悤�B
        <br />
        ������͓��������̖����I����܂ŁA����������Ď��������悤�B
        <br />
        ���L�̍K���̂��߁A�ߗׂɖ��f�������Ȃ����߁A������Ƃ��������悤�B
        <br />
        <div className="flex items-center mt-6">
        //  <a href="/" className="media-icon">
        //    <Icon name="facebook" size={24} />
        //  </a>
        //  <a href="/" className="media-icon">
        //    <Icon name="youtube" size={24} />
        //  </a>
          <a href="https://twitter.com/CONPETBATTLE?s=20" className="media-icon">
            <Icon name="twitter" size={24} />
          </a>
          <a href="/" className="media-icon">
            <Icon name="discord" size={24} />
          </a>
        </div>
      </div>
      <div className="sm:mb-8">
        <div className="font-bold text-3xs col-title 2xl:text-2xs">About</div>
        <div className="text-lg mt-9 sm:mt-3 lg:text-md">
          <a href="/" className="block mt-4 sm:mt-2">
            About NFT
          </a>
          <a href="/" className="block mt-4 sm:mt-2">
            Blog
          </a>
          <a href="/" className="block mt-4 sm:mt-2">
            Activity
          </a>
        </div>
      </div>
      <div className="sm:mb-8">
        <div className="font-bold text-3xs col-title 2xl:text-2xs">Support</div>
        <div className="text-lg mt-9 sm:mt-3 lg:text-md">
          <a href="/" className="block mt-4 sm:mt-2">
            Help and Support
          </a>
          <a href="/" className="block mt-4 sm:mt-2">
            Author Profile
          </a>
          <a href="/" className="block mt-4 sm:mt-2">
            Collection
          </a>
          <a href="/" className="block mt-4 sm:mt-2">
            Mail us
          </a>
        </div>
      </div>
      <div className="absolute bottom-16 right-40 lg:right-10">All right reserved @BWC</div>
    </footer>
  );
}

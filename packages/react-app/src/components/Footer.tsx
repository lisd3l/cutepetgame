import React from "react";
import { Icon } from ".";

export default function Footer() {
  return (
    <footer className="relative flex justify-between text-white section-footer">
      <div className="font-rb2-b text-6md">
        PET
        <br />
        BATTLE
      </div>
      <div className="text-2xs">
        Slogan slogan slogan. Slogan slogan
        <br />
        Slogan slogan slogan.
        <br />
        Slogan slogan slogan. Slogan slogan slogan.
        <br />
        <div className="flex items-center mt-6">
          <a href="" className="media-icon"><Icon name="facebook" size={24} /></a>
          <a href="" className="media-icon"><Icon name="youtube" size={24} /></a>
          <a href="" className="media-icon"><Icon name="twitter" size={24} /></a>
          <a href="" className="media-icon"><Icon name="instagram" size={24} /></a>
        </div>
      </div>
      <div className="">
        <div className="font-bold text-3xs col-title">About</div>
        <div className="mt-9">
          <a href="" className="block mt-4 text-lg">About NFT</a>
          <a href="" className="block mt-4 text-lg">Blog</a>
          <a href="" className="block mt-4 text-lg">Activity</a>
        </div>
      </div>
      <div className="">
        <div className="font-bold text-3xs col-title">Support</div>
        <div className="mt-9">
          <a href="" className="block mt-4 text-lg">Help and Support</a>
          <a href="" className="block mt-4 text-lg">Author Profile</a>
          <a href="" className="block mt-4 text-lg">Collection</a>
          <a href="" className="block mt-4 text-lg">Mail us</a>
        </div>
      </div>
      <div className="absolute bottom-16 right-40">All right reserved @BWC</div>
    </footer>
  );
}

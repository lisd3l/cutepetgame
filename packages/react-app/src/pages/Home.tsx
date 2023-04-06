import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Footer, Content, Header, PetCarousel } from "../components";
import BannerBg from "../assets/imgs/banner.png";
import video1 from "../assets/videos/bv01.mp4";
import video2 from "../assets/videos/bv02.mp4";
import video3 from "../assets/videos/bv03.mp4";
import { MintUrl } from "../helpers/utils";
import { Link } from "react-router-dom";
import { useEthContext } from "../hooks";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [currIndex, setCurrIndex] = useState([0, 0]);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [updateIdx, setUpdateIdx] = useState(0);

  useLayoutEffect(() => {
    Promise.all(
      [videoRef1, videoRef2, videoRef3].map(v => {
        return new Promise<boolean>(resolve => {
          if (v.current) {
            v.current.preload = "auto";
            v.current.addEventListener("canplaythrough", () => {
              resolve(true);
            });
          }
        });
      }),
    ).then(() => setLoaded(true));
  }, []);

  const playVideo = useCallback(() => {
    const randomIdx = Math.floor(3 * Math.random());
    setCurrIndex([currIndex[1], randomIdx]);
    setUpdateIdx(updateIdx + 1);
  }, [currIndex, updateIdx]);

  useEffect(() => {
    if (updateIdx > 0) {
      const oldVideoRef = [videoRef1, videoRef2, videoRef3][currIndex[0]];
      const newVideoRef = [videoRef1, videoRef2, videoRef3][currIndex[1]];
      if (currIndex[0] !== currIndex[1] && oldVideoRef.current && newVideoRef.current) {
        oldVideoRef.current.style.opacity = "0";
        newVideoRef.current.style.opacity = "1";
      }
      if (newVideoRef.current) {
        newVideoRef.current.addEventListener("ended", playVideo, { once: true });
        const pp = newVideoRef.current?.play();
        if (pp !== undefined) {
          pp.then(_ => {}).catch(_ => {
            console.log("playback prevented");
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateIdx]);

  useEffect(() => {
    playVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const { animalAmount } = useEthContext();

  const statLvClassName = useCallback((v: number) => {
    return `stat-lv${Math.floor(v / 2000) + 1}`;
  }, []);

  return (
    <div className="page page-home">
      <Content>
        <Header>
          <a href="#rules">Rules</a>
          <a href="#bouns">Bouns</a>
          <a href="#fairness">Fairness</a>
          <a href="#community">community</a>
          <a href="#roadmap">RoadMap</a>
          <Link to="/wallet">My Wallet</Link>
          <a href={MintUrl} target="_blank" rel="noreferrer">
            Mint
          </a>
        </Header>
        <div className="relative home-banner">
          <video
            src={video1}
            muted
            playsInline
            poster={BannerBg}
            className="object-cover w-full h-full align-center"
            ref={videoRef1}
          ></video>
          <video
            src={video2}
            muted
            playsInline
            poster={BannerBg}
            className="object-cover w-full h-full align-center"
            ref={videoRef2}
          ></video>
          <video
            src={video3}
            muted
            playsInline
            poster={BannerBg}
            className="object-cover w-full h-full align-center"
            ref={videoRef3}
          ></video>
        </div>
        <div className="relative pt-32 pb-40 overflow-hidden text-xs text-center px-36 2xl:px-24 lg:px-10 lg:pt-12 lg:pb-16 home-section-intro bg-theme2">
          <div className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8">Pet Battle</div>
          <div className="mx-auto leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md content md:text-left">
            We started an initiative to support pets that are left unsold and are facing problems. As part of this
            effort, we are developing a pet-themed game to raise awareness about the issue of unsold pets and encourage
            support from the public.
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs lg:pt-10 pb-15 lg:pb-9 px-36 2xl:px-24 lg:px-10 bg-theme2">
          <div className="relative mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="rules"
              data-anchor="rules"
            >
              Game Rules (Phase 1)
            </div>
            <ul className="leading-tight tracking-wide list-disc text-3xs 2xl:text-2xs lg:text-md">
              <li>Users choose the type of animal they want.</li>
              <li>Every day at a designated time on the blockchain, the number of each animal type is tallied.</li>
              <li>The type with the fewest numbers wins.</li>
              <li>Users can switch characters even at the last minute.</li>
              <li>At the initial stage, even the loser can earn a few battle points.</li>
            </ul>
            <div className="section-plate"></div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="bouns"
              data-anchor="bouns"
            >
              Bonus
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              Users who invite others can receive NFT bonuses.
            </div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="fairness"
              data-anchor="fairness"
            >
              Fairness
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              To maintain fairness, this game can increase uncertainty in the results. <br />
              Anyone can win because they can switch characters even at the last minute. <br />
              In addition, all processing, such as verification and statistics, is implemented in smart contracts.
            </div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="community"
              data-anchor="community"
            >
              Community Governance
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              We plan to collaborate with the Japan Pet Protection Association. We will form a Pet Protection <br />
              Association DAO to decide on the use and distribution of profits. To maintain fairness, this game can
            </div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="roadmap"
              data-anchor="roadmap"
            >
              Roadmap
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.4 (Phase 1)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              Winners will receive battle points at the beta version launch, and even the loser will receive a small
              number of battle points. Users who invite members will also receive NFT bonuses (BNB).
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.6 (Phase 2)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              Battle points can be converted to battle tokens, and the secondary market GameFi will start.
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.8 (Phase 3)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              Attributes will be added to NFTs, and same-type animals will be able to battle (PVP).
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2024.1 (Phase 4)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              The platform will be built, and NFTs will be reprocessed, and other games will be launched on the
              platform.
            </div>
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs lg:pt-10 px-36 2xl:px-24 lg:px-10 bg-theme2 pb-120px lg:pb-12 md:pb-9">
          <div className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8">Recently Pet</div>
          <PetCarousel></PetCarousel>
        </div>
        <div className="relative overflow-hidden text-xs text-center pt-52 lg:pt-24 pb-120px lg:pb-12 sm:pb-24 px-36 2xl:px-24 lg:px-10 bg-theme2 home-section-assets">
          <div className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-120px lg:mb-12 md:mb-9">
            Assets held for pet
          </div>
          <div className="flex items-center justify-center sm:flex-col">
            <div className="stat-col">
              <div className={`stat-thumb stat-cat ${statLvClassName(animalAmount[0])}`}></div>
              <div className="mt-10 font-semibold leading-tight text-4xs lg:text-2md">{animalAmount[0]}</div>
            </div>
            <div className="stat-col">
              <div className={`stat-thumb stat-dog ${statLvClassName(animalAmount[1])}`}></div>
              <div className="mt-10 font-semibold leading-tight text-4xs lg:text-2md">{animalAmount[1]}</div>
            </div>
            <div className="stat-col">
              <div className={`stat-thumb stat-mouse ${statLvClassName(animalAmount[2])}`}></div>
              <div className="mt-10 font-semibold leading-tight text-4xs lg:text-2md">{animalAmount[2]}</div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
}

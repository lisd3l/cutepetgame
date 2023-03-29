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
        setTimeout(() => {
          const pp = newVideoRef.current?.play();
          if (pp !== undefined) {
            pp.then(_ => {}).catch(_ => {
              console.log("playback prevented");
            });
          }
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateIdx]);

  useEffect(() => {
    playVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const { animalAmount } = useEthContext();

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
        <div className="relative overflow-hidden text-xs text-center px-36 home-section-intro bg-theme2">
          <div className="p-title mb-68px">Pet Battle</div>
          <div className="mx-auto leading-tight tracking-wide text-3xs content">
            We started an initiative to support pets that are left unsold and are facing problems. As part of this
            effort, we are developing a pet-themed game to raise awareness about the issue of unsold pets and encourage
            support from the public.
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs pb-15 px-36 bg-theme2">
          <div className="mb-120px">
            <div className="p-title mb-68px" id="rules" data-anchor="rules">
              Game Rules (Phase 1)
            </div>
            <ul className="leading-tight tracking-wide list-disc text-3xs">
              <li>Users choose the type of animal they want.</li>
              <li>Every day at a designated time on the blockchain, the number of each animal type is tallied.</li>
              <li>The type with the fewest numbers wins.</li>
              <li>Users can switch characters even at the last minute.</li>
              <li>At the initial stage, even the loser can earn a few battle points.</li>
            </ul>
          </div>
          <div className="mb-120px">
            <div className="p-title mb-68px" id="bouns" data-anchor="bouns">
              Bonus
            </div>
            <div className="leading-tight tracking-wide section-bonus text-3xs">
              Users who invite others can receive NFT bonuses.
            </div>
          </div>
          <div className="mb-120px">
            <div className="p-title mb-68px" id="fairness" data-anchor="fairness">
              Fairness
            </div>
            <div className="leading-tight tracking-wide text-3xs">
              To maintain fairness, this game can increase uncertainty in the results. <br />
              Anyone can win because they can switch characters even at the last minute. <br />
              In addition, all processing, such as verification and statistics, is implemented in smart contracts.
            </div>
          </div>
          <div className="mb-120px">
            <div className="p-title mb-68px" id="community" data-anchor="community">
              Community Governance
            </div>
            <div className="leading-tight tracking-wide text-3xs">
              We plan to collaborate with the Japan Pet Protection Association. We will form a Pet Protection <br />
              Association DAO to decide on the use and distribution of profits. To maintain fairness, this game can
            </div>
          </div>
          <div className="mb-120px">
            <div className="p-title mb-68px" id="roadmap" data-anchor="roadmap">
              Roadmap
            </div>
            <div className="font-bold text-2lg mb-7">2023.4 (Phase 1)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs">
              Winners will receive battle points at the beta version launch, and even the loser will receive a small
              number of battle points. Users who invite members will also receive NFT bonuses (BNB).
            </div>
            <div className="font-bold text-2lg mb-7">2023.6 (Phase 2)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs">
              Battle points can be converted to battle tokens, and the secondary market GameFi will start.
            </div>
            <div className="font-bold text-2lg mb-7">2023.8 (Phase 3)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs">
              Attributes will be added to NFTs, and same-type animals will be able to battle (PVP).
            </div>
            <div className="font-bold text-2lg mb-7">2024.1 (Phase 4)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs">
              The platform will be built, and NFTs will be reprocessed, and other games will be launched on the
              platform.
            </div>
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs pl-36 bg-theme2 pb-120px">
          <div className="p-title mb-68px">Recently Pet</div>
          <PetCarousel></PetCarousel>
        </div>
        <div className="relative overflow-hidden text-xs text-center pt-52 pb-120px px-36 bg-theme2 home-section-assets">
          <div className="p-title mb-120px">Assets held for pet</div>
          <div className="flex items-center justify-center">
            <div className="stat-col">
              <div className="stat-thumb stat-cat"></div>
              <div className="mt-10 font-semibold leading-tight text-4xs">{animalAmount[0]}</div>
            </div>
            <div className="stat-col">
              <div className="stat-thumb stat-dog"></div>
              <div className="mt-10 font-semibold leading-tight text-4xs">{animalAmount[1]}</div>
            </div>
            <div className="stat-col">
              <div className="stat-thumb stat-mouse"></div>
              <div className="mt-10 font-semibold leading-tight text-4xs">{animalAmount[2]}</div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
}

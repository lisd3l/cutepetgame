import React from "react";
import { Footer, Content, HomeHeader } from "../components";
import BannerBg from "../assets/imgs/banner.png";

export default function Home() {
  return (
    <div className="page page-home">
      <Content>
        <HomeHeader />
        <div className="relative home-banner">
          <img src={BannerBg} alt="" className="w-full align-center" />
        </div>
        <div className="relative overflow-hidden text-xs text-center px-36 home-section-intro bg-theme2">
          <div className="p-title section-gap1">Game Rules (Phase 1)</div>
          <div className="mx-auto leading-tight tracking-wide text-3xs content">
            We started an initiative to support pets that are left unsold and are facing problems. As part of this
            effort, we are developing a pet-themed game to raise awareness about the issue of unsold pets and encourage
            support from the public.
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs pb-15 px-36 bg-theme2">
          <div className="section-gap2">
            <div className="p-title section-gap1">Game Rules (Phase 1)</div>
            <ul className="leading-tight tracking-wide list-disc text-3xs">
              <li>Users choose the type of animal they want.</li>
              <li>Every day at a designated time on the blockchain, the number of each animal type is tallied.</li>
              <li>The type with the fewest numbers wins.</li>
              <li>Users can switch characters even at the last minute.</li>
              <li>At the initial stage, even the loser can earn a few battle points.</li>
            </ul>
          </div>
          <div className="section-gap2">
            <div className="p-title section-gap1">Bonus</div>
            <div className="leading-tight tracking-wide text-3xs">Users who invite others can receive NFT bonuses.</div>
          </div>
          <div className="section-gap2">
            <div className="p-title section-gap1">Community Governance</div>
            <div className="leading-tight tracking-wide text-3xs">
              We plan to collaborate with the Japan Pet Protection Association. We will form a Pet Protection <br />
              Association DAO to decide on the use and distribution of profits. To maintain fairness, this game can
            </div>
          </div>
          <div className="section-gap2">
            <div className="p-title section-gap1">Roadmap</div>
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
        <div className="relative pt-16 overflow-hidden text-xs pb-44 px-36 bg-theme2">
          <div className="p-title section-gap1">Recently Pet</div>
        </div>
        <div className="relative overflow-hidden text-xs text-center pt-52 section-pb2 px-36 bg-theme2 home-section-assets">
          <div className="p-title section-gap2">Assets held for pet</div>
        </div>
      </Content>
      <Footer />
    </div>
  );
}

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
          <a href="#rules">遊び方</a>
          //<a href="#bouns">Bouns</a>
          <a href="#fairness">公平性</a>
          <a href="#community">コミュニティガバナンス</a>
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
          <div className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8">CONPETについて</div>
          <div className="mx-auto leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md content md:text-left">
            どうしても飼育することができず、売れ残ってしまっているペットを支援するプロジェクトの一つとして
            「CONPET/コンペット」は誕生しました。
            犬や猫などのペットに関するゲームを開発し、ペット問題についての認識を高め、
            皆さんからの支援をお願いするための活動を行っています。
            CONPETを通じて、少しでも問題意識が向上することを祈っています。
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs lg:pt-10 pb-15 lg:pb-9 px-36 2xl:px-24 lg:px-10 bg-theme2">
          <div className="relative mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="rules"
              data-anchor="rules"
            >
              遊び方
            </div>
            <ul className="leading-tight tracking-wide list-disc text-3xs 2xl:text-2xs lg:text-md">
              <li>遊び方は簡単で、犬、猫、ハムスターの3匹から、どれか1匹を投票して待つだけ。</li>
              <li>制限時間が終わって、一番投票数が少なかった動物とユーザーの勝利です！</li>
              <li>このゲームの面白いところとして、制限時間ギリギリまで、「投票した動物を変更できる」です。</li>
              <li>これによって、投票が終わる最後の瞬間まで、どんな結果になるか分からなくなるのがCONPETの魅力です！</li>
              
            </ul>
            <div className="section-plate"></div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="fairness"
              data-anchor="fairness"
            >
              公平性
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              遊び方でも説明したように、投票結果の不確実性を高めることで、このゲームは公平性を維持しています。 <br />
              最後の終了間際でも投票する動物を変更できるため、勝利するチャンスは全てのユーザーに <br />
              存在しています。さらに、検証や統計などのすべての処理はスマートコントラクトで実装されています。
            </div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="community"
              data-anchor="community"
            >
              コミュニティガバナンス
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              私たちは今後、日本ペット保護協会、ペットショップと協力する予定です。<br />
              ペット保護協会DAOを結成し、利益の使用と分配について決定します。<br />
              また、下記のNPO法人様に利益の一部を寄付致します。
              <li><a href="http://npo.seikenjoto.org/page/index-4.html" className="block mt-4 sm:mt-2">
            特定非営利活動法人 保健所の成犬・猫の譲渡を推進する会Author Profile</a>
              </li>
              <li><a href="http://minashigo-joutocenter.com/" className="block mt-4 sm:mt-2">
            NPO法人みなしご救援隊 犬猫譲渡センター</a>
              </li>
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
              ベータ版をローンチします。テストチェーン上にて構築し、MINT全て無料になります。
              ゲームルールは上記に記載されている通り、勝利したユーザーは抽選によりWL（ホワイトリスト）を獲得することができます。
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.6 (Phase 2)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              ゲームの勝者がトークンをもらえます、セカンダリーマーケットのGameFiが開始されます。
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.8 (Phase 3)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              NFTに属性が追加され、同じタイプの動物同士で戦闘（PVP）ができるようになります。
              ペット保護協会DAOを結成します。利益の用途は全てNFT所持が決めます。
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2024.1 (Phase 4)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              ゲームプラットフォームの構築。他のゲームの立ち上げ。まだまだ始まったばかりです。これからのロードマップに乞うご期待。
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

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
          <a href="#rules">�V�ѕ�</a>
          //<a href="#bouns">Bouns</a>
          <a href="#fairness">������</a>
          <a href="#community">�R�~���j�e�B�K�o�i���X</a>
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
          <div className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8">CONPET�ɂ���</div>
          <div className="mx-auto leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md content md:text-left">
            �ǂ����Ă����炷�邱�Ƃ��ł����A����c���Ă��܂��Ă���y�b�g���x������v���W�F�N�g�̈�Ƃ���
            �uCONPET/�R���y�b�g�v�͒a�����܂����B
            ����L�Ȃǂ̃y�b�g�Ɋւ���Q�[�����J�����A�y�b�g���ɂ��Ă̔F�������߁A
            �F���񂩂�̎x�������肢���邽�߂̊������s���Ă��܂��B
            CONPET��ʂ��āA�����ł����ӎ������シ�邱�Ƃ��F���Ă��܂��B
          </div>
        </div>
        <div className="relative pt-16 overflow-hidden text-xs lg:pt-10 pb-15 lg:pb-9 px-36 2xl:px-24 lg:px-10 bg-theme2">
          <div className="relative mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="rules"
              data-anchor="rules"
            >
              �V�ѕ�
            </div>
            <ul className="leading-tight tracking-wide list-disc text-3xs 2xl:text-2xs lg:text-md">
              <li>�V�ѕ��͊ȒP�ŁA���A�L�A�n���X�^�[��3�C����A�ǂꂩ1�C�𓊕[���đ҂����B</li>
              <li>�������Ԃ��I����āA��ԓ��[�������Ȃ����������ƃ��[�U�[�̏����ł��I</li>
              <li>���̃Q�[���̖ʔ����Ƃ���Ƃ��āA�������ԃM���M���܂ŁA�u���[����������ύX�ł���v�ł��B</li>
              <li>����ɂ���āA���[���I���Ō�̏u�Ԃ܂ŁA�ǂ�Ȍ��ʂɂȂ邩������Ȃ��Ȃ�̂�CONPET�̖��͂ł��I</li>
              
            </ul>
            <div className="section-plate"></div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="fairness"
              data-anchor="fairness"
            >
              ������
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              �V�ѕ��ł����������悤�ɁA���[���ʂ̕s�m���������߂邱�ƂŁA���̃Q�[���͌��������ێ����Ă��܂��B <br />
              �Ō�̏I���ԍۂł����[���铮����ύX�ł��邽�߁A��������`�����X�͑S�Ẵ��[�U�[�� <br />
              ���݂��Ă��܂��B����ɁA���؂ⓝ�v�Ȃǂ̂��ׂĂ̏����̓X�}�[�g�R���g���N�g�Ŏ�������Ă��܂��B
            </div>
          </div>
          <div className="mb-120px lg:mb-12 md:mb-9">
            <div
              className="p-title text-4md 2xl:text-3xs lg:text-2md md:text-2xs mb-68px lg:mb-8"
              id="community"
              data-anchor="community"
            >
              �R�~���j�e�B�K�o�i���X
            </div>
            <div className="leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              �������͍���A���{�y�b�g�ی싦��A�y�b�g�V���b�v�Ƌ��͂���\��ł��B<br />
              �y�b�g�ی싦��DAO���������A���v�̎g�p�ƕ��z�ɂ��Č��肵�܂��B<br />
              �܂��A���L��NPO�@�l�l�ɗ��v�̈ꕔ����t�v���܂��B
              <li><a href="http://npo.seikenjoto.org/page/index-4.html" className="block mt-4 sm:mt-2">
            �����c�������@�l �ی����̐����E�L�̏��n�𐄐i�����Author Profile</a>
              </li>
              <li><a href="http://minashigo-joutocenter.com/" className="block mt-4 sm:mt-2">
            NPO�@�l�݂Ȃ����~���� ���L���n�Z���^�[</a>
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
              �x�[�^�ł����[���`���܂��B�e�X�g�`�F�[����ɂč\�z���AMINT�S�Ė����ɂȂ�܂��B
              �Q�[�����[���͏�L�ɋL�ڂ���Ă���ʂ�A�����������[�U�[�͒��I�ɂ��WL�i�z���C�g���X�g�j���l�����邱�Ƃ��ł��܂��B
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.6 (Phase 2)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              �Q�[���̏��҂��g�[�N�������炦�܂��A�Z�J���_���[�}�[�P�b�g��GameFi���J�n����܂��B
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2023.8 (Phase 3)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              NFT�ɑ������ǉ�����A�����^�C�v�̓������m�Ő퓬�iPVP�j���ł���悤�ɂȂ�܂��B
              �y�b�g�ی싦��DAO���������܂��B���v�̗p�r�͑S��NFT���������߂܂��B
            </div>
            <div className="font-bold text-2lg 2xl:text-2xs lg:text-lg mb-7">2024.1 (Phase 4)</div>
            <div className="mb-12 leading-tight tracking-wide text-3xs 2xl:text-2xs lg:text-md">
              �Q�[���v���b�g�t�H�[���̍\�z�B���̃Q�[���̗����グ�B�܂��܂��n�܂����΂���ł��B���ꂩ��̃��[�h�}�b�v�Ɍ�����ҁB
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

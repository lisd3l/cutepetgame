import React, { useMemo, useState } from "react";
import { Pagination, Skeleton, notification } from "antd";
import { useContractReader, useGasPrice } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import { Content, Footer, Header } from "../components";
import {
  useCountDown,
  useAnimalPartysFetch,
  useCurrentAddress,
  useLocalProvider,
  useTimeLeft,
  useEthContext,
} from "../hooks";
import { TransferCard, Account } from "../components";
import { getTargetNetwork } from "../constants";
import { Transactor } from "../helpers";
import { MintUrl } from "../helpers/utils";
import { Link } from "react-router-dom";

const MyWallet = () => {
  const targetNetwork = getTargetNetwork();

  const localProvider = useLocalProvider();
  const {
    web3Modal,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    userSigner,
    mainnetProvider,
    readContracts,
    writeContracts,
    transferEventCount,
    animalAmount,
  } = useEthContext();

  const currentAddress = useCurrentAddress(userSigner);

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);
  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // The transactor wraps transactions and provides notificiations
  const tx = useMemo(() => Transactor(userSigner, gasPrice), [gasPrice, userSigner]);

  // get time left from contracts
  const timeLeftContract = useTimeLeft(readContracts);
  const timeLeft = useCountDown(timeLeftContract);
  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader<number>(readContracts, "AnimalParty", "balanceOf", [currentAddress]) || 0;
  const [allAnimalPartys, animalPartyLoading] = useAnimalPartysFetch(
    transferEventCount,
    currentAddress,
    balance,
    readContracts,
  );

  const [transferToAddresses, setTransferToAddresses] = useState<Record<string, string>>({});
  const blockExplorer = targetNetwork.blockExplorer;
  const [minting, setMinting] = useState<Record<number, boolean>>({});

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const animalPartys = useMemo(() => {
    return allAnimalPartys.slice(pageSize * (page - 1), pageSize * page);
  }, [page, allAnimalPartys]);

  return (
    <div className="page page-wallet">
      <Content>
        <Header>
          <Link to="/">Home</Link>
          <a href={MintUrl} target="_blank" rel="noreferrer">
            Mint
          </a>
          <Account
            address={currentAddress}
            localProvider={localProvider}
            userSigner={userSigner}
            mainnetProvider={mainnetProvider}
            price={price}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            blockExplorer={blockExplorer}
          ></Account>
        </Header>
        <div className="header-offset px-36">
          <div className="text-center mt-120px">
            <div className="p-title theme2">My Wallet</div>
          </div>
          <div className="py-12 mt-20 text-center pet-card">
            <div className="leading-none text-3xs">{timeLeft} left until today</div>
            <div className="mt-12 mb-4 leading-tight text-4xs">Amount</div>
            <div className="inline-flex items-center mt-4 font-bold">
              <div className="inline-flex items-center" title="Cat">
                <div className="mr-2 icon-pet icon-pet-cat"></div>
                <div className="leading-tight text-white text-2md">{animalAmount[0].toLocaleString()}</div>
              </div>
              <div className="inline-flex items-center ml-20" title="Dog">
                <div className="mr-2 icon-pet icon-pet-dog"></div>
                <div className="leading-tight text-2md text-pgreen">{animalAmount[1].toLocaleString()}</div>
              </div>
              <div className="inline-flex items-center ml-20" title="Mouse">
                <div className="mr-2 icon-pet icon-pet-mouse"></div>
                <div className="leading-tight text-2md text-pred">{animalAmount[2].toLocaleString()}</div>
              </div>
            </div>
          </div>
          {!web3Modal?.cachedProvider && (
            <div className="relative block w-1/2 py-48 mx-auto text-center">
              <span className="block mt-2 font-pzl text-2xs text-white70">No connected yet.</span>
            </div>
          )}
          {web3Modal?.cachedProvider && animalPartys.length === 0 && !animalPartyLoading && (
            <div className="relative block w-1/2 py-48 mx-auto text-center">
              <span className="block mt-2 font-pzl text-2xs text-white70">No pets yet.</span>
            </div>
          )}
          {animalPartys.length === 0 && animalPartyLoading && (
            <div className="grid grid-cols-2 gap-12 mt-20 mb-10">
              {new Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} active avatar className="pet-skeleton" />
              ))}
            </div>
          )}
          {animalPartys.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-12 mt-20 mb-10">
                {animalPartys.map(animalParty => {
                  const id = animalParty.id.toNumber();
                  return (
                    <TransferCard
                      key={`${id}_${animalParty.uri}_${animalParty.owner}`}
                      owner={animalParty}
                      provider={mainnetProvider}
                      blockExplorer={blockExplorer}
                      address={transferToAddresses[id]}
                      minting={minting[id]}
                      onChange={val => {
                        setTransferToAddresses({ ...transferToAddresses, [id]: val });
                      }}
                      onMint={method => {
                        if (minting[id]) return;
                        setMinting({ ...minting, [id]: true });
                        tx(
                          writeContracts?.AnimalParty?.[method]?.(id),
                          (update: {
                            status: string | number;
                            hash: string;
                            gasUsed: string;
                            gasLimit: any;
                            gas: any;
                            gasPrice: string;
                          }) => {
                            console.log("📡 Transaction Update:", update);
                            if (update && (update.status === "confirmed" || update.status === 1)) {
                              console.log(" 🍾 Transaction " + update.hash + " finished!");
                              console.log(
                                " ⛽️ " +
                                  update.gasUsed +
                                  "/" +
                                  (update.gasLimit || update.gas) +
                                  " @ " +
                                  parseFloat(update.gasPrice) / 1000000000 +
                                  " gwei",
                              );
                            }
                          },
                        ).finally(() => {
                          setMinting({ ...minting, [id]: false });
                        });
                      }}
                      onTransfer={toAddress => {
                        if (!toAddress) {
                          notification.error({
                            message: "Error",
                            description: "Please input a valid address",
                          });
                          return;
                        }
                        console.log("writeContracts", writeContracts);
                        tx(writeContracts.AnimalParty.transferFrom(currentAddress, toAddress, id));
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-end">
                <Pagination
                  simple
                  current={page}
                  pageSize={pageSize}
                  total={allAnimalPartys.length}
                  onChange={p => setPage(p)}
                  className="wallet-pagination"
                />
              </div>
            </>
          )}
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default MyWallet;

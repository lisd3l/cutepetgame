import React, { useMemo, useState } from "react";
import { Pagination } from "antd";
import { useContractReader, useGasPrice, useUserProviderAndSigner } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import { Content, Footer, Header } from "../components";
import {
  useCountDown,
  useAnimalPartysFetch,
  useCurrentAddress,
  useWeb3Modal,
  useMainnetProvider,
  useLocalProvider,
  useContracts,
} from "../hooks";
import { TransferCard, Account } from "../components";
import { getTargetNetwork } from "../constants";
import { Transactor } from "../helpers";

const MyWallet = () => {
  const timeLeft = useCountDown();
  const targetNetwork = getTargetNetwork();

  const localProvider = useLocalProvider();
  const { web3Modal, injectedProvider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
  const userSigner = userProviderAndSigner?.signer;

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider?._network?.chainId;
  // const selectedChainId = ((userSigner?.provider as any)?._network as ethers.providers.Network)?.chainId;

  const currentAddress = useCurrentAddress(userSigner);
  const mainnetProvider = useMainnetProvider();
  const { readContracts, writeContracts } = useContracts(mainnetProvider, userSigner, localChainId);

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);
  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // The transactor wraps transactions and provides notificiations
  const tx = useMemo(() => Transactor(userSigner, gasPrice), [gasPrice, userSigner]);

  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader<number>(readContracts, "AnimalParty", "balanceOf", [currentAddress]) || 0;
  const allAnimalPartys = useAnimalPartysFetch(currentAddress, balance, readContracts);
  const [transferToAddresses, setTransferToAddresses] = useState<Record<string, string>>({});
  const blockExplorer = targetNetwork.blockExplorer;

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const animalPartys = useMemo(() => {
    return allAnimalPartys.slice(pageSize * (page - 1), pageSize * page);
  }, [page, allAnimalPartys]);

  return (
    <div className="page page-wallet">
      <Content>
        <Header>
          <a href="/">Home</a>
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
                <div className="leading-tight text-white text-2md">12,456</div>
              </div>
              <div className="inline-flex items-center ml-20" title="Dog">
                <div className="mr-2 icon-pet icon-pet-dog"></div>
                <div className="leading-tight text-2md text-pgreen">2,456</div>
              </div>
              <div className="inline-flex items-center ml-20" title="Mouse">
                <div className="mr-2 icon-pet icon-pet-mouse"></div>
                <div className="leading-tight text-2md text-pred">22,456</div>
              </div>
            </div>
          </div>
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
                  onChange={val => {
                    setTransferToAddresses({ ...transferToAddresses, [id]: val });
                  }}
                  onTransfer={toAddress => {
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
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default MyWallet;
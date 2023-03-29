import React from "react";
import { Signer, providers } from "ethers";
import useWeb3Modal from "./useWeb3Modal";
import useContracts from "./useContracts";

type EthContextType = ReturnType<typeof useWeb3Modal> &
  ReturnType<typeof useContracts> & {
    userSigner: Signer | undefined;
    mainnetProvider: providers.StaticJsonRpcProvider;
    transferEventCount: number;
    /**
     * array of animal amount has three elements: [cat, dog, mouse]
     */
    animalAmount: number[];
  };

export const EthContext = React.createContext<EthContextType>({} as EthContextType);
export const useEthContext = () => React.useContext(EthContext);

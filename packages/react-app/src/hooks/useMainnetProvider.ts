import { ethers } from "ethers";

import { ALCHEMY_KEY } from "../constants";
import { useOnBlock } from "eth-hooks";

let mainnetProvider: ethers.providers.StaticJsonRpcProvider;

function getMainnetProvider() {
  const scaffoldEthProvider = navigator.onLine
    ? new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544")
    : null;
  const poktMainnetProvider = navigator.onLine
    ? new ethers.providers.StaticJsonRpcProvider(
        "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
      )
    : null;
  const mainnetInfura = navigator.onLine
    ? new ethers.providers.StaticJsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`)
    : null;

  return scaffoldEthProvider || poktMainnetProvider || mainnetInfura;
}

export default function useMainnetProvider() {
  if (!mainnetProvider) {
    mainnetProvider = getMainnetProvider() || new ethers.providers.StaticJsonRpcProvider();
  }
  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  });

  return mainnetProvider;
}

import { useContractLoader } from "eth-hooks";
import { ethers, Signer } from "ethers";
import { useContractConfig } from "./useContractConfig";
import useLocalProvider from "./useLocalProvider";

export default function useContracts(
  mainnetProvider: ethers.providers.StaticJsonRpcProvider,
  userSigner: Signer | undefined,
  localChainId: number,
) {
  const contractConfig = useContractConfig();
  const localProvider = useLocalProvider();

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);
  return {
    readContracts,
    writeContracts,
    mainnetContracts,
  };
}

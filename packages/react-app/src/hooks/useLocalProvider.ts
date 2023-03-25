import { ethers } from "ethers";
import { DEBUG } from "../config";
import { getTargetNetwork } from "../constants";

let localProvider: ethers.providers.StaticJsonRpcProvider;

function getLocalProvider() {
  const targetNetwork = getTargetNetwork();
  const localProviderUrl = targetNetwork.rpcUrl;
  // as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
  const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
  if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
  return new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);
}

export default function useLocalProvider() {
  if (!localProvider) {
    localProvider = getLocalProvider();
  }
  return localProvider;
}

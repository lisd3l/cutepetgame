import { useUserProviderAndSigner } from "eth-hooks";
import { useState, useEffect } from "react";
import type { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";

export default function useCurrentAddress(injectedProvider: Web3Provider | undefined, userSigner: Signer | undefined) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  return address;
}

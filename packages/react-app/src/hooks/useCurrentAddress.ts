import { useState, useEffect } from "react";
import { Signer } from "ethers";

export default function useCurrentAddress(userSigner: Signer | undefined) {
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

import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";

/**
 * get animal amount from contract
 * @param transferEventCount trigger to update animal amount
 * @param readContracts contract instance
 * @return array of animal amount has three elements: [cat, dog, mouse]
 */
export default function useAnimalAmount(transferEventCount: number, readContracts: Record<string, Contract>) {
  const [animalAmount, setAnimalAmount] = useState([0, 0, 0]);
  let isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    const checkAnimalAmount = async () => {
      try {
        const res: BigNumber[] = await readContracts.ERC1967Proxy?.checkAllConpet();
        if (res && res.length === 3 && isMounted.current) {
          setAnimalAmount([res[0].toNumber(), res[1].toNumber(), res[2].toNumber()]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkAnimalAmount();
    return () => {
      isMounted.current = false;
    };
  }, [transferEventCount, readContracts.ERC1967Proxy]);
  return animalAmount;
}

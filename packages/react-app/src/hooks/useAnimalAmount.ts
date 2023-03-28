import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";

export default function useAnimalAmount(transferEventCount: number, readContracts: Record<string, Contract>) {
  // animalAmount[[cat], [dog], [mouse]]
  const [animalAmount, setAnimalAmount] = useState([0, 0, 0]);
  let isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    const checkAnimalAmount = async () => {
      try {
        const res: Record<string, BigNumber> = await readContracts.AnimalParty?.checkAmountOfAP();
        if (res && isMounted.current) {
          setAnimalAmount([res.cat.toNumber(), res.dog.toNumber(), res.mouse.toNumber()]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkAnimalAmount();
    return () => {
      isMounted.current = false;
    };
  }, [transferEventCount, readContracts.AnimalParty]);
  return animalAmount;
}

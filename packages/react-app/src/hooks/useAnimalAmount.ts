import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

export default function useAnimalAmount(readContracts: Record<string, Contract>) {
  // animalAmount[[cat], [dog], [mouse]]
  const [animalAmount, setAnimalAmount] = useState([0, 0, 0]);
  useEffect(() => {
    const checkAnimalAmount = async () => {
      try {
        const res: Record<string, BigNumber> = await readContracts.AnimalParty?.checkAmountOfAP();
        if (res) {
          setAnimalAmount([res.cat.toNumber(), res.dog.toNumber(), res.mouse.toNumber()]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkAnimalAmount();
  }, [readContracts.AnimalParty]);
  return animalAmount;
}

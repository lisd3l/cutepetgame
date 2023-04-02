import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

export default function useTimeLeft(readContracts: Record<string, Contract>) {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const getTimeLefting = async () => {
      try {
        const res: BigNumber = await readContracts.PoolContract?.timeLefting();
        if (res) {
          setTimeLeft(res.toNumber());
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTimeLefting();
  }, [readContracts.PoolContract]);
  return timeLeft;
}

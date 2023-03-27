import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

export default function useTimeLeft(readContracts: Record<string, Contract>) {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const getTimeLefting = async () => {
      try {
        const res: BigNumber = await readContracts.MyContract?.getTimeLefting();
        if (res) {
          setTimeLeft(res.toNumber());
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTimeLefting();
  }, [readContracts.MyContract]);
  return timeLeft;
}

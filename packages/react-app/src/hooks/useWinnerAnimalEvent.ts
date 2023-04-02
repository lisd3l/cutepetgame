import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

import { WinnerAnimalConstants } from "../helpers/utils";

export default function useWinnerAnimalEvent(readContracts: Record<string, Contract>) {
  const [resultMessage, setResultMessage] = useState<{"time": string, "message": string}>({"time": "", "message": ""});
  const [winResultTime, setWinResultTime] = useState<BigNumber[]>([]);
  useEffect(() => {
    const filter = readContracts.PoolContract?.filters.WinAnimal(null, null);
    readContracts.PoolContract?.on(filter, (animal: BigNumber, time: BigNumber) => {
      if (winResultTime.indexOf(time) === -1) {
        setWinResultTime(oldArray => [...oldArray, time]);
        const message = WinnerAnimalConstants.filter(
          ac => ac.key === animal.toNumber())[0].winnerMessage;
        const date = new Date(time.toNumber() * 1000);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hour = date.getUTCHours().toString().padStart(2, '0');
        const minute = date.getUTCMinutes().toString().padStart(2, '0');
        const second = date.getUTCSeconds().toString().padStart(2, '0');
        setResultMessage({
          "time": `${year}-${month}-${day} ${hour}:${minute}:${second}`,
          "message": message,
        });
      }
    });
    return () => {
      readContracts.PoolContract?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readContracts.PoolContract]);
  return resultMessage;
}

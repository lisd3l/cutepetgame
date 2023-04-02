import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

export default function useTransferEvent(readContracts: Record<string, Contract>) {
  const [transferEventCount, setTransferEventCount] = useState(1);
  useEffect(() => {
    const filter = readContracts.AnimalParty?.filters.Transfer(null, null, null);
    readContracts.AnimalParty?.on(filter, (from: string, to: string, tokenId: BigNumber) => {
      if (from && to && tokenId.gte(0)) {
        setTransferEventCount(transferEventCount + 1);
      }
    });
    const convertFilter = readContracts.AnimalParty?.filters.FormChange(null, null, null);
    readContracts.AnimalParty?.on(convertFilter, (from: BigNumber, to: BigNumber, user: string) => {
      if (user && from.gt(0) && to.gt(0)) {
        setTransferEventCount(transferEventCount + 1);
      }
    });
    return () => {
      readContracts.AnimalParty?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readContracts.AnimalParty]);
  return transferEventCount;
}

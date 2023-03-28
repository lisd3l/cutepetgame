import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

export default function useTransferEvent(readContracts: Record<string, Contract>) {
  const [transferEventCount, setTransferEventCount] = useState(1);
  const filter = readContracts.AnimalParty?.filters.Transfer(null, null, null);
  readContracts.AnimalParty?.on(filter, (from: string, to: string, tokenId: BigNumber) => {
    if (from && to && tokenId.gte(0)) {
      setTransferEventCount(transferEventCount + 1);
    }
  });
  return transferEventCount;
}

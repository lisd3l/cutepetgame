import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";

export default function useAnimalPartysFetch(
  transferEventCount: number,
  address: string,
  balance: number,
  readContracts: Record<string, Contract>,
) {
  const [animalPartys, setAnimalPartys] = useState<AnimalParty[]>([]);
  let isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const updateAnimalPartys = async () => {
      const collectibleUpdate: any[] = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("GEtting token index", tokenIndex);
          const tokenId = await readContracts.AnimalParty.tokenOfOwnerByIndex(address, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts.AnimalParty.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);
          const tokenStatic: BigNumber = await readContracts.AnimalParty.tokenStatic(tokenId);
          console.log("tokenStatic", tokenStatic);

          const reg = /^\s+|\s+$/g;

          // const jsonManifestBuffer = await getFromIPFS(cid, tokenId);
          const response = await fetch("https://ipfs.io/ipfs/" + tokenURI.replace("ipfs://", "").replace(reg, ""));
          if (response.ok) {
            const jsonManifestBuffer = await response.json();
            console.log("jsonManijsonManifestBufferfest", jsonManifestBuffer);
            const imageResponse = await fetch(
              "https://ipfs.io/ipfs/" + jsonManifestBuffer.image.replace("ipfs://", "").replace(reg, ""),
            );
            if (imageResponse.ok) {
              jsonManifestBuffer.image = imageResponse.url;
              collectibleUpdate.push({
                id: tokenId,
                uri: tokenURI,
                category: tokenStatic.toNumber(),
                owner: address,
                ...jsonManifestBuffer,
              });
            }
          }
          // try {
          //   const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
          //   console.log("jsonManifest", jsonManifest);
          //   collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
          // } catch (e) {
          //   console.log(e);
          // }
        } catch (e) {
          console.log(e);
        }
      }
      if (isMounted.current) {
        setAnimalPartys(collectibleUpdate);
      }
    };
    updateAnimalPartys();
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferEventCount, address, balance, readContracts.AnimalParty]);

  return animalPartys;
}

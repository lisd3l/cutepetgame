import { Contract } from "@ethersproject/contracts";
import { useEffect, useState } from "react";

export default function useAnimalPartysFetch(
  address: string,
  balance: number,
  readContracts: Record<string, Contract>,
) {
  const [animalPartys, setAnimalPartys] = useState<AnimalParty[]>([]);

  useEffect(() => {
    const updateAnimalPartys = async () => {
      const collectibleUpdate: any[] = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("GEtting token index", tokenIndex);
          const tokenId = await readContracts.AnimalParty.tokenOfOwnerByIndex(address, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts.AnimalParty.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);

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
              collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifestBuffer });
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
      setAnimalPartys(collectibleUpdate);
    };
    updateAnimalPartys();
  }, [address, balance, readContracts.AnimalParty]);

  return animalPartys;
}

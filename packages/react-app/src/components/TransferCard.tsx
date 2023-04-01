import React from "react";
import { Button } from "antd";

import SamplePet from "../assets/imgs/sample-pet.png";
import AddressInput from "./AddressInput";
import Address from "./Address";
import type { TEthersProvider } from "eth-hooks/models/providerTypes";
import { AnimalConstants } from "../helpers/utils";

interface TransforCardProps {
  owner: AnimalParty;
  provider: TEthersProvider;
  blockExplorer?: string;
  address: string;
  minting: boolean;
  breakpoint: string;
  onChange: (value: string) => void;
  onTransfer: (toAddress: string) => void;
  onMint: (method: string) => void;
}
const TransferCard: React.FC<TransforCardProps> = props => {
  const { owner, minting, provider, blockExplorer, address, breakpoint, onChange, onTransfer, onMint } = props;
  return (
    <div className="flex items-start p-6 sm:flex-col sm:items-center 2xl:p-4 pet-card">
      <img
        src={owner.image || SamplePet}
        className="w-40 h-40 align-middle 2xl:w-36 2xl:h-36 sm:w-40 sm:h-40 rounded-xl"
        alt="Pet"
      ></img>
      <div className="flex flex-col justify-between flex-1 h-40 2xl:h-36 sm:items-center ml-11 sm:ml-0 sm:w-full sm:h-auto">
        <div className="flex items-center sm:py-6">
          <div className="leading-7 text-2xs 2xl:text-lg sm:text-md">{owner.name}</div>
          <div className="inline-flex items-center ml-4 leading-none text-md sm:text-xs text-white70">
            <div className="mr-2">owner:</div>
            <Address
              address={owner.owner}
              ensProvider={provider}
              blockExplorer={blockExplorer}
              showBlockie={false}
              fontSize={breakpoint === "sm" ? 12 : 16}
              color="rgba(255, 255, 255, 0.7)"
            ></Address>
          </div>
        </div>
        <div className="flex items-center sm:flex-col sm:w-full">
          <AddressInput
            className="flex-1 sm:flex-none sm:w-full"
            ensProvider={provider}
            placeholder="transfer to address"
            value={address}
            onChange={onChange}
          />
          <div className="flex-none ml-5 sm:w-full sm:ml-0 sm:mt-6 transfer-wrapper">
            <Button type="default" size="large" onClick={() => onTransfer(address)}>
              Transfer
            </Button>
          </div>
        </div>
        <div className="sm:w-full">
          {AnimalConstants.filter(ac => ac.key !== owner.category).map(ac => (
            <Button
              key={ac.key}
              type="primary"
              size="large"
              className="mr-2 sm:w-full sm:mr-0 sm:mt-6"
              onClick={() => onMint(ac.method)}
              loading={minting}
            >
              Convert {ac.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferCard;

import React from "react";
import { Button } from "antd";

import SamplePet from "../assets/imgs/sample-pet.png";
import AddressInput from "./AddressInput";
import Address from "./Address";
import type { TEthersProvider } from "eth-hooks/models/providerTypes";

interface TransforCardProps {
  owner: AnimalParty;
  provider: TEthersProvider;
  blockExplorer?: string;
  address: string;
  onChange: (value: string) => void;
  onTransfer: (toAddress: string, id: string) => void;
}
const TransferCard: React.FC<TransforCardProps> = props => {
  const { owner, provider, blockExplorer, address, onChange, onTransfer } = props;
  return (
    <div className="flex items-start p-6 pet-card">
      <img src={SamplePet} className="w-40 h-40 align-middle rounded-xl" alt="Pet"></img>
      <div className="flex flex-col justify-between flex-1 h-40 ml-11">
        <div className="flex items-center">
          <div className="leading-7 text-2xs">#10 Rhino</div>
          <Address address={owner.owner} ensProvider={provider} blockExplorer={blockExplorer}></Address>
          {/* <div className="ml-4 leading-none text-md text-white70">owner: 0x820E</div> */}
        </div>
        <div className="flex items-center w-full">
          <AddressInput
            className="flex-1"
            ensProvider={provider}
            placeholder="transfer to address"
            value={address}
            onChange={onChange}
          />
          <div className="flex-none ml-5 transfer-wrapper">
            <Button type="default" size="large" onClick={() => onTransfer(address, owner.id)}>
              Transfer
            </Button>
          </div>
        </div>
        <div>
          <Button type="primary" size="large">
            Convert Cat
          </Button>
          <Button className="ml-5" type="primary" size="large">
            Convert Mouse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferCard;

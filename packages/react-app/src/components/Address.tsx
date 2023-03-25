import { Typography } from "antd";
import React from "react";
import Blockies from "react-blockies";
import { useLookupAddress } from "eth-hooks/dapps/ens";
import type { TEthersProvider } from "eth-hooks/models/providerTypes";

// changed value={address} to address={address}

/*
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
*/

const { Text } = Typography;

const blockExplorerLink = (address: string, blockExplorer: string) =>
  `${blockExplorer || "https://etherscan.io/"}${"address/"}${address}`;

interface AddressProps {
  address: string;
  value?: string;
  ensProvider?: TEthersProvider;
  size?: "short" | "long";
  blockExplorer?: string;
  minimized?: boolean;
  onChange?: (value: string) => void;
  fontSize?: number;
  color?: string;
  showBlockie?: boolean;
}

export default function Address({
  address: _address,
  value,
  ensProvider,
  size,
  blockExplorer,
  minimized,
  onChange,
  fontSize,
  color,
  showBlockie = true,
}: AddressProps) {
  const address = value || _address;

  const ens = useLookupAddress(ensProvider, address);

  if (!address) {
    return <span></span>;
  }

  let displayAddress = address.substring(0, 6);

  if (ens && ens.indexOf("0x") < 0) {
    displayAddress = ens;
  } else if (size === "short") {
    displayAddress += "..." + address.substring(-4);
  } else if (size === "long") {
    displayAddress = address;
  }

  const etherscanLink = blockExplorerLink(address, blockExplorer || "");
  if (minimized) {
    return (
      <span className="inline-flex items-center">
        <a target="_blank" href={etherscanLink} rel="noopener noreferrer">
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
        </a>
      </span>
    );
  }

  let text;
  if (onChange) {
    text = (
      <Text editable={{ onChange: onChange }} copyable={{ text: address }} className="addr-antd-text">
        <a target="_blank" href={etherscanLink} rel="noopener noreferrer" className="align-middle">
          {displayAddress}
        </a>
      </Text>
    );
  } else {
    text = (
      <Text copyable={{ text: address }} className="addr-antd-text">
        <a target="_blank" href={etherscanLink} rel="noopener noreferrer" className="align-middle">
          {displayAddress}
        </a>
      </Text>
    );
  }

  return (
    <span className="inline-flex items-center">
      {showBlockie && (
        <span>
          <Blockies seed={address.toLowerCase()} color={color} size={8} scale={fontSize ? fontSize / 7 : 4} />
        </span>
      )}
      <span className="mr-1.5" style={{ fontSize: fontSize ? fontSize : 28, color }}>
        {text}
      </span>
    </span>
  );
}

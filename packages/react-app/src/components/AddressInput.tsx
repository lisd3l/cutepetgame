import Blockie from "./Blockie";
import QrReader from "react-qr-reader";
import React, { useCallback, useState } from "react";
import { Input, Modal } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import { useLookupAddress } from "eth-hooks/dapps/ens";
import type { TEthersProvider } from "eth-hooks/models/providerTypes";

// probably we need to change value={toAddress} to address={toAddress}

/*
  ~ What it does? ~
  Displays an address input with QR scan option
  ~ How can I use? ~
  <AddressInput
    autoFocus
    ensProvider={mainnetProvider}
    placeholder="Enter address"
    value={toAddress}
    onChange={setToAddress}
  />
  ~ Features ~
  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
  - Provide placeholder="Enter address" value for the input
  - Value of the address input is stored in value={toAddress}
  - Control input change by onChange={setToAddress}
                          or onChange={address => { setToAddress(address);}}
*/

const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

export interface AddressInputProps {
  value: string;
  ensProvider: TEthersProvider;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
}

const AddressInput: React.FC<AddressInputProps & { className?: string }> = props => {
  const { ensProvider, onChange, value } = props;
  const [scan, setScan] = useState(false);

  const ens = useLookupAddress(props.ensProvider, value);

  const updateAddress = useCallback(
    async newValue => {
      if (typeof newValue !== "undefined") {
        let address = newValue;
        if (isENS(address)) {
          try {
            const possibleAddress = await ensProvider.resolveName(address);
            if (possibleAddress) {
              address = possibleAddress;
            }
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }
        onChange(address);
      }
    },
    [ensProvider, onChange],
  );

  return (
    <div className={props.className}>
      <Modal
        title="QR Reader"
        visible={scan}
        footer={null}
        keyboard
        maskClosable
        onCancel={() => setScan(false)}
        destroyOnClose
      >
        <QrReader
          delay={250}
          resolution={1200}
          onError={e => {
            console.log("SCAN ERROR", e);
            setScan(false);
          }}
          onScan={newValue => {
            if (newValue) {
              console.log("SCAN VALUE", newValue);
              let possibleNewValue = newValue;
              if (possibleNewValue.indexOf("/") >= 0) {
                possibleNewValue = possibleNewValue.substr(possibleNewValue.lastIndexOf("0x"));
                console.log("CLEANED VALUE", possibleNewValue);
              }
              setScan(false);
              updateAddress(possibleNewValue);
            }
          }}
          className="w-full"
        />
      </Modal>
      <Input
        id="0xAddress" // name it something other than address for auto fill doxxing
        name="0xAddress" // name it something other than address for auto fill doxxing
        autoComplete="off"
        className="addr-input"
        autoFocus={props.autoFocus}
        placeholder={props.placeholder ? props.placeholder : "address"}
        prefix={<Blockie seed={value} size={8} scale={3} />}
        bordered={false}
        value={ethers.utils.isAddress(value) && !isENS(value) && isENS(ens) ? ens : value}
        addonBefore={
          <div
            className="flex items-center justify-center cursor-pointer w-9 h-9 qrcode-btn hover:opacity-75"
            onClick={() => {
              setScan(!scan);
            }}
          >
            <QrcodeOutlined style={{ fontSize: 20, color: "var(--addr-color)" }} />
          </div>
        }
        onChange={e => {
          updateAddress(e.target.value);
        }}
      />
    </div>
  );
};

export default AddressInput;

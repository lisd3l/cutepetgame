import { notification } from "antd";
import Notify, { InitOptions } from "bnc-notify";
import { BLOCKNATIVE_DAPPID } from "../constants";
import { ContractFunction, ethers, Signer } from "ethers";
import { DEBUG } from "../config";

// this should probably just be renamed to "notifier"
// it is basically just a wrapper around BlockNative's wonderful Notify.js
// https://docs.blocknative.com/notify
const callbacks: {
  [key: string]: (tx: any) => void;
} = {};

const Transactor: (
  providerOrSigner?: Signer | ethers.providers.Provider,
  gasPrice?: number,
  etherscan?: string,
) => ContractFunction = (providerOrSigner, gasPrice, etherscan) => {
  // eslint-disable-next-line consistent-return
  return async (tx: any, callback?: (tx: any) => void) => {
    if (typeof providerOrSigner === "undefined") return;
    let signer: ethers.Signer | undefined;
    let network: ethers.providers.Network | undefined;
    let provider: ethers.providers.Provider | undefined;
    if (ethers.Signer.isSigner(providerOrSigner) === true) {
      signer = providerOrSigner as unknown as Signer;
      provider = signer.provider;
      network = await provider?.getNetwork();
    } else if ((providerOrSigner as unknown as ethers.providers.Provider)._isProvider) {
      provider = providerOrSigner as unknown as ethers.providers.Provider;
      signer = (provider as any).getSigner();
      network = await provider.getNetwork();
    }

    console.log("network", network);

    let options: InitOptions | null = null;
    let notify = null;
    if (navigator.onLine) {
      options = {
        dappId: BLOCKNATIVE_DAPPID, // GET YOUR OWN KEY AT https://account.blocknative.com
        system: "ethereum",
        networkId: network?.chainId,
        // darkMode: Boolean, // (default: false)
        transactionHandler: (txInformation: any) => {
          if (DEBUG) console.log("HANDLE TX", txInformation);
          const possibleFunction = callbacks[txInformation.transaction.hash];
          if (typeof possibleFunction === "function") {
            possibleFunction(txInformation.transaction);
          }
        },
      };

      notify = Notify(options);
    }

    let etherscanNetwork = "";
    if (network && network.name && network.chainId > 1) {
      etherscanNetwork = network.name + ".";
    }

    let etherscanTxUrl = "https://" + etherscanNetwork + "etherscan.io/tx/";
    if (network?.chainId === 100) {
      etherscanTxUrl = "https://blockscout.com/poa/xdai/tx/";
    }

    try {
      let result;
      if (tx instanceof Promise) {
        if (DEBUG) console.log("AWAITING TX", tx);
        result = await tx;
      } else {
        if (!tx.gasPrice) {
          tx.gasPrice = gasPrice || ethers.utils.parseUnits("4.1", "gwei");
        }
        if (!tx.gasLimit) {
          tx.gasLimit = ethers.utils.hexlify(120000);
        }
        if (DEBUG) console.log("RUNNING TX", tx);
        result = await signer?.sendTransaction(tx);
      }
      if (DEBUG) console.log("RESULT:", result);
      // console.log("Notify", notify);

      if (callback) {
        callbacks[result.hash] = callback;
      }

      // if it is a valid Notify.js network, use that, if not, just send a default notification
      if (notify && network && [1, 3, 4, 5, 42, 100].indexOf(network.chainId) >= 0) {
        const { emitter } = notify.hash(result.hash);
        emitter.on("all", transaction => {
          return {
            onclick: () => window.open((etherscan || etherscanTxUrl) + transaction.hash),
          };
        });
      } else {
        notification.info({
          message: "Local Transaction Sent",
          description: result.hash,
          placement: "bottomRight",
        });
        // on most networks BlockNative will update a transaction handler,
        // but locally we will set an interval to listen...
        if (callback) {
          const txResult = await tx;
          const listeningInterval = setInterval(async () => {
            console.log("CHECK IN ON THE TX", txResult, provider);
            const currentTransactionReceipt = await provider?.getTransactionReceipt(txResult.hash);
            if (currentTransactionReceipt && currentTransactionReceipt.confirmations) {
              callback({ ...txResult, ...currentTransactionReceipt });
              clearInterval(listeningInterval);
            }
          }, 500);
        }
      }

      if (typeof result.wait === "function") {
        await result.wait();
      }

      return result;
    } catch (e: any) {
      if (DEBUG) console.log(e);
      // Accounts for Metamask and default signer on all networks
      let message =
        e.data && e.data.message
          ? e.data.message
          : e.error && JSON.parse(JSON.stringify(e.error)).body
          ? JSON.parse(JSON.parse(JSON.stringify(e.error)).body).error.message
          : e.data
          ? e.data
          : JSON.stringify(e);
      if (!e.error && e.message) {
        message = e.message;
      }

      console.log("Attempt to clean up:", message);
      try {
        let obj = JSON.parse(message);
        if (obj && obj.body) {
          let errorObj = JSON.parse(obj.body);
          if (errorObj && errorObj.error && errorObj.error.message) {
            message = errorObj.error.message;
          }
        }
      } catch (e) {
        //ignore
      }

      notification.error({
        message: "Transaction Error",
        description: message,
      });
      if (callback && typeof callback === "function") {
        callback(e);
      }
    }
  };
};

export default Transactor;

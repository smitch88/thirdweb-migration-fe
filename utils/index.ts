import { sendTransaction, waitForTransaction } from "@wagmi/core";
import { goerli, sepolia, polygonMumbai, mainnet, polygon, optimism } from "wagmi/chains";
import { toast } from "react-toastify";
import { parseEther } from "viem";

export const getSampleUri = (tokenUri) => {
  const parts = tokenUri?.split("/");
  parts?.pop();
  return `${parts?.join("/")}/`;
};

export const getExplorerUrl = ({ address, chainId }) => {
  switch (chainId) {
    case goerli.id:
      return `https://goerli.etherscan.io/address/${address}`;
    case sepolia.id:
      return `https://sepolia.etherscan.io/address/${address}`;
    case polygonMumbai.id:
      return `https://mumbai.polygonscan.com/address/${address}`;
    case polygon.id:
      return `https://polygonscan.com/address/${address}`;
    case optimism.id:
      return `https://optimistic.etherscan.io/address/${address}`;
    default:
      return `https://etherscan.io/address/${address}`;
  }
};

export const donationAddress = "0xc03D1E2D94dc8fBCD7b015FD8bA1267245cFf2af";

export const appName = "Turdweb Migration";

export const projectId = "40cefd327f5c36db9eef8e0447632d98";

export const donate = async () => {
  try {
    let toastId = toast(
      "Check wallet for transaction...",
      {
        autoClose: false,
      }
    );

    const { hash } = await sendTransaction({
      to: donationAddress,
      value: parseEther("0.01"),
    });

    toast.update(toastId, {
      type: toast.TYPE.INFO,
      render: `Processing tx...${hash?.slice(0, 6)}`,
      autoClose: false,
    });

    await waitForTransaction({
      hash,
    });

    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      render: `Sent donation! Thank you kind ser.`,
      autoClose: 5000,
    });
  } catch (e) {
    console.log(e);
  }
}
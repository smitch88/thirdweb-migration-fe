export const getSampleUri = (tokenUri) => {
  const parts = tokenUri?.split("/");
  parts?.pop();
  return `${parts?.join("/")}/`;
};

export const getExplorerUrl = ({ address, chainId }) => {
  switch (chainId) {
    case polygon.id:
      return `https://polygonscan.com/address/${address}`;
    case optimism.id:
      return `https://optimistic.etherscan.io/address/${address}`;
    case goerli.id:
      return `https://goerli.etherscan.io/address/${address}`;
    default:
      return `https://etherscan.io/address/${address}`;
  }
};

export const donationAddress = "0xc03D1E2D94dc8fBCD7b015FD8bA1267245cFf2af";

export const appName = "Turdweb Migration";

export const projectId = "40cefd327f5c36db9eef8e0447632d98";

import { goerli, sepolia, polygonMumbai, mainnet, polygon, optimism } from "wagmi/chains";

const migrated721ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "ETHER_NO_BALANCE", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "ETHER_TRANSFER_FAIL",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "IERC173_NOT_OWNER",
    type: "error",
  },
  { inputs: [], name: "IERC2981_INVALID_ROYALTIES", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "IERC721Enumerable_INDEX_OUT_OF_BOUNDS",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "IERC721Enumerable_OWNER_INDEX_OUT_OF_BOUNDS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "IERC721_CALLER_NOT_APPROVED",
    type: "error",
  },
  { inputs: [], name: "IERC721_INVALID_APPROVAL", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "IERC721_INVALID_RECEIVER",
    type: "error",
  },
  { inputs: [], name: "IERC721_INVALID_TOKEN_OWNER", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "IERC721_NONEXISTANT_TOKEN",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "ROYALTY_BASE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to_", type: "address" },
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenOwner_", type: "address" },
    ],
    name: "balanceOf",
    outputs: [
      { internalType: "uint256", name: "ownerBalance", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "getApproved",
    outputs: [
      { internalType: "address", name: "approved", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "fromTokenId_", type: "uint256" },
      { internalType: "uint256", name: "toTokenId_", type: "uint256" },
    ],
    name: "indexTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "admin_", type: "address" },
      { internalType: "address", name: "asset_", type: "address" },
      {
        internalType: "address",
        name: "royaltyRecipient_",
        type: "address",
      },
      { internalType: "uint96", name: "royaltyRate_", type: "uint96" },
      { internalType: "uint256", name: "supply_", type: "uint256" },
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
      { internalType: "string", name: "baseUri_", type: "string" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenOwner_", type: "address" },
      { internalType: "address", name: "operator_", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "isApproved", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      { internalType: "string", name: "tokenName", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      { internalType: "address", name: "contractOwner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "ownerOf",
    outputs: [
      { internalType: "address", name: "tokenOwner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
      { internalType: "uint256", name: "salePrice_", type: "uint256" },
    ],
    name: "royaltyInfo",
    outputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "royaltyAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from_", type: "address" },
      { internalType: "address", name: "to_", type: "address" },
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from_", type: "address" },
      { internalType: "address", name: "to_", type: "address" },
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
      { internalType: "bytes", name: "data_", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator_", type: "address" },
      { internalType: "bool", name: "approved_", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "newBaseUri_", type: "string" },
    ],
    name: "setBaseUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRoyaltyRecipient_",
        type: "address",
      },
      { internalType: "uint96", name: "newRoyaltyRate_", type: "uint96" },
    ],
    name: "setRoyaltyInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes4", name: "interfaceId_", type: "bytes4" },
    ],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      { internalType: "string", name: "tokenSymbol", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index_", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenOwner_", type: "address" },
      { internalType: "uint256", name: "index_", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "uri", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "supply", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from_", type: "address" },
      { internalType: "address", name: "to_", type: "address" },
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newOwner_", type: "address" },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "underlyingAsset",
    outputs: [
      { internalType: "contract IERC721", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
]

const migrated721factoryABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "implementationContract_",
        type: "address",
      },
      { internalType: "address", name: "admin_", type: "address" },
      { internalType: "address", name: "asset_", type: "address" },
      {
        internalType: "address",
        name: "royaltyRecipient_",
        type: "address",
      },
      { internalType: "uint96", name: "royaltyRate_", type: "uint96" },
      { internalType: "uint256", name: "supply_", type: "uint256" },
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
      { internalType: "string", name: "baseUri_", type: "string" },
    ],
    name: "deployClone",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "proxies",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
]

export const migrated721Contract = {
  [goerli.id]: {
    address: "0xF1736E762F7f58D518693E1CdE5111Bbf626dDb3",
    abi: migrated721ABI,
  },
  [polygonMumbai.id]: {
    address: "0xF1736E762F7f58D518693E1CdE5111Bbf626dDb3",
    abi: migrated721ABI,
  },
  [sepolia.id]: {
    address: "0xe14d9dd98d191240baDbE550Aee1BEd716ca9688",
    abi: migrated721ABI,
  },
  [mainnet.id]: {
    address: "0xF1736E762F7f58D518693E1CdE5111Bbf626dDb3",
    abi: migrated721ABI,
  },
  [polygon.id]: {
    address: "0xF1736E762F7f58D518693E1CdE5111Bbf626dDb3",
    abi: migrated721ABI,
  },
  [optimism.id]: {
    address: "0xF1736E762F7f58D518693E1CdE5111Bbf626dDb3",
    abi: migrated721ABI,
  },
};

export const migrated721factoryContract = {
  [goerli.id]: {
    address: "0xC535B94088df301288747d630AF8a346D2f5390D",
    abi: migrated721factoryABI,
  },
  [polygonMumbai.id]: {
    address: "0xC535B94088df301288747d630AF8a346D2f5390D",
    abi: migrated721factoryABI,
  },
  [sepolia.id]: {
    address: "0xfB30B0df95E6A02944Ba29172099180D25282614",
    abi: migrated721factoryABI,
  },
  [mainnet.id]: {
    address: "0xC535B94088df301288747d630AF8a346D2f5390D",
    abi: migrated721factoryABI,
  },
  [polygon.id]: {
    address: "0xC535B94088df301288747d630AF8a346D2f5390D",
    abi: migrated721factoryABI,
  },
  [optimism.id]: {
    address: "0xC535B94088df301288747d630AF8a346D2f5390D",
    abi: migrated721factoryABI,
  },
};

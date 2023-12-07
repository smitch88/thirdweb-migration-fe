import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import React, { useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import styles from "../styles/Home.module.css";
import { goerli, mainnet } from "wagmi/chains";
import {
  erc721ABI,
  useAccount,
  useChainId,
  useContractRead,
  useContractReads,
} from "wagmi";

const baseContract = {
  [goerli.id]: {
    address: "0xDC2998c2F22f4f584945EF27107a6c56FfeF1DC5",
    abi: [
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
    ],
  },
  [mainnet.id]: {
    address: "",
    abi: [],
  },
};

const factoryContract = {
  [goerli.id]: {
    address: "0x36d27fD66160395E52F579F60252bd108f4B8546",
    abi: [
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
    ],
  },
  [mainnet.id]: {
    address: "",
    abi: [],
  },
};

/*
 address implementationContract_,
    address admin_,
    address asset_,
    address royaltyRecipient_,
    uint96 royaltyRate_,
    uint256 supply_,
    string memory name_,
    string memory symbol_,
    string memory baseUri_
 */

const InputField = ({ field, form, label, ...props }) => {
  return (
    <div className="flex flex-row w-full">
      <label htmlFor={field.name} className="flex flex-col w-full">
        <span>{label}</span>
        <input
          {...field}
          {...props}
          className={clsx(
            "flex flex-row w-full px-4 py-2 border border-[2px] border-black",
            {
              "opacity-50 cursor-default": props.readOnly,
            }
          )}
        />
      </label>
    </div>
  );
};

const Home: NextPage = () => {
  const [implementationContract, setImplementationContract] = useState(null);
  const { chainId } = useChainId();
  const { address } = useAccount();
  const onChangeImplContract = (e) => {
    const value = e.target.value;
    setImplementationContract(value);
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: implementationContract,
        abi: erc721ABI,
        functionName: "name",
      },
      {
        address: implementationContract,
        abi: erc721ABI,
        functionName: "symbol",
      },
      {
        address: implementationContract,
        abi: erc721ABI,
        functionName: "totalSupply",
      },
      {
        address: implementationContract,
        abi: erc721ABI,
        functionName: "tokenURI",
        args: [1],
      },
    ],
  });

  console.log({
    data,
  });

  const [name, symbol, totalSupply, baseURI] = data || [];

  return (
    <div className={styles.container}>
      <Head>
        <title>Thirdweb Migration</title>
        <meta content="Thirdweb Contract Migration" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <div className="flex flex-col my-4 w-full max-w-2xl mx-auto">
          <h2 className="font-bold mb-1">Old Contract Address</h2>
          <input
            className="flex flex-row w-full px-4 py-2 border border-[2px]"
            value={implementationContract}
            onChange={onChangeImplContract}
          />
        </div>
        <div className="flex flex-col w-full max-w-2xl mx-auto">
          {implementationContract ? (
            <Formik
              initialValues={{
                implementationContract: baseContract?.[chainId]?.address,
                admin: address,
                asset: implementationContract,
                royaltyRecipient: address,
                royaltyRate: 5, // 5%
                supply: Number(totalSupply?.result),
                name: name?.result,
                symbol: symbol?.result,
                baseUri: baseURI?.result,
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
              enableReinitialize
            >
              {(props: FormikProps<any>) => (
                <Form className="flex flex-col gap-2 w-full">
                  <h3 className="font-bold mb-1">Found Contract</h3>
                  <p>The read-only fields found below will be migrated</p>
                  <Field
                    name="asset"
                    placeholder="Asset"
                    component={InputField}
                    readOnly
                  />
                  <Field
                    name="supply"
                    label="Total Supply"
                    component={InputField}
                    readOnly
                  />
                  <Field
                    name="name"
                    label="Name"
                    component={InputField}
                    readOnly
                  />
                  <Field
                    name="symbol"
                    label="Symbol"
                    component={InputField}
                    readOnly
                  />
                  <Field
                    name="baseUri"
                    label="Base URI"
                    component={InputField}
                    readOnly
                  />

                  <h3 className="font-bold mt-4 mb-1">Contract Details</h3>
                  <p>
                    Set up the admin and royalty configuration for the new
                    migrated contract.
                  </p>

                  <Field
                    name="admin"
                    placeholder="Enter admin address"
                    label="Admin address"
                    component={InputField}
                  />
                  <Field
                    name="royaltyRecipient"
                    placeholder="Enter royalty address"
                    label="Royalty address"
                    component={InputField}
                  />
                  <Field
                    name="royaltyRate"
                    placeholder="Enter royalty %"
                    label="Royalty %"
                    component={InputField}
                  />

                  <button
                    className="border border-[2px] border-black px-4 py-2 bg-black text-white mt-4"
                    type="submit"
                  >
                    Migrate
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <p>Please enter a contract address to migrate!</p>
          )}
        </div>
      </main>

      <footer className={clsx(styles.footer, "flex-col")}>
        <a
          href="https://www.gaslite.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made with ❤️ by your frens at gaslite.gg
        </a>
        <span>© Pop Punk LLC. All rights reserved</span>
      </footer>
    </div>
  );
};

export default Home;

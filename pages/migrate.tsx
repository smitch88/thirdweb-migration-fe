// Styles
import styles from "../styles/Migrate.module.css";

// External
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { goerli, sepolia, polygonMumbai, mainnet, polygon, optimism } from "wagmi/chains";
import { erc721ABI, useAccount, useNetwork, useContractReads } from "wagmi";
import { prepareWriteContract, sendTransaction, waitForTransaction, writeContract } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";
import { parseEther } from "viem";
import "react-toastify/dist/ReactToastify.css";

// Internal
import { migrated721Contract, migrated721factoryContract } from "../lib/contracts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InputField } from "../components/InputField";
import { getSampleUri, getExploreUrl, donationAddress } from "../utils";

const Migrate: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [implementationContract, setImplementationContract] = useState(null);
  const [createdContract, setCreatedContract] = useState(null);
  const { chain } = useNetwork();
  const { address } = useAccount();

  const onChangeImplContract = (e) => {
    const value = e.target.value;
    setImplementationContract(value);
    setCreatedContract(null);
  };

  const { data, isLoading } = useContractReads({
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

  const [name, symbol, totalSupply, tokenUri] = data || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col w-full justify-center font-primary pb-20">
      <Head>
        <title>Thirdweb Migration</title>
        <meta content="Thirdweb Contract Migration" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />
      <main className="flex flex-col w-full p-6 items-center">
        <h2 className="text-4xl font-bold text-left underline my-4">
          What is this?
        </h2>
        <p className="max-w-2xl font-light">
          This migration tool will help you migrate your vulnerable Thirdweb NFT contract without
          the exhorbitant fees incurred by the Thirdweb migration tool.
          It can only be used with a fully minted collection as it does not contain a mint function.
        </p>
        {address ? (
          <>
            <div className="flex flex-col w-full max-w-2xl mx-auto mt-8 mb-4">
              <div className="flex flex-col gap-1">
                <strong className="text-2xl font-bold">{`Let's get started`}</strong>
                <ol className="list-decimal pl-4">
                  <li>
                    Start by locking your old contract with{" "}
                    <a
                      href="https://mitigate.thirdweb.com/"
                      className="underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Thirdweb mitigation tool
                    </a>
                    .
                  </li>
                  <li>
                    Deploy the following contract with the address of your old
                    contract as parameter.
                  </li>
                  <li>
                    <button
                      className="underline"
                      onClick={async () => {
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
                      }}
                    >
                      Donation (optional)
                    </button>
                  </li>
                  <li>
                    Please note that the turdweb contract can not be minted and
                    is intended for minted out collections, please contact me so
                    we can work a custom solution for you if your collection
                    does not match this criteria.
                  </li>
                </ol>
                <a
                  className="w-[58px] underline my-2 text-center"
                  href="https://github.com/lambdalf-dev/thirdweb-migrator"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
              <hr className="my-4" />
              <h2 className="font-bold mb-1">Old Contract Address</h2>
              <input
                className="flex flex-row w-full px-4 py-2 border border-[2px]"
                value={implementationContract}
                onChange={onChangeImplContract}
              />
            </div>
            <div className="flex flex-col w-full max-w-2xl mx-auto">
              {createdContract && (
                <div className="flex flex-col bg-[#91cf7b]/30 p-6 rounded-md gap-2 mt-4">
                  <h2 className="text-4xl font-bold">Success!</h2>
                  <p>
                    You migrated your old contract to a new address shown below.
                  </p>
                  <a
                    className="underline"
                    href={getExplorerUrl({
                      address: createdContract,
                      chainId: chain?.id,
                    })}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    New address: {createdContract}
                  </a>
                  <p>
                    {`Don't`} forget to navigate to the contract and propagate
                    token indexing with one or more calls to{" "}
                    <strong>indexTokens()</strong> for the new collection to
                    appear on marketplaces.
                  </p>
                </div>
              )}
              {isLoading && <span>Loading...</span>}
              {implementationContract ? (
                <Formik
                  initialValues={{
                    implementationContract: migrated721Contract?.[chain?.id]?.address,
                    admin: address,
                    asset: implementationContract,
                    royaltyRecipient: address,
                    royaltyRate: 5, // 5%
                    supply: Number(totalSupply?.result),
                    name: name?.result,
                    symbol: symbol?.result,
                    baseUri: "",
                  }}
                  validateOnMount={true}
                  validate={(values) => {
                    const errors = {};

                    if (!values?.name) {
                      errors.name = "Name is required";
                    }

                    if (!values?.admin) {
                      errors.admin = "Admin is required";
                    }

                    if (!values?.asset) {
                      errors.asset = "Base asset is required";
                    }

                    if (!values?.symbol) {
                      errors.symbol = "Symbol is required";
                    }

                    if (!values?.baseUri) {
                      errors.baseUri = "Base URI is required";
                    }

                    if (!values?.royaltyRecipient) {
                      errors.royaltyRecipient = "Royalty Recipient is required";
                    }

                    return errors;
                  }}
                  onSubmit={async (values, actions) => {
                    let toastId;

                    try {
                      toastId = toast("Check wallet for transaction...", {
                        autoClose: false,
                      });

                      const { request } = await prepareWriteContract({
                        ...migrated721factoryContract?.[chain?.id],
                        functionName: "deployClone",
                        enabled: name && symbol,
                        args: [
                          values?.implementationContract,
                          values?.admin,
                          values?.asset,
                          values?.royaltyRecipient,
                          (values?.royaltyRate || 0) * 100,
                          values?.supply,
                          values?.name,
                          values?.symbol,
                          values?.baseUri,
                        ],
                      });

                      const { hash } = await writeContract(request);

                      toast.update(toastId, {
                        type: toast.TYPE.INFO,
                        render: `Processing tx...${hash?.slice(0, 6)}`,
                        autoClose: false,
                      });

                      const data = await waitForTransaction({
                        hash,
                      });

                      const { logs } = data || {};

                      toast.update(toastId, {
                        type: toast.TYPE.SUCCESS,
                        render: `Successfully migrated contract.`,
                        autoClose: 5000,
                      });

                      actions?.resetForm();

                      setImplementationContract(null);

                      setCreatedContract(logs?.[0]?.address);
                    } catch (e) {
                      if (toastId) {
                        toast.update(toastId, {
                          type: toast.TYPE.ERROR,
                          render: e.message,
                          autoClose: false,
                        });
                      } else {
                        toast.error("Error attempting to migrate contract!");
                      }
                    }
                  }}
                  enableReinitialize
                >
                  {({ isValid, isSubmitting }: FormikProps<any>) => {
                    const sampleUri = getSampleUri(
                      tokenUri?.result || "ipfs://<cid>/"
                    );
                    return (
                      <Form className="flex flex-col gap-2 w-full">
                        <h3 className="font-bold mb-1">Contract Details</h3>
                        <p>
                          The fields are pre-populated with the old contract.
                          Feel free to change as needed
                        </p>
                        <Field
                          name="supply"
                          label="Total Supply"
                          component={InputField}
                          required
                        />
                        <Field
                          name="name"
                          label="Name"
                          component={InputField}
                          required
                        />
                        <Field
                          name="symbol"
                          label="Symbol"
                          component={InputField}
                          required
                        />
                        <Field
                          name="baseUri"
                          label="Base URI"
                          component={InputField}
                          placeholder={`e.g, ${sampleUri}`}
                          required
                        />
                        <span>Found: {sampleUri}</span>
                        <h3 className="font-bold mt-4 mb-1">
                          Security & Royalties
                        </h3>
                        <p>
                          Set up the admin and royalty configuration for the new
                          migrated contract.
                        </p>

                        <Field
                          name="admin"
                          placeholder="Enter admin address"
                          label="Admin address"
                          component={InputField}
                          required
                        />
                        <Field
                          name="royaltyRecipient"
                          placeholder="Enter royalty address"
                          label="Royalty address"
                          component={InputField}
                          required
                        />
                        <Field
                          name="royaltyRate"
                          placeholder="Enter royalty %"
                          label="Royalty %"
                          component={InputField}
                          min={0}
                          max={100}
                          step={0.01}
                          type="number"
                        />
                        <button
                          className={clsx(
                            "border border-[2px] border-black px-4 py-2 bg-black text-white mt-4",
                            {
                              "opacity-50 cursor-not-allowed":
                                !isValid || isSubmitting,
                            }
                          )}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Migrate"}
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
              ) : null}
            </div>
          </>
        ) : (
          <p className="mt-8 font-bold">
            Please <u>connect wallet</u> to begin migration
          </p>
        )}
      </main>

      <Footer />
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Migrate;

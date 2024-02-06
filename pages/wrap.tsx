// Styles
import styles from "../styles/Migrate.module.css";

// External
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { erc721ABI, useAccount, useNetwork, useContractReads } from "wagmi";
import { prepareWriteContract, sendTransaction, waitForTransaction, writeContract } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";
import { parseEther, encodeFunctionData } from "viem";
import "react-toastify/dist/ReactToastify.css";

// Internal
import { wrapped721Contract, factoryContract } from "../lib/contracts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InputField } from "../components/InputField";
import { getSampleUri, getExplorerUrl, donate } from "../utils";

const Wrap: NextPage = () => {
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

  const validateInputs = (values) => {
    const errors = {};

    if (!values?.admin) {
      errors.admin = "Admin is required";
    }

    if (!values?.asset) {
      errors.asset = "Base asset is required";
    }

    if (!values?.baseUri) {
      errors.baseUri = "Base URI is required";
    }

    if (!values?.royaltyRecipient) {
      errors.royaltyRecipient = "Royalty Recipient is required";
    }

    return errors;
  };

  const submitDeployment = async (values, actions) => {
    let toastId;

    try {
      toastId = toast("Check wallet for transaction...", {
        autoClose: false,
      });

      const deployData = await encodeFunctionData({
        abi: wrapped721Contract.abi,
        functionName: "initialize",
        args: [
          values?.admin,
          values?.asset,
          values?.royaltyRecipient,
          (values?.royaltyRate || 0) * 100,
          values?.baseUri,
        ]
      });
      const { request } = await prepareWriteContract({
        ...factoryContract,
        functionName: "deployClone",
        // enabled: name && symbol,
        args: [
          values?.implementationContract,
          deployData,
        ]
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
  };

  const { data, isLoading } = useContractReads({
    contracts: [
      {
        address: implementationContract,
        abi: erc721ABI,
        functionName: "tokenURI",
        args: [1],
      },
    ],
  });

  const [tokenUri] = data || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col w-full justify-center font-primary pb-20">
      <Head>
        <title>Shift - Migration</title>
        <meta content="Thirdweb Contract Migration" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />
      <main className="flex flex-col w-full p-6 items-center">
        <h2 className="text-4xl font-bold text-left underline my-4">
          What is this?
        </h2>
        <p className="max-w-2xl font-light">
          This migration tool will help you migrate your collection to a new contract without Open Sea operator filterer.
          It can only be used with a fully minted collection as it does not contain a mint function.
          Note that it requires NFT owners to manually wrap their tokens.
        </p>
        {address ? (
          <>
            <div className="flex flex-col w-full max-w-2xl mx-auto mt-8 mb-4">
              <div className="flex flex-col gap-1">
                <strong className="text-2xl font-bold">{`Let's get started`}</strong>
                <ol className="list-decimal pl-4">
                  <li>
                    Deploy the following contract with the address of your old
                    contract as parameter.
                  </li>
                  <li>
                    <button className="underline" onClick={donate}>
                      Donation (optional)
                    </button>
                  </li>
                  <li>
                    Please note that this contract can not be minted and
                    is intended for minted out collections, please contact me so
                    we can work a custom solution for you if your collection
                    does not match this criteria.
                  </li>
                </ol>
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
                </div>
              )}
              {isLoading && <span>Loading...</span>}
              {implementationContract ? (
                <Formik
                  initialValues={{
                    implementationContract: wrapped721Contract?.[chain?.id]?.address,
                    admin: address,
                    asset: implementationContract,
                    royaltyRecipient: address,
                    royaltyRate: 5, // 5%
                    baseUri: "",
                  }}
                  validateOnMount={true}
                  validate={validateInputs}
                  onSubmit={submitDeployment}
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
                        <p>Base URI</p>
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

                        <p>Admin</p>
                        <Field
                          name="admin"
                          placeholder="Enter admin address"
                          label="Admin address"
                          component={InputField}
                          required
                        />
                        <p>Royalty recipient</p>
                        <Field
                          name="royaltyRecipient"
                          placeholder="Enter royalty address"
                          label="Royalty address"
                          component={InputField}
                          required
                        />
                        <p>Royalty rate</p>
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
                          {isSubmitting ? "Processing..." : "Wrap"}
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

export default Wrap;

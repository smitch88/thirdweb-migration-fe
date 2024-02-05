// External
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

// Internal
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Home: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);

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
          Turdweb is a migration tool created to help you migrate your
          vulnerable Thirdweb NFT contract without the exhorbitant fees incurred
          by the Thirdweb migration tool. It can also be used to migrate any
          ERC721 contract, for example, to remove the Open Sea operator
          filterer.
        </p>
        <a className="btn-card" href="/migrate">Begin migration</a>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

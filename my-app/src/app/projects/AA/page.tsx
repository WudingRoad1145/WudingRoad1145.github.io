"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const images = [
  "/images/porton-wallet-1.jpg",
  "/images/porton-wallet-2.jpg",
  "/images/porton-wallet-3.jpg",
  "/images/porton-wallet-4.jpg",
  "/images/porton-wallet-5.jpg",
];

export default function WalletPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="essay-page">
      <Link href="/projects" className="essay-back">
        Selected work
      </Link>
      {/* Content Grid */}
      <div className="essay-content">
        {/* Title Section */}
        <h1 className="text-6xl mb-8">Account Abstraction Wallet</h1>

        {/* Date and Award Section */}
        <div className="col-span-12 text-left mb-10">
          <p>
            <strong>Date:</strong> October 2022
          </p>
          <p>
            <strong>Award:</strong> Best wallet hack at 2022 Ethereum Devcon in
            Bogotá, Colombia
          </p>
          <p>
            <strong>Team Members:</strong> Nan Jiang, Qitian Hu, Rabib
          </p>
          <p>
            <strong>Try it out:</strong>{" "}
            <Link
              href="https://github.com/nanjiangwill/porton-wallet/tree/ux"
              className="underline text-black hover:text-gray-700"
              target="_blank"
            >
              GitHub Repository
            </Link>
          </p>
        </div>

        {/* Intro Section */}
        <p className="col-span-12 text-lg text-left mb-10">
          An Account Abstraction-based wallet that allows you to sign signatures
          with Touch ID, pay gas fees with ERC20 tokens, and have gasless
          interaction with dApps!
        </p>

        {/* Image Slider */}
        <div className="col-span-12 flex flex-col items-center mb-10">
          <div className="relative w-full h-96">
            <Image
              src={images[currentImage]}
              alt={`Project Image ${currentImage + 1}`}
              fill
              sizes="(max-width: 700px) 88vw, 1000px"
              style={{ objectFit: "contain" }}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 border border-black rounded hover:bg-gray-200"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 border border-black rounded hover:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>

        {/* Project Description */}
        <h2 className="col-span-12 text-4xl font-bold text-left mb-6">
          Project Description
        </h2>
        <ul className="col-span-12 list-disc list-inside text-lg space-y-4 text-left mb-10">
          <li>
            <strong>
              Use your computer/mobile phone as a hardware wallet:
            </strong>{" "}
            Porton Wallet lets you use the ultra-secure hardware enclave in your
            iPhone/MacBook to store private keys Use Touch ID or Face ID to sign
            transactions Your private key never leaves the secure enclave,
            ensuring security equivalent to or better than traditional hardware
            wallets without sacrificing usability
          </li>
          <li>
            <strong>Gas subsidy mechanism:</strong> Leveraging the paymaster
            module in EIP-4337, Porton Wallet allows project teams to subsidize
            gas fees for users This feature makes interactions easier and lowers
            barriers for new users, especially in GameFi and NFT applications
          </li>
          <li>
            <strong>Signature-less transactions:</strong> Implemented a session
            key mechanism that allows users to interact with contracts without
            repeatedly signing transactions for a defined period, maintaining
            full decentralization and non-custodianship
          </li>
          <li>
            <strong>Use ERC20 tokens to pay gas fees:</strong> Allows users to
            pay gas fees with any ERC20 token, like USDC or USDT, provided there
            is a sponsoring paymaster module
          </li>
        </ul>

        <div className="col-span-12 flex justify-center mb-10">
          <Image
            src="/images/aa.jpg"
            alt="Technical Overview"
            width={800}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        {/* Technical Specifications */}
        <h2 className="col-span-12 text-4xl font-bold text-left mb-6">
          Technical Specifications
        </h2>
        <ul className="col-span-12 list-disc list-inside text-lg space-y-4 text-left">
          <li>
            <strong>EntryPoint Smart Contract:</strong> Uses public
            infrastructure defined by EIP-4337
          </li>
          <li>
            <strong>Wallet Smart Contract:</strong> Supports device-native
            hardware enclaves using WebAuthN and includes session key logic for
            signature-less transactions
          </li>
          <li>
            <strong>Paymaster Smart Contract:</strong> Implements logic for
            partial/full gas subsidies and flexible incentivization structures
          </li>
          <li>
            <strong>Bundler/Private Relayer:</strong> Custom private relayer to
            bypass current public bundler faults
          </li>
          <li>
            <strong>Frontend:</strong> A 5-page website to demonstrate the
            wallet’s functionality
          </li>
        </ul>
      </div>
    </main>
  );
}

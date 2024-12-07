import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start px-24 py-16">
      {/* Navigation Bar */}
      <nav className="fixed top-8 right-8 flex gap-6">
        <Link href="/" className="text-black hover:underline uppercase">
          About
        </Link>
        <Link href="/projects" className="text-black hover:underline uppercase">
          Projects
        </Link>
        <Link href="/adventures" className="text-black hover:underline uppercase">
          Adventures
        </Link>
        <Link href="/humans" className="text-black hover:underline uppercase">
          Humans
        </Link>
      </nav>

      {/* Content Grid */}
      <div className="max-w-6xl w-full grid grid-cols-12 gap-10 rtl mt-16">
        {/* Title Section */}
        <h1 className="col-span-12 text-4xl font-bold text-left mb-6">
          HiPo - Hidden Polarization Detector
        </h1>

        {/* Date and GitHub Link */}
        <div className="col-span-12 text-left mb-10">
          <p>
            <strong>Date:</strong> November 2024
          </p>
          <p>
            <strong>Try Here:</strong>{" "}
            <Link
              href="https://github.com/your-username/hipo-extension"
              className="underline text-black hover:text-gray-700"
              target="_blank"
            >
              Git Repo
            </Link>
          </p>
        </div>

        {/* Intro Section */}
        <p className="col-span-12 text-lg text-left mb-10">
          HiPo is a Chrome extension designed to help users identify hidden biases
          and polarized viewpoints in online content. By offering quick, actionable
          insights, it empowers users to navigate the overwhelming sea of
          information with clarity and fairness.
        </p>

        {/* Graphics Section */}
        <div className="col-span-6 flex justify-end">
          <Image
            src="/images/hipo-logo.jpg" // Replace with actual path
            alt="HiPo Logo"
            width={300}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-6">
          <Image
            src="/images/hipo-figma.jpg" // Replace with actual path
            alt="HiPo Design System"
            width={400}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Design Thinking Section */}
        <div className="col-span-12 mt-16">
          <h2 className="text-4xl font-bold text-left mb-6">Key Design Principles</h2>
          <ul className="list-disc list-inside text-lg space-y-6 text-left">
            <li>
              <strong>Lightweight, Everyday Accessibility:</strong> Choosing a Chrome
              extension allows HiPo to seamlessly integrate into users' daily browsing.
              Its lightweight design ensures it works silently and effectively to help
              users discern polarization in their daily digests without any additional
              friction.
            </li>
            <li>
              <strong>Promoting Civil Conversations:</strong> Beyond highlighting biases
              in user readings, HiPo fosters civil conversations by offering a section
              of opposing viewpoints and related articles. With easy one-click links,
              users can discover alternative perspectives and fill in the "gaps in
              understanding," reducing the barriers to meaningful dialogue.
            </li>
            <li>
              <strong>Minimizing Built-In Model Bias:</strong> The slider feature enables
              users to provide their own perception of polarization levels. This feedback
              helps reduce reliance on the prebuilt model's biases. Over time, with
              sufficient data collection, HiPo can fine-tune its algorithms to better
              capture the nuances of user perspectives.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

export default function MultiPage() {
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
        Get It Cooperating: Enhancing Generative Agent Cooperation
        with Commitment Devices
        </h1>

        {/* Time and Collaborator Section */}
        <div className="col-span-12 text-left mb-10">
          <p>
            <strong>Time:</strong> 2023
          </p>
          <p>
            <strong>Publication</strong> 2024 ICML Agentic Markets Workshop
          </p>
          <p>
            <strong>Collaborators:</strong> Xinyuan Sun, Qitian Hu, Nan Jiang
          </p>
          <p>
            <strong>Sponsor:</strong> Flashbots
          </p>
          <p>
            <strong>Paper:</strong>{" "}
            <Link
              href="https://openreview.net/pdf/36430ccfabce0520a279f42165b931577f2d1c67.pdf"
              className="underline text-black hover:text-gray-700"
              target="_blank"
            >
              View Paper
            </Link>
          </p>
        </div>

        {/* Summary Section */}
        <h2 className="col-span-12 text-4xl font-bold text-left mb-6">
          Summary
        </h2>
        <p className="col-span-12 text-lg text-left mb-10">
          Large Language Model (LLM)-based agents have demonstrated potential in
          various applications, effectively serving as proxies for human
          interaction in numerous tasks. Previously, the exploration of agent
          cooperation has been primarily confined to Multi-agent Reinforcement
          Learning (MARL), where commitment devices (CDs) have significantly
          improved collaborative efforts.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          This paper examines the effectiveness of CDs in fostering cooperative
          behavior among LLM agents within game-theoretic contexts. We
          investigate the ability of LLM agents to utilize CDs to achieve
          socially optimal outcomes while balancing their individual interests.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          Our experimental range includes various game structures, such as the
          classic Prisoner’s Dilemma, Public Goods games, and the more complex
          dynamic Harvest game. We introduce a framework for agents to use CDs
          in these games to achieve higher socially optimal outcomes.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          Our preliminary experiments show that in simpler game scenarios,
          agents successfully use CDs to reach socially optimal outcomes (the
          new Nash Equilibrium of the game with CDs). In more complex dynamic
          games, however, agents exhibit limitations in strategically applying
          CDs, resulting in more nuanced performance improvements. These
          findings suggest that while commitment devices can enhance cooperation
          among generative agents, further work in fundamental model-level
          improvement is necessary for optimal results in complex, realistic
          game scenarios.
        </p>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";

export default function WiserPage() {
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
          Wiser
        </h1>

        {/* Date */}
        <div className="col-span-12 text-left mb-10">
          <p>
            <strong>Date:</strong> Summer 2022
          </p>
        </div>

        {/* Intro Section */}
        <p className="col-span-12 text-lg text-left mb-10">
          At 19, I spent two months in Muhuru Bay, Kenya, promoting STEM
          education at an all-girls high school. These girls were the most
          hardworking people I’d ever met, waking up at 4 a.m. and studying
          until 10 p.m., dreaming of a college education that could change their
          lives.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          But as I got to know the community, disillusionment set in. Kenya’s
          job market is disconnected from its education system, leaving even the
          brightest graduates jobless. Many girls, despite their dedication, end
          up trapped in poverty, marrying older men in exchange for livestock. I
          felt hopeless, questioning the value of my work. After the program
          ended, I boarded a random bus to Tanzania, feeling my presence had
          been futile.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          On the bus, a local man who had worked for Chinese employers
          approached me, curious about why a young Chinese girl was there. I
          shared my frustration, and after a long silence, he invited me to
          lunch. Over black beans and chapati, he told me about a “mzungu” lady
          who visited his school when he was 13. He only remembered her saying,
          “Think outside of the box.” That simple phrase guided his life, leading
          him to Nairobi and a successful career.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          “I don’t even remember her name nor her look. But I pray for her every
          night. I thank her every night.”
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          That conversation struck me deeply—for so long, I had been seeking
          visible “impacts” to satisfy my own sense of heroism, but in reality,
          the seeds of change had already been quietly planted.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          I am infinitely grateful for this journey of feeling miserable,
          helpless, and small. Nevertheless, I believe only through suffering and
          hardship, we truly see, learn, and understand. I am the one who is
          truly educated by this experience by facing the brutal real world. But
          pushing through the darkness, I stand in soberness, knowing how much is
          yet to be done. It is this humbling journey that set me up on a path
          that sees bigger.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          Hey, just keep doing the right things.
        </p>
        <p className="col-span-12 text-lg text-left mb-10">
          I am constantly working on viable ways to do more, please contact me
          if you would like to be part of the effort!
        </p>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

const HumansPage = () => {
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
        <h1 className="col-span-12 text-4xl font-bold text-left mb-8">
          Humans
        </h1>

        {/* Gratitude Section */}
        <div className="col-span-12 text-lg space-y-6 text-left">
          <p>
            I am more than grateful to folks who I’ve felt love from—some I know
            their names, some I don’t 💙
          </p>
          <p>THANK YOU for making me a better human.</p>
          <p>
            Those who felt comfortable being publicly associated with me 😏 are
            here:
          </p>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Robin and Shally Yan:</strong> Thanks, mum and dad, for
              making me a human to begin with and thank you for making me
              unapologetically myself.
            </li>
            <li>Lin Zhao</li>
            <li>Patrick Merrigan</li>
            <li>Victoria Zhang</li>
            <li>ShaoBo Zhang</li>
            <li>Nan Jiang</li>
            <li>Qitian Hu</li>
            <li>Sandy Wang</li>
            <li>Jerry Jiang</li>
            <li>Angie Xie</li>
            <li>Henri Matisse</li>
            <li>Steve Jobs</li>
            <li>Jared Maccain</li>
            <li>Ming Yao...</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HumansPage;

import React from 'react';
import Link from 'next/link';

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
        <h1 className="col-span-12 text-6xl text-left mb-8">
        miscellaneous 无用之用
        </h1>
      {/* Project content */}
      <div className="col-span-12 text-left mb-10">
        <p>
          <Link href="/Feng_Yan_Portfolio.pdf" target="_blank" className="text-black hover:underline">
            Arts Portfolio
          </Link>
        </p>
        <p>Gap Semester</p>
        <p>Still life</p>
        <p>Shanghai Artistic Book</p>
      </div>
    </div>
    </div>
  );
}

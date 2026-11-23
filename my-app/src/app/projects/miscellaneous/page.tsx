import React from "react";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <main className="essay-page">
      <Link href="/projects" className="essay-back">
        Selected work
      </Link>
      {/* Content Grid */}
      <div className="essay-content">
        {/* Title Section */}
        <h1 className="col-span-12 text-6xl text-left mb-8">
          miscellaneous 无用之用
        </h1>
        {/* Project content */}
        <div className="col-span-12 text-left mb-10">
          <p>
            <Link
              href="/Feng_Yan_Portfolio.pdf"
              target="_blank"
              className="text-black hover:underline"
            >
              Arts Portfolio
            </Link>
          </p>
          <p>Gap Semester</p>
          <p>Still life</p>
          <p>Shanghai Artistic Book</p>
        </div>
      </div>
    </main>
  );
}

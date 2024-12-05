import React from 'react';
import Link from 'next/link';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <div>
        <h1 className="text-5xl font-bold mb-8">Projects</h1>
        <ul className="list-disc ml-8 space-y-4">
          <li><Link href="/projects/project1" className="text-black hover:underline">rabbit r1</Link></li>
          <li><Link href="/projects/project2" className="text-black hover:underline">because it is there - a personal story</Link></li>
          <li><Link href="/projects/project3" className="text-black hover:underline">multi-agent collaboration research</Link></li>
          <li><Link href="/projects/project4" className="text-black hover:underline">account abstraction wallets</Link></li>
          <li><Link href="/projects/project5" className="text-black hover:underline">the Wiser Project - Summer 2021</Link></li>
          <li><Link href="/projects/project6" className="text-black hover:underline">miscellaneous</Link></li>
        </ul>
      </div>

      <footer className="text-black">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default ProjectsPage;

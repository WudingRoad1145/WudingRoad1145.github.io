import React from 'react';
import Link from 'next/link';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
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
      
      <div>
        <h1 className="text-5xl font-bold mb-8">Projects</h1>
        <ul className="list-disc ml-8 space-y-4">
          <li><Link href="/projects/hipo" className="text-black hover:underline">HiPo</Link></li>
          <li><Link href="https://rabbit.tech/" className="text-black hover:underline">rabbit r1</Link></li>
          <li><Link href="/projects/because-it-is-there" className="text-black hover:underline">because it is there - a personal story</Link></li>
          <li><Link href="/projects/multi-agent" className="text-black hover:underline">multi-agent collaboration research</Link></li>
          <li><Link href="/projects/aa" className="text-black hover:underline">account abstraction wallets</Link></li>
          <li><Link href="/projects/wiser" className="text-black hover:underline">the Wiser Project - Summer 2021</Link></li>
          <li><Link href="/projects/big-woman" className="text-black hover:underline">Big Woman</Link></li>
          <li><Link href="/projects/miscellaneous" className="text-black hover:underline">miscellaneous</Link></li>
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

// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <main className="flex justify-center items-center h-[80vh]">
        <h1 className="text-7xl font-bold text-black">make better humans</h1>
      </main>

      <footer className="flex justify-around w-full py-4">
        <Link href="/about" className="text-lg text-black hover:underline">
          About Yan
        </Link>
        <Link href="/projects" className="text-lg text-black hover:underline">
          Projects
        </Link>
        <Link href="/adventures" className="text-lg text-black hover:underline">
          Adventures
        </Link>
        <Link href="/contact" className="text-lg text-black hover:underline">
          Contact
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;

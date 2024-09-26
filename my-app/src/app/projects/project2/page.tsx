// src/app/projects/project1/page.tsx
import React from 'react';
import Link from 'next/link';

const Project1 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <div>
        <h1 className="text-5xl font-bold mb-8">because it is there - a personal story</h1>
        <p className="text-lg">More to come...</p>
      </div>

      <footer className="text-black">
        <Link href="/projects" className="hover:underline">
          Back to Projects
        </Link>
      </footer>
    </div>
  );
};

export default Project1;

// src/app/projects/project1/page.tsx
import React from 'react';
import Link from 'next/link';

const Project1 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <div>
        <h1 className="text-5xl font-bold mb-8">miscellaneous</h1>
        <p className="text-lg">body building, photography, arts, and more</p>
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

import React from 'react';
import Link from 'next/link';

export default function ProjectPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-6xl mb-8">HiPo - a chrome plugin to reveal hidden polarization</h1>
      {/* Project content */}
      <Link href="/" className="text-xl underline">Back home</Link>
    </div>
  );
}

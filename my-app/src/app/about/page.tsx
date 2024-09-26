// src/app/about/page.tsx
import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <div>
        <h1 className="text-5xl font-bold mb-4">About Yán<span className="text-sm">(last name)</span> Fēng<span className="text-sm">(first name)</span> 颜丰</h1>
        <p className="text-lg">welcome! I appreciate you taking the time to get to know me.</p>
        <p> - </p>
        <p className="text-lg">I'm a builder and I care about building deeply humanizing products that shape us into better humans.</p>
        <p> - </p>
        <p className="text-lg">currently, I am studying computer science at Duke University. </p>
        <p> - </p>
        <p className="text-lg"> previously, I worked as product at rabbit. I also spent a significant amount of time in multi-agent and blockchain research. </p>
    
      </div>
      <footer className="text-black">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default AboutPage;

// src/app/contact/page.tsx
import React from 'react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <div>
        <h1 className="text-5xl font-bold mb-8">Contact</h1>

        <p className="text-lg mb-4">
          Don’t hesitate if you want to talk about fun things, do sports together, or plan an adventure with me!
        </p>
        <p className="text-lg mb-4">
          Just leave me something here: <span className="font-bold">yanffyy at gmail dot com</span>
        </p>
        <p className="text-lg mb-4">
          You can also check out my LinkedIn{' '}
          <a
            href="https://www.linkedin.com/in/feng-yan-a6408018a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            here
          </a>
        </p>
        <p className="text-lg">
          Or catch me in the wild!
        </p>
      </div>

      <footer className="text-black">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default ContactPage;

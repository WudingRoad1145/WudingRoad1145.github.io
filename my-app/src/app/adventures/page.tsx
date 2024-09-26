import React from 'react';
import Link from 'next/link';

const AdventuresPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <div>
        <h1 className="text-5xl font-bold mb-4">Adventures</h1>
        <ul className="list-disc ml-8 space-y-4">
            <li>fortunate enough to have roadtripped to 31/34 provinces in China with my parents</li>
            <li>climbed the ABC treks in Nepal with my parents and survived 7 days without showering</li>
            <li>solo traveled from Nairobi to Moshi, Tanzania through border points in a sketchy van that had no doors</li>
            <li>crossing the Kenya-Tanzania border with my pika buddy to teach elementary school students</li>
            <li>climbed mountain Kilimanjaro with a very dear but at that time random friend</li>
            <li>ran a 5k in under 22 minutes</li>
            <li>finished my first utmb at the Canyons Endurance Runs in the 2023</li>
            <li>fell in a well in Tulum and had army coming to send me to the hospital</li>
            <li>kayaked in Venice and attended the 2021 La Biennale di Venezia</li>
            <li>as an Ethereum Scholar, attended Devcon 6 in Bogotá, Colombia and stayed with an amazing hacker house</li>
            <li>living in a tent in kville instead of my dear dorm room for 5 weeks cuz we bleed blue</li>
            <li>trained muay thai in Phuket and lost a fight, still proud</li>
            <li>meditated 7 days in a buddhist temple</li>
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

export default AdventuresPage;

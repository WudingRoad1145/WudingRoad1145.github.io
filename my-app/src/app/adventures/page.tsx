import Image from "next/image";
export const metadata = { title: "Adventures — Yán Fēng" };
export default function AdventuresPage() {
  return (
    <main className="notebook-page">
      <header className="page-heading">
        <span className="small-label">A life outside the screen</span>
        <h1>
          Go a little
          <br />
          <em>further.</em>
        </h1>
        <p>Some things I’m glad I said yes to.</p>
      </header>
      <figure className="adventure-photo">
        <Image
          src="/images/hiking.jpg"
          alt="At the summit of Mount Kilimanjaro"
          width={1400}
          height={900}
          priority
        />
        <figcaption>Mount Kilimanjaro · one of the yeses</figcaption>
      </figure>
      <ul className="memory-list">
        <li>
          Fortunate enough to have roadtripped to 31/34 provinces in China with
          my parents
        </li>
        <li>
          Climbed the ABC treks in Nepal with my parents and survived 7 days
          without showering
        </li>
        <li>
          Solo traveled from Nairobi to Moshi, Tanzania through border points in
          a sketchy van that had no doors
        </li>
        <li>
          Crossing the Kenya-Tanzania border with my pika buddy to teach
          elementary school students
        </li>
        <li>
          Climbed mountain Kilimanjaro with a very dear but at that time random
          friend
        </li>
        <li>Ran a 5k in under 22 minutes</li>
        <li>
          Finished my first utmb at the Canyons Endurance Runs in the 2023
        </li>
        <li>
          Fell in a well in Tulum and had army coming to send me to the hospital
        </li>
        <li>Kayaked in Venice and attended the 2021 La Biennale di Venezia</li>
        <li>
          As an Ethereum Scholar, attended Devcon 6 in Bogotá, Colombia and
          stayed with an amazing hacker house
        </li>
        <li>
          Living in a tent in kville instead of my dear dorm room for 5 weeks
          cuz we bleed blue
        </li>
        <li>Trained muay thai in Phuket and lost a fight, still proud</li>
        <li>Meditated 7 days in a buddhist temple</li>
        <li>
          Guided my grandma through her first snorkeling experience, where she
          saw the tropical fish in her childhood dreams
        </li>
        <li>Had Yıldırım usta fish wrap four days in a row in Istanbul</li>
      </ul>
    </main>
  );
}

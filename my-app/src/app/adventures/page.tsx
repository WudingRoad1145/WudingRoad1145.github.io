import Image from "next/image";
import MemoryDrawer from "@/components/MemoryDrawer";
import { memories } from "@/data/memories";
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
      <MemoryDrawer />
      <details className="all-memories">
        <summary>Or spread them all out</summary>
        <ul className="memory-list">
          {memories.map((memory) => (
            <li key={memory}>{memory}</li>
          ))}
        </ul>
      </details>
    </main>
  );
}

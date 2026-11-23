import Link from "next/link";
import Image from "next/image";
export default function MountainPage() {
  return (
    <main className="essay-page">
      <Link href="/projects" className="essay-back">
        Personal pursuits
      </Link>
      <div className="essay-content">
        <h1>Because it is there</h1>
        <p className="essay-dek">A personal story from the mountains</p>
        <figure className="essay-hero">
          <Image
            src="/images/hiking.jpg"
            alt="Yan at the Mount Kilimanjaro summit sign"
            width={1400}
            height={900}
            priority
          />
        </figure>
        <blockquote>
          “Why do you want to climb Mount Everest?”
          <br />
          “Because it’s there”<cite>George Herbert Leigh Mallory</cite>
        </blockquote>
        <p>
          This story is still being written In the meantime, a few memories from
          the journey are in my{" "}
          <Link className="text-link" href="/adventures">
            adventure notebook
          </Link>
        </p>
      </div>
    </main>
  );
}

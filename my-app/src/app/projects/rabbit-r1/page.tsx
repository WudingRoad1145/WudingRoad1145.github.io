import Link from "next/link";
import Image from "next/image";
export default function RabbitPage() {
  return (
    <main className="essay-page">
      <Link href="/projects" className="essay-back">
        Selected work
      </Link>
      <div className="essay-content">
        <h1>rabbit r1</h1>
        <p className="essay-dek">A different way to meet a computer.</p>
        <figure className="essay-hero">
          <Image
            src="/images/rabbit.jpg"
            alt="An orange rabbit r1 held in a hand"
            width={1400}
            height={800}
            priority
          />
        </figure>
        <p>
          Leading product development for r1, a first-of-its-kind AI hardware
          device, reimagining human–machine interaction.
        </p>
        <p>
          <a className="text-link" href="https://www.rabbit.tech/">
            Visit rabbit
          </a>
        </p>
      </div>
    </main>
  );
}

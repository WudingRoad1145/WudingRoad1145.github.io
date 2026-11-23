import Image from "next/image";
import Link from "next/link";
import ArtGallery from "./ArtGallery";
import s from "./art.module.css";

export const metadata = {
  title: "无用之用 — Yán Fēng",
  description: "Drawings, objects and experiments by Yán Fēng, 2017–2019",
};

export default function ArtPage() {
  return (
    <main className={s.page}>
      <Link href="/projects" className={s.back}>
        ← Make
      </Link>
      <header className={s.opening}>
        <div>
          <span className={s.eyebrow}>
            2017–2019 / art and other experiments
          </span>
          <h1 lang="zh">无用之用</h1>
          <p className={s.lead}>
            Some questions need a pencil
            <br />
            Others need a circuit board
          </p>
          <p className={s.intro}>
            Portraits, little machines, things made by hand
            <br />A few ways of following my curiosity
          </p>
          <a className={s.wander} href="#artworks">
            take a little wander <span aria-hidden="true">↘</span>
          </a>
        </div>
        <a
          href="#trampoline"
          className={s.cover}
          aria-label="Find Trampoline, a collage from 2019"
        >
          <Image
            src="/art/p01-01.webp"
            alt="Bright overlapping paper shapes in Trampoline"
            width={1565}
            height={1600}
            sizes="(max-width: 700px) 70vw, 360px"
            priority
          />
          <span>Trampoline, 2019</span>
        </a>
      </header>
      <ArtGallery />
      <footer className={s.end}>
        <span className={s.handwritten}>still curious</span>
        <Link href="/projects">back to the things I’m making ↗</Link>
      </footer>
    </main>
  );
}

import Link from "next/link";
import Monkeydokey from "@/components/Monkeydokey";
import PocketDoodle from "@/components/PocketDoodle";
import PersonalDesk from "@/components/PersonalDesk";
import WiserNotes from "@/components/WiserNotes";
import NamePronunciation from "@/components/NamePronunciation";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main className="portfolio-home">
      <section className="home-intro" aria-labelledby="intro-title">
        <div className="intro-copy">
          <span className="small-label">hi, I’m Yán Fēng. come on in :)</span>
          <div className="belief-heading">
            <h1 id="intro-title" className="belief-title">
              <span>Make</span>{" "}
              <span className="belief-good">
                Good
                <svg viewBox="0 0 300 110" fill="none" aria-hidden="true">
                  <path d="M277 85 C174 117 7 105 10 52 C12 1 211 -12 277 23 C321 48 269 102 148 105" />
                </svg>
              </span>{" "}
              <span className="belief-humans">
                Humans
                <svg viewBox="0 0 390 30" fill="none" aria-hidden="true">
                  <path d="M5 12 Q129 1 383 10 M20 22 Q205 10 361 22" />
                </svg>
              </span>
            </h1>
            <PocketDoodle />
          </div>
          <p>
            It’s what I believe in. In the things I make, the people I care
            about, and the person I’m still becoming.
          </p>
          <div className="intro-links">
            <Link className="text-link" href="/about">
              A little about me
            </Link>
            <NamePronunciation />
          </div>
        </div>
        <PersonalDesk />
      </section>
      <section className="selected-work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">
            Things I’ve put my{" "}
            <span className="doodle-heart-word">
              heart
              <svg viewBox="0 0 100 85" fill="none" aria-hidden="true">
                <path d="M50 76 C34 62 4 39 9 21 C14 1 42 3 50 23 C58 0 91 4 93 24 C94 45 65 65 50 76" />
              </svg>
            </span>{" "}
            into
          </h2>
          <span>Some worked. All of them taught me something.</span>
        </div>
        <div className="project-grid">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="work-index-link">
          <p>Also: wallets, cooperative agents, and other curiosities.</p>
          <Link className="text-link" href="/projects">
            Explore all work
          </Link>
        </div>
      </section>
      <WiserNotes home />
      <Monkeydokey />
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
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
          <span className="small-label">
            hi, glad you found your way here :)
          </span>
          <h1 id="intro-title">
            I’m Yán Fēng.
            <br />
            <em>Make yourself at home.</em>
          </h1>
          <p>
            I make things, climb things, and care a lot about the humans around
            me. This is a little corner of the internet for all of that.
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
          <h2 id="work-title">Things I’ve put my heart into</h2>
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
      <section className="life-section">
        <div className="life-image">
          <Image
            src="/images/hiking.jpg"
            alt="Yan at the summit sign on Mount Kilimanjaro"
            fill
            sizes="(max-width: 700px) 85vw, 36vw"
          />
          <span>Outside, somewhere.</span>
        </div>
        <div className="life-copy">
          <span className="small-label">Away from the worktable</span>
          <h2>
            There’s a life
            <br />
            around the work.
          </h2>
          <p>
            Mountains, basketball, spontaneous cooking, and the people who make
            me more myself.
          </p>
          <div className="life-links">
            <Link href="/adventures">A few adventures</Link>
            <Link href="/humans">The humans I’m grateful for</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

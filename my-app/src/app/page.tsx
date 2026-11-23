import Link from "next/link";
import Image from "next/image";
import MiluBuddy from "@/components/MiluBuddy";
import NamePronunciation from "@/components/NamePronunciation";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main className="portfolio-home">
      <section className="home-intro" aria-labelledby="intro-title">
        <div className="intro-copy">
          <span className="small-label">
            Design, technology & a little stubbornness
          </span>
          <h1 id="intro-title">
            Making things
            <br />
            more <em>human.</em>
          </h1>
          <p>
            I’m Yan, a builder who cares about how technology feels in people’s
            lives. I work across product, code, and the things you can hold.
          </p>
          <div className="intro-links">
            <Link className="text-link" href="/about">
              A little about me
            </Link>
            <NamePronunciation />
          </div>
        </div>
        <div className="home-worktable">
          <span className="worktable-label">
            A small companion. Tap to say hello.
          </span>
          <MiluBuddy />
          <Link className="worktable-caption" href="/projects/babymilu">
            BabyMilu · made with many hands
          </Link>
        </div>
      </section>
      <section className="selected-work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
          <span>Objects, interfaces, and lessons along the way.</span>
        </div>
        <div className="project-grid">
          {projects.slice(0, 4).map((project, index) => (
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

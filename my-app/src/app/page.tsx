import Link from "next/link";
import Monkeydokey from "@/components/Monkeydokey";
import BeliefOpening from "@/components/BeliefOpening";
import PersonalDesk from "@/components/PersonalDesk";
import WiserNotes from "@/components/WiserNotes";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main className="portfolio-home">
      <BeliefOpening />
      <section
        className="keepsakes-section"
        id="my-world"
        aria-labelledby="keepsakes-title"
      >
        <h2 id="keepsakes-title" className="sr-only">
          A few things from my world
        </h2>
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

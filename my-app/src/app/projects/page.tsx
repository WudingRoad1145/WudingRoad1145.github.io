import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { archivedProjects, projects } from "@/data/projects";
export const metadata = { title: "Make — Yán Fēng" };
export default function ProjectsPage() {
  return (
    <main className="work-page">
      <header className="page-heading">
        <span className="small-label">A collection of work</span>
        <h1>
          Things made
          <br />
          <em>Things learned</em>
        </h1>
        <p>
          Across hardware, interfaces, and research, I keep coming back to how
          we live with technology—and with one another
        </p>
      </header>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index < 2}
          />
        ))}
      </div>
      <section className="other-work">
        <h2>A few personal pursuits</h2>
        <Link href="/projects/big-woman">
          <span>Big Woman</span>
          <span>Strength, beauty & becoming</span>
        </Link>
        <Link href="/projects/because-it-is-there">
          <span>Because it is there</span>
          <span>Notes from the mountains</span>
        </Link>
        <Link href="/projects/miscellaneous">
          <span>无用之用</span>
          <span>Art & other experiments</span>
        </Link>
      </section>
      <section className="other-work" aria-labelledby="archive-title">
        <h2 id="archive-title">Archive</h2>
        {archivedProjects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <span>{project.title}</span>
            <span>
              {project.category} · {project.subtitle}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

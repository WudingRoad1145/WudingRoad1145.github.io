import Link from "next/link";
import Image from "next/image";
import WorkbenchFilm from "./WorkbenchFilm";
import type { Project } from "@/data/projects";
export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const invitations: Record<string, string> = {
    robotics: "wanna collab?",
    babymilu: "greet milu",
    wiser: "a formative story",
    "multi-agent": "let’s brainstorm",
  };
  const invitation = invitations[project.slug] || "take a look";
  if (project.slug === "robotics")
    return (
      <article className="project-card project-robotics">
        <div className="project-image">
          <WorkbenchFilm />
          <Link
            className="workbench-film-link"
            href={`/projects/${project.slug}`}
            aria-label="Explore my robotics story"
          >
            <span className="project-open">{invitation}</span>
          </Link>
        </div>
        <Link className="project-story" href={`/projects/${project.slug}`}>
          <div className="project-caption">
            <h3>{project.title}</h3>
            <span>{project.category}</span>
          </div>
          <p>{project.subtitle}</p>
        </Link>
      </article>
    );
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card project-${project.tone}`}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 700px) 100vw, 60vw"
          priority={priority}
        />
        <span className="project-open">{invitation}</span>
      </div>
      <div className="project-caption">
        <h3>{project.title}</h3>
        <span>{project.category}</span>
      </div>
      <p>{project.subtitle}</p>
    </Link>
  );
}

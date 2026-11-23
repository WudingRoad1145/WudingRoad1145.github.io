import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
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
        <span className="project-open">Explore the story</span>
      </div>
      <div className="project-caption">
        <h3>{project.title}</h3>
        <span>{project.category}</span>
      </div>
      <p>{project.subtitle}</p>
    </Link>
  );
}

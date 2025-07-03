import React from "react";
import DownloadMenu from "./DownloadMenu";

interface Project {
  name: string;
  description: string;
  stack: string[];
  link: string;
  image: string;
}

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="mb-16 md:mb-24 lg:mb-36">
      <div className="sticky top-0 z-20 ...">Projects</div>
      <ol className="group/list">
        {projects.map((project) => (
          <li key={project.name} className="mb-12">
            <div className="group relative grid gap-4 sm:grid-cols-8 sm:gap-8">
              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                  <a href={project.link} target="_blank" rel="noreferrer noopener">
                    {project.name}
                  </a>
                </h3>
                <p className="mt-2 text-sm">{project.description}</p>
                <ul className="mt-2 flex flex-wrap">
                  {project.stack.map((tech, idx) => (
                    <li key={idx} className="mr-1.5 mt-2">
                      <span className="badge-gradient-border">
                        <span>{tech}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-2">
                {project.image && (
                  <img
                    alt={project.name}
                    loading="lazy"
                    className="aspect-video object-cover rounded border-2 border-slate-200/10 transition"
                    src={project.image}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <DownloadMenu />
    </section>
  );
}

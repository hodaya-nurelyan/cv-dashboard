import React from "react";
import DownloadMenu from "./DownloadMenu";

interface Experience {
  company: string;
  title: string;
  years: string;
  stack: string[];
  highlights: string[];
}

interface Props {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: Props) {
  return (
    <section id="experience" className="mb-16 md:mb-24 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4  bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          Experience
        </h2>
      </div>
      <ol className="group/list">
        {experience.map((job) => (
          <li key={job.company} className="mb-12">
            <div className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4">
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                {job.years}
              </header>
              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                  <span>{job.title} @ {job.company}</span>
                </h3>
                <p className="mt-2 text-sm leading-normal">{job.highlights.join(" • ")}</p>
                <ul className="mt-2 flex flex-wrap">
                  {job.stack.map((tech, idx) => (
                    <li key={idx} className="mr-1.5 mt-2">
                      <span className="badge-gradient-border">
                        <span>{tech}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <DownloadMenu />
    </section>
  );
}

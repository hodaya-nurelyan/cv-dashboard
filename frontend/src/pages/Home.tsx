// File: frontend/src/pages/Home.tsx
import React from "react";
import { useEffect, useState } from "react";

import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { MdWork } from "react-icons/md";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PieChart, Pie, Cell, Legend } from "recharts";

import ChatBot from "../components/ChatBot";
import SideNav from "../components/SideNav";
import DynamicBackground from "../components/DynamicBackground";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface Skill {
  name: string;
  level: number;
}

interface About {
  p1?: string;
  p2?: string;
  p3?: string;
}

interface Experience {
  company: string;
  title: string;
  years: string;
  stack: string[];
  highlights: string[];
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
}

interface Profile {
  name: string;
  title: string;
  summary: string;
  about: About[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}

interface Education {
  school: string;
  degree: string;
  years: string;
  highlights: string[];
}

function getTechFrequency(projects: Project[]) {
  const freq: { [key: string]: number } = {};
  projects.forEach((p) => {
    p.tech.forEach((t) => {
      freq[t] = (freq[t] || 0) + 1;
    });
  });
  return Object.entries(freq).map(([name, value]) => ({ name, value }));
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const COLORS = ["#34d399", "#d946ef", "#38bdf8", "#fbbf24", "#2dd4bf"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile`)
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <>
      <DynamicBackground />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
        >
          Skip to Content
        </a>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-between lg:py-24">
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl flex items-center gap-2">
              <SparklesIcon className="h-7 w-7 text-pink-500 animate-pulse" />
              <a href="/">{profile.name}</a>
            </h1>

            <h2 class="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              {profile.title}
            </h2>

            <p className="mt-4 max-w-xs leading-normal">{profile.summary}</p>

            <SideNav />
          </header>

          <main id="content" className="pt-24 lg:w-[60%] lg:py-24">
            <section
              id="about"
              class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="About me"
            >
              <p className="mb-4">{profile.about[0].p1}</p>
              <p className="mb-4">{profile.about[1].p2}</p>
              <p className="mb-4">{profile.about[2].p3}</p>
            </section>
            <section
              id="experience"
              className="scroll-mt-24"
              aria-label="Work experience"
            >
              <h3 className="text-2xl font-semibold mb-4">Experience</h3>
              <div class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"></div>
              <div>
                <ol class="group/list">
                  {profile.experience.map((job) => (
                    <li key={job.company} class="mb-12">
                      <div class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <header
                          class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                          aria-label="2024 to Present"
                        >
                          {job.years}
                        </header>
                        <div class="z-10 sm:col-span-6">
                          <h3 class="font-medium leading-snug text-slate-200">
                            <div>
                              <a
                                class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
                                href="https://askhodaya.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label="Senior Frontend Engineer, Accessibility at Klaviyo (opens in a new tab)"
                              >
                                <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                <span>
                                  {job.title} @ {job.company}
                                </span>
                              </a>
                            </div>
                          </h3>
                          <p class="mt-2 text-sm leading-normal">
                            Build and maintain critical components used to
                            construct Klaviyo’s frontend, across the whole
                            product. Work closely with cross-functional teams,
                            including developers, designers, and product
                            managers, to implement and advocate for best
                            practices in web accessibility.
                          </p>
                          <ul
                            class="mt-2 flex flex-wrap"
                            aria-label="Technologies used"
                          >
                            {job.stack.map((h, idx) => (
                              <li key={idx} class="mr-1.5 mt-2">
                                <div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                                  {h}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="scroll-mt-24" id="education">
              <h3 className="text-2xl font-semibold mb-4">
                Online Learning & Courses
              </h3>
              <VerticalTimeline>
                {profile.education.map((edu, idx) => (
                  <VerticalTimelineElement
                    key={idx}
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: "#1e293b", color: "#f8fafc" }}
                    contentArrowStyle={{ borderRight: "7px solid #1e293b" }}
                    date={edu.years}
                    iconStyle={{ background: "#6366f1", color: "#fff" }}
                    icon={<MdWork />} // אפשר לשנות ל־<MdSchool />
                  >
                    <h3 className="text-lg font-bold">{edu.degree}</h3>
                    <h4 className="text-sm">{edu.school}</h4>
                    <ul className="list-disc list-inside text-sm text-slate-300 mt-2">
                      {edu.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </section>

            <section className="scroll-mt-24" id="skills">
              <h3 className="text-2xl font-semibold mb-2">
                Skills & Technology Distribution
              </h3>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 aspect-square bg-slate-800 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profile.skills}>
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis domain={[0, 100]} stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="level">
                        {profile.skills.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full lg:w-1/2 aspect-square bg-slate-800 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getTechFrequency(profile.projects)}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                      >
                        {getTechFrequency(profile.projects).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <ChatBot />
          </main>
        </div>
      </div>
    </>
  );
}

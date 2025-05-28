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

interface Skill {
  name: string;
  level: number;
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
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
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

  const COLORS = [
    "#4f46e5",
    "#9333ea",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#14b8a6",
    "#8b5cf6",
  ];

  useEffect(() => {
    fetch("http://localhost:8000/api/profile")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <p className="text-xl text-gray-700">{profile.title}</p>
      <p className="mt-4 text-gray-800">{profile.summary}</p>
      <section className="mt-8 flex gap-4">
        {/* <section className="w-1/2">
          <h2 className="text-2xl font-semibold mb-2">🧠 Skills</h2>
          <ul className="grid grid-cols-2 gap-2">
            {profile.skills.map((s) => (
              <li key={s.name} className="bg-gray-100 rounded p-2 shadow-sm">
                <span className="font-medium">{s.name}</span> – {s.level}%
              </li>
            ))}
          </ul>
        </section> */}
        <section className="w-1/2">
          <h2 className="text-2xl font-semibold mb-2">🧠 Skills</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profile.skills}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="level" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="w-1/2">
          <h2 className="text-2xl font-semibold mb-2">
            📊 התפלגות טכנולוגיות בפרויקטים
          </h2>
          <div className="h-96 bg-white rounded shadow p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getTechFrequency(profile.projects)}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {getTechFrequency(profile.projects).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">💼 ניסיון תעסוקתי</h2>
        <VerticalTimeline>
          {profile.experience.map((job, idx) => (
            <VerticalTimelineElement
              key={idx}
              className="vertical-timeline-element--work"
              contentStyle={{ background: "#e5e7eb", color: "#111827" }}
              contentArrowStyle={{ borderRight: "7px solid #e5e7eb" }}
              date={job.years}
              iconStyle={{ background: "#4f46e5", color: "#fff" }}
              icon={<MdWork />}
            >
              <h3 className="vertical-timeline-element-title text-lg font-bold">
                {job.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle text-sm">
                {job.company}
              </h4>
              <p className="text-sm mt-2 mb-1">Stack: {job.stack.join(", ")}</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">
          💼 Employment Experience
        </h2>
        {profile.experience.map((job) => (
          <div key={job.company} className="mb-4 border-b pb-4">
            <h3 className="text-xl font-bold">
              {job.title} @ {job.company}
            </h3>
            <p className="text-sm text-gray-500">{job.years}</p>
            <p className="mt-1 text-sm">Stack: {job.stack.join(", ")}</p>
            <ul className="list-disc list-inside text-sm mt-1">
              {job.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">🚀 Projects</h2>
        {profile.projects.map((project) => (
          <div key={project.name} className="mb-4 border rounded p-4">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <p className="text-sm">Tech: {project.tech.join(", ")}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              GitHub
            </a>
          </div>
        ))}
      </section>
      <ChatBot />
    </div>
  );
}

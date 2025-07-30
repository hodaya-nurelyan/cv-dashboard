import React, { useEffect, useState } from "react";
import DynamicBackground from "../components/DynamicBackground";
import ChatBot from "../components/ChatBot";
import Loader from "../components/Loader";

import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import { SwitchTheme } from "../components/SwitchTheme";
import { useTheme } from "../contexts/ThemeContext"; // adjust the path as needed


interface Skill {
  name: string;
  level: number;
}
interface About {
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
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
  stack: string[];
  link: string;
  image: string;
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

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { darkMode } = useTheme();


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile`)
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <Loader />;

  return (
    <>

      <div
        className={` ${darkMode ? "bg-slate-900 text-slate-400" : "bg-white text-slate-900"}`}
      >
        <DynamicBackground />
        <div
          className={`mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0
          `}
        >

          <SwitchTheme />

          <a href="#content" className="absolute left-0 top-0 block -translate-x-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase text-white focus-visible:translate-x-0">
            Skip to Content
          </a>
          <div className="lg:flex lg:justify-between lg:gap-4">
            <Header
              name={profile.name}
              title={profile.title}
              summary={profile.summary}
            />
            <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
              <AboutSection about={profile.about} />
              <ExperienceSection experience={profile.experience} />
              <ProjectsSection projects={profile.projects} />
              <ContactSection />
              <ChatBot />
            </main>
          </div>
        </div>
      </div >
    </>
  );
}

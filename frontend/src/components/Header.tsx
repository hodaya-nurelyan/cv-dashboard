import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import SideNav from "./SideNav";
import ContactInfo from "./ContactInfo";
import { useTheme } from "../contexts/ThemeContext";

interface Props {
  name: string;
  title: string;
  summary: string;
}

export default function Header({ name, title, summary }: Props) {
  const { darkMode } = useTheme();

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className={`${darkMode ? " text-slate-200" : " text-slate-900"}  font-bold tracking-tight flex items-center gap-2 text-2xl sm:text-4xl `}>
          <SparklesIcon className="h-7 w-7 animate-color-pulse" />
          <a href="/">{name}</a>
        </h1>
        <h2 className={`${darkMode ? " text-slate-200" : " text-slate-900"} mt-3 text-lg font-medium tracking-tight   sm:text-xl`}>
          {title}
        </h2>
        <p className="mt-4 max-w-xs leading-normal">{summary}</p>
        <div className="ml-1 mt-8 flex items-center block md:hidden">
          <ContactInfo />
        </div>
        <SideNav />
      </div>
    </header>
  );
}

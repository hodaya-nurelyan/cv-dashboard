import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import SideNav from "./SideNav";
import ContactInfo from "./ContactInfo";

interface Props {
  name: string;
  title: string;
  summary: string;
}

export default function Header({ name, title, summary }: Props) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl flex items-center gap-2">
          <SparklesIcon className="h-7 w-7 animate-color-pulse" />
          <a href="/">{name}</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
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

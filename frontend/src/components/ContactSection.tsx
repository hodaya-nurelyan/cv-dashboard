import React from "react";
import ContactForm from "./ContactForm";
import { useTheme } from "../contexts/ThemeContext";

export default function ContactSection() {
  const { darkMode } = useTheme();
  return (
    <section id="contact" className="mb-16 md:mb-24 lg:mb-36">
      <div className={`${darkMode ? " bg-slate-900/75" : " bg-white/75"} sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest  ${darkMode ? " text-slate-200" : " text-slate-900"}`}>
          Contact Me
        </h2>
      </div>
      <ContactForm />
    </section>
  );
}

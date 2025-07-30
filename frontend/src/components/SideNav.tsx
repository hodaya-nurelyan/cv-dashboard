import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const items = [
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const SideNav = () => {
  const [activeId, setActiveId] = useState("about");
  const { darkMode } = useTheme();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {items.map((item) => (
          <li key={item.href}>
            <a className="group flex items-center py-3" href={item.href}>
              <span
                className={`nav-indicator mr-4 h-px transition-all ${activeId === item.id
                    ? "w-16 bg-slate-200"
                    : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200"
                  }`}
              />
              <span
                className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors ${activeId === item.id
                    ? darkMode
                      ? "text-slate-200"
                      : "text-slate-900"
                    : "text-slate-500 group-hover:text-slate-200"
                  }`}
              >
                {item.label}
              </span>
            </a>
          </li>

        ))}
      </ul>
    </nav >
  );
};

export default SideNav;

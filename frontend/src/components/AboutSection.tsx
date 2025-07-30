import React from "react";
import FloatingShareMenu from "./FloatingShareMenu";

interface About {
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
}

interface Props {
  about: About[];
}

export default function AboutSection({ about }: Props) {
  return (
    <section id="about" className="mb-16 md:mb-24 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4   bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          About
        </h2>
      </div>
      <p className="mb-4">{about[0]?.p1}</p>
      <p className="mb-4">{about[1]?.p2}</p>
      <p className="mb-4">{about[2]?.p3}</p>
      <p className="mb-4">{about[3]?.p4}</p>
      <FloatingShareMenu />
    </section>
  );
}

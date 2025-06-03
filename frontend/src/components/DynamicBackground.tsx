import React, { useEffect, useState } from "react";

export default function DynamicBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMouseX(e.clientX);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const baseColor = prefersDark
    ? "rgba(29, 78, 216, 0.15)"
    : "rgba(59, 130, 246, 0.15)";
  const accentColor = prefersDark
    ? "rgba(236, 72, 153, 0.1)"
    : "rgba(147, 51, 234, 0.1)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `
          radial-gradient(600px at ${mouseX}px ${
          scrollY + 160
        }px, ${baseColor}, transparent 80%),
          radial-gradient(400px at ${mouseX * 0.8}px ${
          scrollY + 400
        }px, ${accentColor}, transparent 80%)
        `,
      }}
    />
  );
}

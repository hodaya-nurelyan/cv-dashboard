import React, { useEffect, useState } from "react";
import { Share2, Mail, MessageCircleMore, Link, Linkedin } from "lucide-react";

export default function ShareMenu() {
  const [open, setOpen] = useState(false);

  const shareProfile = (platform) => {
    const profileUrl = encodeURIComponent("https://askhodaya.com");
    const text = encodeURIComponent("Check out Hodaya's interactive resume!");

    const urls = {
      email: `mailto:?subject=Hodaya's Resume&body=${text} ${profileUrl}`,
      whatsapp: `https://wa.me/?text=${text} ${profileUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${profileUrl}`,
      link: profileUrl,
    };

    if (platform === "link") {
      navigator.clipboard.writeText("https://askhodaya.com");
      alert("Link copied to clipboard!");
    } else {
      window.open(urls[platform], "_blank");
    }
  };

  return (
    <div
      className="relative inline-block"    
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center font-medium text-base text-slate-200 hover:text-magenta-custom transition-colors"
        title="Share My CV"
      >
        Share My CV
        <Share2 className="w-4 h-4 ml-2 transition-transform duration-300" />
      </button>

      {/* Share Buttons - on open */}
      <div
        className={`absolute top-1/2 left-full ml-3 transform -translate-y-1/2 flex  gap-2 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => shareProfile("email")}
          className="flex items-center rounded-full bg-teal-400/10 px-3 py-3 text-xs font-medium leading-5 text-magenta-custom transition"
          title="Email"
        >
          <Mail className="w-4 h-4" />
        </button>
        <button
          onClick={() => shareProfile("whatsapp")}
          className="flex items-center rounded-full bg-teal-400/10 px-3 py-3 text-xs font-medium leading-5 text-magenta-custom transition"
          title="WhatsApp"
        >
          <MessageCircleMore className="w-4 h-4" />
        </button>
        <button
          onClick={() => shareProfile("linkedin")}
          className="flex items-center rounded-full bg-teal-400/10 px-3 py-3 text-xs font-medium leading-5 text-magenta-custom transition"
          title="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button
          onClick={() => shareProfile("link")}
          className="flex items-center rounded-full bg-teal-400/10 px-3 py-3 text-xs font-medium leading-5 text-magenta-custom transition"
          title="Copy Link"
        >
          <Link className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

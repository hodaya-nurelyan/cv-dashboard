import { MapPin, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6 text-white">
      {/* Location */}
      <div className="flex items-start gap-4">
        <MapPin className="text-teal-300 mt-1" />
        <div>
          <h4 className="font-semibold">Location</h4>
          <p>Tel Aviv, Israel</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-4">
        <Mail className="text-teal-300 mt-1" />
        <div>
          <h4 className="font-semibold">Email</h4>
          <a
            href="mailto:hodaya.yd@gmail.com"
            className="text-teal-300 underline"
          >
            hodaya.yd@gmail.com
          </a>
        </div>
      </div>

      {/* LinkedIn */}
      <div className="flex items-start gap-4">
        {/* לינקדאין כ-SVG כי Lucide לא כולל אותו */}
        <svg
          className="text-teal-300 mt-1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5v14h-5v-14zm7.5 0h4.8v1.9h.07c.67-1.3 2.3-2.6 4.73-2.6 5.06 0 6 3.3 6 7.6v8.1h-5v-7.2c0-1.7-.03-3.8-2.33-3.8-2.33 0-2.7 1.8-2.7 3.7v7.3h-5v-14z" />
        </svg>
        <div>
          <h4 className="font-semibold">LinkedIn</h4>
          <a
            href="https://www.linkedin.com/in/hodaya-nurelyan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 underline"
          >
            linkedin.com/in/hodaya-nurelyan
          </a>
        </div>
      </div>
    </div>
  );
}

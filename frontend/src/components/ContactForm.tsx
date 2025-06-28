import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock } from "lucide-react"; // לאייקונים
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("שולח…");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("ההודעה נשלחה ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("שגיאה בשליחה.");
      }
    } catch {
      setStatus("בעיית חיבור.");
    }
  };

  return (
    <div className="bg-[#0f172a] ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <p className="text-gray-300">
            Let’s connect! Whether it's a new idea, a job opportunity, or just a
            quick hello – I’d love to hear from you.
          </p>
          <div className="hidden md:flex">
            <ContactInfo />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-[#1e293b] p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white text-black"
            />
            <Input
              name="email"
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white text-black"
            />
            <Textarea
              name="message"
              placeholder="Write your message..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-white text-black"
            />
            <Button
              type="submit"
              className="flex items-center rounded-full bg-gradient-brand px-3 py-1 text-xs font-medium leading-5 text-white"
            >
              Send Message
            </Button>
            {status && (
              <p
                className={cn(
                  "text-center",
                  status.includes("✅") ? "text-green-400" : "text-red-400"
                )}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

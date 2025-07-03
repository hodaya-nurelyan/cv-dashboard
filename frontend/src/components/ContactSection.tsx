import React from "react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="mb-16 md:mb-24 lg:mb-36">
      <div className="sticky top-0 z-20 ...">Contact Me</div>
      <ContactForm />
    </section>
  );
}

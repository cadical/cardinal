"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "2347076175550"; // replace with your number (no + sign)

  const message = encodeURIComponent(
    "Hi! I’d like to make an enquiry."
  );

  const link = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        {/* pulse ring */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-30" />

        {/* button */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform">
          <MessageCircle size={26} />
        </div>
      </div>
    </a>
  );
}
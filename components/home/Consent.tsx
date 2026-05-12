"use client";
import { useEffect, useState } from "react";

export default function Consent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("consent")) {
      setTimeout(() => setShow(true), 1200);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 max-w-md bg-white border p-4 rounded-lg shadow z-12">
      <h4 className="font-serif mb-2">A note on cookies</h4>
      <p className="text-sm text-gray-600 mb-3">
        We use cookies under NDPA 2023 compliance.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            localStorage.setItem("consent", "all");
            setShow(false);
          }}
          className="border-2  px-4 py-2 rounded"
        >
          Accept All
        </button>
        <button
          onClick={() => {
            localStorage.setItem("consent", "essential");
            setShow(false);
          }}
          className="border px-4 py-2 rounded"
        >
          Essentials only
        </button>
      </div>
    </div>
  );
}
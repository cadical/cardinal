"use client";

import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";
// import { fadeUp } from "@/lib/motion";

export default function Testimonial() {
  return (
    <section className="bg-[#F4F1EA] px-5 py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        className="max-w-[880px] mx-auto"
      >
        <p className="text-[5rem] text-teal leading-none mb-2">“</p>

        <p className="font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] mb-8">
          Cadical hasn’t missed a supply window in two years. That’s the difference between <em>operating</em> and <em>improvising.</em>
        </p>

        <p className="font-medium">Dr. Adaeze Okafor</p>
      </motion.div>
    </section>
  );
}
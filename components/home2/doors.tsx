
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

const doors = [
  {
    title: "Pharmacy store",
    tag: "A · FOR EVERYONE",
    items: [
      "NAFDAC-certified products",
      "OTC & prescription medication",
      "Same-day Lagos & Abuja delivery",
    ],
  },
  {
    title: "Institutional supply",
    tag: "B · FOR INSTITUTIONS",
    items: [
      "Bulk pricing with auto-invoicing",
      "Monthly supply contracts",
      "Dedicated account manager",
    ],
  },
  {
    title: "Equipment services",
    tag: "C · ON-SITE & VIRTUAL",
    items: [
      "Equipment servicing & repair",
      "Quarterly maintenance plans",
      "Procurement consultation",
    ],
  },
];

export default function Doors() {
  return (
    <section className="px-5 py-20">
      <div className="max-w-7xl mx-auto">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs tracking-widest text-teal mb-2">
            01 — THREE WAYS IN
          </p>
          <h2 className="text-4xl font-serif">
            One company, <span className="italic text-teal">three doors.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 gap-4"
        >
          {doors.map((door, i) => (
            <motion.div
              key={i}
              variants={fadeUp as any}
              className="border rounded-xl p-6 bg-white hover:-translate-y-1 transition"
            >
              <div className="aspect-[16/10] bg-teal-deep rounded-md mb-4" />

              <p className="text-xs text-gray-500 mb-2">{door.tag}</p>

              <h3 className="text-xl font-serif mb-3">
                {door.title.split(" ")[0]}{" "}
                <span className="italic text-teal">
                  {door.title.split(" ")[1]}
                </span>
              </h3>

              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                {door.items.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="w-2 h-2 bg-teal rounded-full mt-2" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="text-teal text-sm border-b border-teal">
                Explore →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
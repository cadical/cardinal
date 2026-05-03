"use client";

import { motion } from "framer-motion";

const words = [
  ["Reliable", 0.3],
  ["healthcare", 0.4],
  ["supply,", 0.5],
];

const words2 = [
  ["delivered", 0.65],
  ["with", 0.78],
  ["care.", 0.9],
];

export default function Hero() {
  return (
    <section className="relative px-6 pt-24 pb-16 overflow-hidden">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">

        {/* LEFT */}
        <div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-6"
            style={{ background: "var(--teal-soft)", color: "var(--teal-darker)" }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: "var(--teal)", animation: "pulse 2s infinite" }}
            />
            Nigeria's healthcare supply partner
          </motion.div>

          {/* H1 */}
          <h1 className="font-display text-[clamp(2.5rem,1.8rem+3.5vw,4.5rem)] leading-[1.02] mb-6">

            {words.map(([w, d], i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: d as number, duration: 0.7 }}
                className="inline-block mr-2"
              >
                {w}
              </motion.span>
            ))}

            <br />

            <em style={{ color: "var(--teal)" }}>
              {words2.map(([w, d], i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: d as number, duration: 0.7 }}
                  className="inline-block mr-2"
                >
                  {w}
                </motion.span>
              ))}
            </em>
          </h1>

          {/* SUB */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-[1.1rem] text-[var(--ink-soft)] max-w-[480px] mb-8"
          >
            Medical equipment, pharmaceutical products and specialist services...
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex gap-3 flex-wrap"
          >
            <button className="px-6 py-3 rounded-full text-sm text-white"
              style={{ background: "var(--teal-deep)" }}>
              Order supplies
            </button>

            <button className="px-6 py-3 rounded-full text-sm border"
              style={{ borderColor: "var(--rule-strong)" }}>
              Explore pharmacy
            </button>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="aspect-[4/5] rounded-2xl overflow-hidden"
          style={{ background: "var(--teal-deep)" }}
        />

      </div>

      {/* EKG LINE */}
      <svg className="absolute bottom-0 left-0 w-full h-[60px] opacity-50">
        <path
          d="M0 30 L380 30 L400 12 L420 50 L450 0 L480 30 L900 30 L920 18 L945 44 L970 30 L1600 30"
          fill="none"
          stroke="#0F6E56"
          strokeWidth="1.2"
          style={{
            strokeDasharray: 1600,
            strokeDashoffset: 1600,
            animation: "drawEkg 8s infinite"
          }}
        />
      </svg>
    </section>
  );
}
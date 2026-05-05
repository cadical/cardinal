"use client";

import { useEffect, useRef, useState } from "react";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [path, setPath] = useState("");
  const [length, setLength] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = ["Choose", "Order", "We Deliver", "Done"];

  // -----------------------------
  // Build smooth curved path
  // -----------------------------
  const buildPath = () => {
    if (!sectionRef.current) return;

    const points = itemRefs.current
      .map((el) => {
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        const parent = sectionRef.current!.getBoundingClientRect();

        return {
          x: rect.left - parent.left + rect.width / 2,
          y: rect.top - parent.top + rect.height / 2,
        };
      })
      .filter(Boolean) as { x: number; y: number }[];

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midX = (p1.x + p2.x) / 2;

      d += ` Q ${midX} ${p1.y} ${p2.x} ${p2.y}`;
    }

    setPath(d);
  };

  // -----------------------------
  // Scroll progress controller
  // -----------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const total = rect.height;
      const visible = Math.min(windowHeight - rect.top, total);

      const p = Math.max(0, Math.min(1, visible / total));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------
  // Build path AFTER layout
  // -----------------------------
  useEffect(() => {
    const t = setTimeout(() => {
      buildPath();
    }, 0);

    window.addEventListener("resize", buildPath);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", buildPath);
    };
  }, []);

  // -----------------------------
  // Measure SVG path length safely
  // -----------------------------
  useEffect(() => {
    if (!path || !pathRef.current) return;

    const len = pathRef.current.getTotalLength();

    if (Number.isFinite(len) && len > 0) {
      setLength(len);
    }
  }, [path]);

  // -----------------------------
  // Safe dot position
  // -----------------------------
  const getPoint = (p: number) => {
    if (!pathRef.current || !length || length === 0) {
      return { x: 0, y: 0 };
    }

    return pathRef.current.getPointAtLength(p * length);
  };

  const dot = getPoint(progress);

  const activeIndex = Math.min(
    steps.length - 1,
    Math.floor(progress * steps.length)
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-[#0d47a1] text-white relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-serif font-bold">
          Simple from start to finish.
        </h2>
      </div>

      <div className="relative z-10">
        {/* SVG layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* animated path */}
          <path
            ref={pathRef}
            d={path}
            stroke="#F5A623"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={length}
            strokeDashoffset={length - length * progress}
          />

          {/* moving dot (SAFE RENDER) */}
          {path && length > 0 && (
            <circle
              cx={dot.x}
              cy={dot.y}
              r="6"
              fill="#F5A623"
              className="drop-shadow-[0_0_10px_#F5A623]"
            />
          )}
        </svg>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((t, i) => (
            <div key={i} className="text-center">
              <div
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-bold transition-all duration-300 ${
                  i <= activeIndex
                    ? "bg-[#F5A623] scale-110"
                    : "bg-white/20"
                }`}
              >
                {i + 1}
              </div>

              <h4 className="mb-2">{t}</h4>
              <p className="text-white/60 text-sm">
                Step description
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
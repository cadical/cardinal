"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

const products = [
  { name: "Paracetamol 500mg", price: "₦2,400" },
  { name: "BP Monitor", price: "₦38,500" },
  { name: "Surgical gloves", price: "₦9,200" },
  { name: "Test strips", price: "₦15,800" },
];

export default function Products() {
  return (
    <section className="bg-[#F4F1EA] px-5 py-20">
      <div className="max-w-7xl mx-auto">

        <motion.div 
        variants={fadeUp} 
        initial="hidden" whileInView="show">
          <h2 className="text-3xl font-serif mb-10">
            Stocked, <span className="italic text-teal">ready.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {products.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white p-4 rounded-lg border"
            >
              <div className="aspect-square bg-teal-pale mb-3" />
              <h4 className="text-sm font-medium">{p.name}</h4>
              <p className="text-xs text-gray-500 mb-2">NAFDAC XXXX</p>

              <div className="flex justify-between items-center">
                <span className="font-serif">{p.price}</span>
                <button className="text-xs border px-3 py-1 rounded-full">
                  Add
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
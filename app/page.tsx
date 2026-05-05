"use client";

import Compliance from "@/components/home/Compliance";
import Consent from "@/components/home/Consent";
import Coverage from "@/components/home/Coverage";
import CTA from "@/components/home/cta";
import Hero from "@/components/home/hero";
import Portals from "@/components/home/portals";
import Process from "@/components/home/process";
import Services from "@/components/home/services";
import Why from "@/components/home/why";
import { ProductCard } from "@/components/product-card";
// import Compliance from "@/components/home/compliance";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="font-sans text-[#1a2332] bg-white overflow-x-hidden">

     <Hero />

      <Portals />

      {/* WHY */}
      <Why />

      {/* SERVICES */}
      <Services />

      {/* Products */}
      <ProductCard id={"new"} name={"A test"} price={5000} category={"EQUIPMENT"} stock={0} onAddToCart={function (productId: string): void {
        throw new Error("Function not implemented.");
      } } />

      {/* PROCESS */}
      <Process />

      {/* CTA */}
      <CTA />

      {/* Compliance */}
      <Compliance />

      {/* Consent */}
      <Consent />

      {/* Coverage */}
      <Coverage />

    </main>
  );
}
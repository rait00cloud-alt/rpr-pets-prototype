"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "../../config/bellic";

interface ServiceSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

const serviceSlides: ServiceSlide[] = SERVICES;

export default function ServicesContainer() {
  const [index, setIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleViewMore = (idx: number) => {
    window.location.href = `/servicos#${serviceSlides[idx].id}`;
  };

  const scrollTo = (idx: number) => {
    const item = itemRefs.current[idx];
    if (!item) return;
    item.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (idx !== -1) setIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">

      {/* ---------------- MOBILE ---------------- */}
      <div className="lg:hidden flex flex-col w-full items-center overflow-x-hidden sm:py-8">
        {serviceSlides.map((service, i) => {
          const active = i === index;

          return (
            <motion.button
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              onClick={() => handleViewMore(i)}
              className="relative w-full flex-shrink-0"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative overflow-hidden bg-[#171717] w-full border-[#C4A574]"
                animate={{
                  borderWidth: active ? 3 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full aspect-[4/3]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent" />
                  
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    animate={{
                      opacity: active ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-sm font-bold text-[#F2F2F2] bg-[#0F0F0F] px-2 py-1 mb-2 inline-block">
                      {service.title}
                    </h3>
                    <p className="text-[#F2F2F2]/80 text-xs ">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C62828] rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden lg:grid grid-cols-3 w-full gap-4">
        {serviceSlides.map((service, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden bg-[#171717] border border-[#C4A574] cursor-pointer group w-full hover:border-[#C62828] transition-all"
            onClick={() => handleViewMore(i)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full h-full aspect-[4/3]">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-base font-bold text-[#F2F2F2] bg-[#0F0F0F] px-2 py-1 mb-2 inline-block group-hover:bg-[#C62828] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#F2F2F2]/80 text-sm ">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}


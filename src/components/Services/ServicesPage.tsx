"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../../config/bellic";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0);

  return (
    <div className="w-full min-h-screen bg-[#0F0F0F] flex flex-col">
      
      {/* IMAGEM PRINCIPAL */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          src={SERVICES[selectedService].image}
          alt={SERVICES[selectedService].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
        
        {/* TÍTULO COMO LABEL */}
        <motion.h1
          key={selectedService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-8 text-2xl md:text-4xl font-bold text-[#F2F2F2] bg-[#0F0F0F] px-4 py-2"
        >
          {SERVICES[selectedService].title}
        </motion.h1>
      </div>

      {/* THUMBS DOS SERVIÇOS */}
      <div className="w-full flex flex-row gap-2 p-4 overflow-x-auto justify-center lg:justify-center">
        {SERVICES.map((service, i) => (
          <motion.button
            key={service.id}
            onClick={() => setSelectedService(i)}
            className={`relative flex-shrink-0 w-32 aspect-[3/4] overflow-hidden border-2 transition-all ${
              selectedService === i ? "border-[#C62828]" : "border-[#C4A574]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
            <h3 className="absolute bottom-2 left-2 right-2 text-xs font-bold text-[#F2F2F2] bg-[#0F0F0F]/80 px-2 py-1">
              {service.title}
            </h3>
          </motion.button>
        ))}
      </div>

      {/* CONTEÚDO COM BG WHITE */}
      <div className="w-full bg-[#F2F2F2] p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={selectedService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-1 bg-[#C62828] mb-6" />
            
            <p className="text-lg text-[#0F0F0F]/80 leading-relaxed mb-8">
              {SERVICES[selectedService].fullDescription}
            </p>

            <a
              href="/contato"
              className="inline-block bg-[#C62828] text-[#F2F2F2] px-8 py-3 font-bold uppercase text-sm hover:bg-[#C62828]/80 transition-all mb-12"
            >
              Solicitar Orçamento
            </a>
          </motion.div>

          {/* CARROSSEL DE IMAGENS */}
          {SERVICES[selectedService].gallery && SERVICES[selectedService].gallery.length > 0 && (
            <motion.div
              key={`gallery-${selectedService}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {SERVICES[selectedService].gallery.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-64 h-48 overflow-hidden">
                  <img
                    src={img}
                    alt={`${SERVICES[selectedService].title} ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
}


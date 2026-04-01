"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-[#0F0F0F] flex flex-col">
      
      {/* IMAGEM/VÍDEO PRINCIPAL */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/belic-07.mp4" type="video/mp4" />
          <img
            src="/privacy/hero.jpg"
            alt="Política de Privacidade"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
        
        {/* TÍTULO COMO LABEL */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-8 text-2xl md:text-4xl font-bold text-[#F2F2F2] bg-[#0F0F0F] px-4 py-2"
        >
          {t('politica.titulo')}
        </motion.h1>
      </div>

      {/* CONTEÚDO COM BG WHITE */}
      <div className="w-full bg-[#F2F2F2] p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-1 bg-[#C62828] mb-6" />
            
            <p className="text-lg text-[#0F0F0F]/80 leading-relaxed mb-8">
              {t('politica.introducao')}
            </p>

            {/* Seção 1 */}
            <h2 className="text-2xl font-bold text-[#0F0F0F] mt-8 mb-4">
              {t('politica.coleta.titulo')}
            </h2>
            <p className="text-base text-[#0F0F0F]/80 leading-relaxed mb-6">
              {t('politica.coleta.descricao')}
            </p>

            {/* Seção 2 */}
            <h2 className="text-2xl font-bold text-[#0F0F0F] mt-8 mb-4">
              {t('politica.uso.titulo')}
            </h2>
            <p className="text-base text-[#0F0F0F]/80 leading-relaxed mb-6">
              {t('politica.uso.descricao')}
            </p>

            {/* Seção 3 */}
            <h2 className="text-2xl font-bold text-[#0F0F0F] mt-8 mb-4">
              {t('politica.compartilhamento.titulo')}
            </h2>
            <p className="text-base text-[#0F0F0F]/80 leading-relaxed mb-6">
              {t('politica.compartilhamento.descricao')}
            </p>

            {/* Seção 4 */}
            <h2 className="text-2xl font-bold text-[#0F0F0F] mt-8 mb-4">
              {t('politica.direitos.titulo')}
            </h2>
            <p className="text-base text-[#0F0F0F]/80 leading-relaxed mb-6">
              {t('politica.direitos.descricao')}
            </p>

            {/* Seção 5 */}
            <h2 className="text-2xl font-bold text-[#0F0F0F] mt-8 mb-4">
              {t('politica.contato.titulo')}
            </h2>
            <p className="text-base text-[#0F0F0F]/80 leading-relaxed mb-12">
              {t('politica.contato.descricao')}
            </p>

            {/* BOTÃO */}
            <a
              href="/"
              className="inline-block bg-[#C62828] text-[#F2F2F2] px-8 py-3 font-bold uppercase text-sm hover:bg-[#C62828]/80 transition-all text-center"
            >
              Voltar ao Início
            </a>
          </motion.div>
        </div>
      </div>

    </div>
  );
}


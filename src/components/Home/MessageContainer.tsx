"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface PersonSlide {
  photo: string;
  text: string;
  videos: { url: string; bgVideo: string }[];
}

const slides: PersonSlide[] = [
  {
    photo: "/photos/talles-magno/talles-magno.png",
    videos: [{ url: "#", bgVideo: "/videos/kaio-magno.mp4" }],
    text: "hero.headline",
  },
  {
    photo: "/photos/talles-magno/talles-magno.png",
    videos: [{ url: "#", bgVideo: "/videos/ld-junior/ld-junior-02.mp4" }],
    text: "hero.headline-02",
  },
];

export default function MessageContainer() {
  const { t } = useTranslation();


  return (
    <div id='servicos' className="relative w-full min-h-[480px] h-full flex flex-col overflow-hidden px-4 py-8 justify-between items-center">

       <div className="relative flex-1 w-full h-full flex flex-col sm:flex-row gap-8 justify-center items-end sm:items-start px-4 py-8 sm:max-w-2xl">   
        <div className="flex flex-col gap-8">
              <motion.div
                className={`flex-1 flex flex-col items-end justify-end w-full text-right gap-4`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                  <h1 className="text-4xl md:text-3xl font-bold text-[#F2F2F2] tracking-wide">
                    {t('bio.title')}
                  </h1>
                    
              </motion.div>
              <div className="flex flex-row justify-end items-end w-full relative">
              <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full max-w-64 h-[3px] bg-[#C62828] origin-right"
                    />
                    </div>

</div>

              <div className="flex-1 flex flex-col items-start text-start justify-center gap-8">
                  {Object.keys(t("bio", { returnObjects: true }))
                  .filter((key) => key.startsWith("text_")) 
                  .map((key, i) => (
                    <motion.p
                      key={i}
                      className="text-[#F2F2F2]/80 text-md sm:text-base leading-relaxed tracking-tight "
                        initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {t(`bio.${key}`)}
                    </motion.p>
                  ))}
              </div>
      </div>
    </div>
  );
}

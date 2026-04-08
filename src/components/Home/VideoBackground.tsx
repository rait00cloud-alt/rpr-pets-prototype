import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

const DESKTOP_VIDEO = "/videos/desktop.mp4";
const MOBILE_VIDEO = "/videos/desktop.mp4"; 

const TITLE = "O melhor cuidado para o seu pet";
const WORDS = TITLE.split(" ");

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showWords, setShowWords] = useState<string[]>([]);
  const [showLine, setShowLine] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    WORDS.forEach((word, i) => {
      setTimeout(() => setShowWords((prev) => [...prev, word]), 80 * i);
    });
    const base = WORDS.length * 80;
    setTimeout(() => setShowLine(true), base + 200);
    setTimeout(() => setShowCTA(true), base + 500);
  }, []);

  return (
    <section className="relative w-full flex flex-col">

      {/* Patas decorativas sobre o vídeo */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <PawPrint size={36} strokeWidth={1.2} className="text-white/20 rotate-[-15deg]" />
      </div>
      <div className="absolute top-12 left-16 z-10 pointer-events-none">
        <PawPrint size={22} strokeWidth={1.2} className="text-white/12 rotate-[10deg]" />
      </div>
      <div className="absolute top-6 right-8 z-10 pointer-events-none">
        <PawPrint size={28} strokeWidth={1.2} className="text-white/15 rotate-[20deg]" />
      </div>
      <div className="absolute top-14 right-20 z-10 pointer-events-none">
        <PawPrint size={18} strokeWidth={1.2} className="text-white/10 rotate-[-8deg]" />
      </div>

      {/* Vídeo */}
      <motion.div
        initial={{ filter: "blur(12px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="relative overflow-hidden h-[380px] md:h-[680px]"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
        />
        {/* Gradiente inferior para transição suave */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#f2f0f1] to-transparent" />
      </motion.div>

      {/* Texto + CTA */}
      <div className="bg-[#f2f0f1] text-[#1a1a1a] px-6 py-10 flex flex-col gap-5 sm:px-62">

        <h1 className="font-black text-2xl md:text-3xl tracking-tight leading-snug min-h-[2.5rem]">
          {showWords.join(" ")}
          <span className="animate-pulse"></span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={showLine ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-80 sm:w-148 h-[3px] bg-[#80ccfe] origin-left"
        />

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={showCTA ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <a
            href="#contato"
            className="bg-[#80ccfe] hover:bg-[#6bb8e8] text-white font-black px-7 py-3 rounded-xl transition-colors text-sm uppercase tracking-wide"
          >
            Agendar agora
          </a>
          <a
            href="#servicos"
            className="flex items-center gap-1 text-sm font-bold text-[#1a1a1a]/60 hover:text-[#80ccfe] transition-colors uppercase tracking-wide"
          >
            Ver serviços <span>→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}


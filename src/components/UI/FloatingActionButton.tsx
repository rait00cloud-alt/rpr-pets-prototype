import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WA_NUMBER = '5511939627519'; // substituir pelo número real
const WA_MSG = encodeURIComponent('Ola! Vim pelo site da RPR Pet. Gostaria de saber mais sobre os servicos.');

const FloatingActionButton = () => {
  const [bubble, setBubble] = useState(true);

  return (
    <motion.div
      className="fixed bottom-8 right-6 z-[9999] flex flex-col items-end gap-2"
      animate={{ scale: [0.98, 1.01, 0.98] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white text-[#1a1a1a] px-4 py-3 rounded-xl shadow-lg text-xs font-semibold max-w-[140px] leading-snug"
          >
            Fale conosco pelo WhatsApp!
            <button
              onClick={() => setBubble(false)}
              className="absolute -top-1.5 -right-1.5 bg-gray-200 rounded-full w-4 h-4 text-[10px] flex items-center justify-center leading-none"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.88 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-white"
        aria-label="WhatsApp"
      >
        <img src="/logos/rpr-pets-logo.png" alt="RPR Pet" className="w-10 h-10 object-contain" />
      </motion.a>
    </motion.div>
  );
};

export default FloatingActionButton;


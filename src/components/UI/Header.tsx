import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const HeaderComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const barColor = scrolled ? 'bg-[#1a1a1a]' : 'bg-white';
  const linkColor = scrolled ? 'text-[#1a1a1a]' : 'text-white';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="w-full px-6 py-4 flex items-center justify-between sm:px-62">

          {/* Mobile: hamburger esquerda */}
          <button
            className="sm:hidden flex flex-col gap-[5px] flex-shrink-0"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <span className={`block w-6 h-[2px] transition-all ${barColor}`} />
            <span className={`block w-6 h-[2px] transition-all ${barColor}`} />
            <span className={`block w-4 h-[2px] transition-all ${barColor}`} />
          </button>

          {/* Desktop: nav links esquerda */}
          <div className="hidden sm:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-[#fe7320] ${linkColor}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Logo — direita sempre */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/logos/rpr-pets-logo-02.png"
              alt="RPR Pet"
              className={`h-8 w-auto object-contain transition-all duration-300 ${
                scrolled ? '' : 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]'
              }`}
            />
          </a>
        </nav>
      </motion.header>

      {/* Sidebar — mobile only */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 z-[998]"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-[999] flex flex-col border-r-4 border-[#fe7320]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <img src="/logos/rpr-pets-logo-02.png" alt="RPR Pet" className="h-8 object-contain" />
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#1a1a1a] text-xl font-bold leading-none"
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                    className="text-[#1a1a1a] font-bold uppercase tracking-wide text-sm py-3 border-b border-gray-100 hover:text-[#fe7320] transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="px-6 pb-8">
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-[#fe7320] hover:bg-[#e5661a] text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition-colors"
                >
                  Agendar agora
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;

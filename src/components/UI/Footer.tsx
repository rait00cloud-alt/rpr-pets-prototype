const FooterComponent = () => (
  <footer className="bg-[#1a1a1a] text-white pt-12 pb-8 px-6">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-8 pb-8 border-b border-white/10">
      
      <nav className="flex flex-wrap gap-6">
        {[
          { label: 'Serviços', href: '#servicos' },
          { label: 'Sobre nós', href: '#sobre' },
          { label: 'Contato', href: '#contato' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-xs font-bold uppercase tracking-wide text-white/50 hover:text-[#80ccfe] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    
       <p className="text-xs text-white/30 ">
        Av. Beira Rio, 65a - Boa Vista, Piracaia - SP, 12970-000
      </p>
    </div>
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 pt-6">
        
      <p className="text-xs text-white/30 ">
        © {new Date().getFullYear()} RPR Pet — Todos os direitos reservados
      </p>
      <a
        href="https://industriebrasil.com.br"
        className="text-xs text-white/30 hover:text-white/60 transition-colors"
      >
        Produzido por Industrie Brasil
      </a>
    </div>
  </footer>
);

export default FooterComponent;



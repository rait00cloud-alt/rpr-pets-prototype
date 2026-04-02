import { useState, useEffect } from 'react';
import { Droplets, Sun, Moon, PawPrint, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = '5511939627519';

type Field = { name: string; label: string; type?: string; required?: boolean };

type Service = {
  icon: React.ReactNode;
  title: string;
  photo: string;
  overlayPhoto: string;
  desc: string;
  info: string;
  labelBg: string;
  fields: Field[];
};

const services: Service[] = [
  {
    icon: <Droplets size={24} strokeWidth={1.5} className="text-white" />,
    title: 'Banho e Tosa',
    photo: '/photos/shower.jpg',
    overlayPhoto: '/photos/servicos/tosa.jpg',
    desc: 'Banho de ozônio com tecnologia que elimina bactérias e fungos, deixando o pelo brilhante e saudável. Tosa profissional para todas as raças e portes.',
    info: 'Valor varia conforme o porte e tipo de pelagem do seu pet.',
    labelBg: 'bg-[#fe7320]',
    fields: [
      { name: 'name',      label: 'Seu nome',        required: true },
      { name: 'breed',   label: 'Raça do pet',                       required: true },
      { name: 'size',    label: 'Porte (P / M / G)',          required: true },
      { name: 'coat',    label: 'Pelagem (curta/longa/dupla)' },
    ],
  },
  {
    icon: <Sun size={24} strokeWidth={1.5} className="text-white" />,
    title: 'Creche',
    photo: '/photos/outside.jpg',
    overlayPhoto: '/photos/servicos/canil.jpg',
    desc: 'Seu pet em ótimas mãos durante o dia, com atividades supervisionadas, socialização e muito carinho. Ambiente seguro e estimulante.',
    info: 'Pacotes fechados por quantidade de dias. Consulte disponibilidade.',
    labelBg: 'bg-[#55a2d8]',
    fields: [
      { name: 'name',      label: 'Seu nome',        required: true },
      
      { name: 'breed',     label: 'Raça do pet',    required: true },
      { name: 'startDate', label: 'Data de início',  type: 'date', required: true },
      { name: 'endDate',   label: 'Data de término', type: 'date', required: true },
    ],
  },
  {
    icon: <Moon size={24} strokeWidth={1.5} className="text-white" />,
    title: 'Hotel',
    photo: '/photos/hotel.jpg',
    overlayPhoto: '/photos/servicos/hotel.jpg',
    desc: 'Hospedagem confortável e segura para quando você precisar viajar. Rotina estruturada com alimentação, passeios e atenção individualizada.',
    info: 'R$ 120,00 por diária. Reservas sujeitas à disponibilidade.',
    labelBg: 'bg-[#f2f0f1]',
    fields: [
      { name: 'name',     label: 'Seu nome',       required: true },
   
      { name: 'breed',    label: 'Raça do pet',   required: true },
      { name: 'checkIn',  label: 'Check-in',       type: 'date', required: true },
      { name: 'checkOut', label: 'Check-out',      type: 'date', required: true },
    ],
  },
];

const inputClass =
  'border-2 border-white bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-sm text-white  focus:outline-none focus:border-[#fe7320] transition-colors w-full';

function ServiceOverlay({ service, onClose }: { service: Service; onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(service.fields.map((f) => [f.name, '']))
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = service.fields
      .filter((f) => form[f.name])
      .map((f) => `${f.label}: ${form[f.name]}`);
    const text = encodeURIComponent(
      `Ola! Vim pelo site da RPR Pet!\nServico: ${service.title}\n${lines.join('\n')}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
    onClose();
  };

  const pairs: Field[][] = [];
  for (let i = 0; i < service.fields.length; i += 2) {
    pairs.push(service.fields.slice(i, i + 2));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-lg rounded-lg overflow-y-auto max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Foto topo */}
        <div className="relative h-52 flex-shrink-0">
          <img src={service.overlayPhoto} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-black text-white">{service.title}</h2>
          </div>
        </div>

        {/* Corpo */}
        <div className="bg-[#fe7320] px-6 py-6 flex flex-col gap-4">
          <p className="text-white text-md tracking-tight leading-relaxed">{service.desc}</p>
          <span className="inline-block bg-[#55a2d8]  text-white text-sm font-bold px-3 py-1 rounded-lg w-fit">
            {service.info}
          </span>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-1">
            {pairs.map((pair, i) => (
              <div key={i} className={`grid gap-3 text-white ${pair.length === 2 ? 'grid-cols-1' : 'grid-cols-1'}`}>
                {pair.map((f) => (
                  <input
                    key={f.name}
                    name={f.name}
                    type={f.type ?? 'text'}
                    required={f.required}
                    placeholder={f.label}
                    value={form[f.name]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                ))}
              </div>
            ))}
            <button
              type="submit"
              className="mt-2 bg-[#55a2d8] hover:bg-[#e5661a] text-white font-black py-4 rounded-xl transition-colors text-sm uppercase tracking-wide"
            >
              Enviar pelo WhatsApp →
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

const Paw = ({ className = '' }: { className?: string }) => (
  <PawPrint strokeWidth={1.2} className={className} />
);

export default function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <section id="servicos" className="relative py-16 px-6 bg-[#f2f0f1] overflow-hidden">
        <Paw className="absolute top-6 left-6 w-10 h-10 text-[#fe7320]/15 rotate-[-20deg]" />
        <Paw className="absolute top-10 left-20 w-6 h-6 text-[#fe7320]/10 rotate-[10deg]" />
        <Paw className="absolute bottom-8 right-8 w-10 h-10 text-[#55a2d8]/15 rotate-[25deg]" />
        <Paw className="absolute bottom-16 right-24 w-6 h-6 text-[#55a2d8]/10 rotate-[-10deg]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-[#fe7320] font-black uppercase tracking-widest text-xs text-center mb-2">
            O que fazemos
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] text-center mb-14">
            Nossos Serviços
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                onClick={() => setSelected(s)}
                className="relative rounded-2xl overflow-hidden shadow-sm h-80 cursor-pointer group"
              >
                <img
                  src={s.photo}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Ícone — topo esquerdo */}
                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-md p-2">
                  {s.icon}
                </div>

                {/* Veja mais — topo direito */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-md px-3 py-2">
                  <span className="text-white text-xs font-bold uppercase tracking-wide">Veja mais</span>
                  <ArrowRight size={14} className="text-white" />
                </div>

                {/* Título — inferior direito com cor por serviço */}
                <div className={`absolute bottom-4 right-4 ${s.labelBg} rounded-md px-4 py-2`}>
                  <h3 className={`font-black text-base tracking-wide ${s.labelBg === 'bg-[#f2f0f1]' ? 'text-[#1a1a1a]' : 'text-white'}`}>
                    {s.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

       
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ServiceOverlay service={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

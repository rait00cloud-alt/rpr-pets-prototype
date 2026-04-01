import { Droplets, Heart, PawPrint } from 'lucide-react';

const articles = [
  {
    icon: <Droplets size={20} strokeWidth={1.5} className="text-white" />,
    category: 'Banho & Tosa',
    bg: 'bg-[#fe7320]',
    tagBg: 'bg-[#fe7320]/10',
    tagColor: 'text-[#fe7320]',
    tag: 'Saúde do pelo',
    title: 'Por que o banho de ozônio é melhor para o seu pet?',
    body: [
      'O banho de ozônio vai muito além da limpeza convencional. O ozônio (O₃) é um agente oxidante natural que elimina até 99% das bactérias, fungos e ácaros presentes no pelo e na pele do animal — sem usar produtos químicos agressivos.',
      'Pets com dermatites, alergias ou odores persistentes se beneficiam especialmente desse tratamento. O resultado é um pelo mais brilhante, pele hidratada e um pet muito mais confortável.',
    ],
  },
  {
    icon: <Heart size={20} strokeWidth={1.5} className="text-white" />,
    category: 'Creche & Hotel',
    bg: 'bg-[#55a2d8]',
    tagBg: 'bg-[#55a2d8]/10',
    tagColor: 'text-[#55a2d8]',
    tag: 'Bem-estar animal',
    title: 'Socialização e rotina: o segredo de um pet feliz e equilibrado',
    body: [
      'Cães que frequentam creche regularmente desenvolvem melhor comportamento social, reduzem a ansiedade de separação e chegam em casa mais tranquilos.',
      'No hotel, a rotina estruturada — com horários de alimentação, passeios e descanso — garante que seu pet não sinta tanto a sua falta durante as viagens.',
    ],
  },
];

const Paw = ({ className = '' }: { className?: string }) => (
  <PawPrint strokeWidth={1.2} className={className} />
);

export default function NewsSection() {
  return (
    <section id="noticias" className="relative py-24 px-6 bg-white overflow-hidden">

      {/* Patas decorativas */}
      <Paw className="absolute top-8 right-10 w-10 h-10 text-[#fe7320]/12 rotate-[15deg]" />
      <Paw className="absolute top-16 right-24 w-6 h-6 text-[#fe7320]/8 rotate-[-5deg]" />
      <Paw className="absolute bottom-10 left-8 w-10 h-10 text-[#55a2d8]/12 rotate-[-20deg]" />
      <Paw className="absolute bottom-20 left-20 w-5 h-5 text-[#55a2d8]/8 rotate-[10deg]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="text-[#fe7320] font-black uppercase tracking-widest text-xs text-center mb-2">
          Dicas & Cuidados
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] text-center mb-14">
          Novidades RPR Pet
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {articles.map((a) => (
            <article key={a.title} className="bg-[#f2f0f1] rounded-2xl overflow-hidden flex flex-col">
              <div className={`${a.bg} px-8 py-6 flex items-center gap-3`}>
                {a.icon}
                <span className="text-white font-black text-xs uppercase tracking-widest">
                  {a.category}
                </span>
              </div>
              <div className="px-8 py-8 flex flex-col gap-4 flex-1">
                <h3 className="text-xl font-black text-[#1a1a1a] leading-snug">{a.title}</h3>
                {a.body.map((p, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">{p}</p>
                ))}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <span className={`inline-block ${a.tagBg} ${a.tagColor} font-bold text-xs px-3 py-1 rounded-full`}>
                    {a.tag}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

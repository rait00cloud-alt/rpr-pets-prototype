import { useState } from 'react';

const SERVICES = ['Banho e Tosa', 'Creche', 'Hotel'];
const WA_NUMBER = '5511939627519'; // substituir pelo número real

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Ola! Vim pelo site da RPR Pet!\nNome: ${form.name}\nTelefone: ${form.phone}\nServico: ${form.service}\nMensagem: ${form.message}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-black text-[#fe7320]">Mensagem enviada!</p>
        <p className="text-gray-500 mt-2 ">Em breve entraremos em contato.</p>
      </div>
    );
  }

  const inputClass =
    'border-2 border-gray-200 rounded-md px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#fe7320] transition-colors bg-white';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      <input name="name" required placeholder="Seu nome" value={form.name} onChange={handleChange} className={inputClass} />
      <input name="phone" required placeholder="WhatsApp (com DDD)" value={form.phone} onChange={handleChange} className={inputClass} />
      <select name="service" required value={form.service} onChange={handleChange} className={`${inputClass} text-gray-500`}>
        <option value="">Selecione o serviço</option>
        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea
        name="message"
        placeholder="Conte um pouco sobre seu pet (raça, porte...)"
        value={form.message}
        onChange={handleChange}
        rows={3}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="bg-[#fe7320] hover:bg-[#e5661a] text-white font-black py-4 rounded-xl transition-colors text-sm uppercase tracking-wide"
      >
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}


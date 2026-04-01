"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form data:", formData);
    
    setSubmitStatus("success");
    
    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "" });
      setSubmitStatus("idle");
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitStatus === "success") {
    return (
      <div className="w-full max-w-xs bg-[#0F0F0F]/80 p-8 rounded-lg border border-[#C4A574] flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-14 h-14 rounded-full border-2 border-[#C62828] flex items-center justify-center"
        >
          <Check className="w-7 h-7 text-[#C62828]" />
        </motion.div>
        <p className="text-[#F2F2F2] text-xl font-bold text-center">
          Mensagem enviada com sucesso!
        </p>
        <p className="text-[#F2F2F2]/70 text-sm text-center max-w-xs">
          Entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-[#0F0F0F]/80 p-8 rounded-lg border border-[#C4A574]">
      <div className="flex justify-center items-center w-full mb-6">
        <img
          className="max-w-24"
          src="/logos/belic-01.png"
          alt="Bellic World Logo"
        />
      </div>

      <h1 className="text-[#F2F2F2] text-2xl font-bold text-center mb-8">
        Entre em Contato
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#F2F2F2]">
            Nome Completo
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-transparent border border-[#C4A574] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#C62828] transition-colors"
            placeholder="Seu nome"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#F2F2F2]">
            Telefone / WhatsApp
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-transparent border border-[#C4A574] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#C62828] transition-colors"
            placeholder="(00) 00000-0000"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#F2F2F2]">
            E-mail
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-transparent border border-[#C4A574] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#C62828] transition-colors"
            placeholder="seu@email.com"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[#C62828] text-[#F2F2F2] px-8 py-3 font-bold uppercase text-sm hover:bg-[#C62828]/80 transition-all mt-4"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}


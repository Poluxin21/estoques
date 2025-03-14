"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 overflow-x-hidden">
      <section className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-60 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          className="container mx-auto text-center relative z-10 px-4"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            A Solução Definitiva para a Gestão de Estoque
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Organize, controle e otimize seus produtos com a nossa plataforma inteligente de estoque.
          </p>
          <Link href="/auth/login">
            <button className="bg-white hover:bg-indigo-200 text-indigo-800 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300">
              Acesse sua Conta
            </button>
          </Link>
        </motion.div>
      </section>

      <section className="py-36 bg-white min-h-screen flex items-center">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">Recursos Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
            <motion.div
              className="bg-gray-100 p-12 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Gestão de Produtos</h3>
              <p className="text-lg text-gray-600">
                Controle detalhado de cada produto, incluindo categorias, localização e histórico de movimentações.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-100 p-12 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Análises e Relatórios</h3>
              <p className="text-lg text-gray-600">
                Relatórios completos sobre vendas, estoque, previsões e mais, tudo ao seu alcance.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-100 p-12 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Controle de Entradas e Saídas</h3>
              <p className="text-lg text-gray-600">
                Registre e acompanhe todas as movimentações do estoque de forma eficiente e detalhada.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-36 bg-indigo-50 min-h-screen flex items-center">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Sobre o Criador</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-12">
            Eu sou Guilherme Bento, criador e desenvolvedor desta plataforma de gestão de estoque. Com a missão de oferecer uma solução eficiente e intuitiva para o controle de produtos em empresas de todos os tamanhos.
          </p>
          <Link href="/auth/login">
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300">
              Acesse sua Conta
            </button>
          </Link>
        </motion.div>
      </section>
      <section className="bg-gradient-to-l from-indigo-600 to-indigo-800 text-white py-60 min-h-screen flex items-center">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">Transforme a Gestão de Estoque da Sua Empresa</h2>
          <p className="text-lg md:text-xl mb-12">
            Experimente nossa plataforma e veja como podemos ajudar sua empresa a crescer com uma gestão de estoque mais eficiente e precisa.
          </p>
          <Link href="/auth/login">
            <button className="bg-white hover:bg-indigo-200 text-indigo-800 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300">
              Acesse sua Conta
            </button>
          </Link>
        </motion.div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Guilherme Bento. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

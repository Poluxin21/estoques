"use client";

import { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
  loading?: boolean;
}

export default function StatsCards() {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    products: { count: 0, change: 0 },
    lowStock: { count: 0, change: 0 },
    inflow: { value: 0, change: 0 },
    outflow: { value: 0, change: 0 },
  });

  useEffect(() => {
    // Simula uma chamada de API
    const fetchStats = async () => {
      try {
        const response = await fetch('https://api.atlas.estoques.dev/api/v1/gerenciamento');
        const data = await response.json();
        
        // Aqui você ajusta os dados conforme o formato da resposta da API
        const products = data.products || { count: 0, change: 0 };
        const lowStock = data.lowStock || { count: 0, change: 0 };
        const inflow = data.inflow || { value: 0, change: 0 };
        const outflow = data.outflow || { value: 0, change: 0 };
        
        setStats({
          products,
          lowStock,
          inflow,
          outflow,
        });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total de Produtos"
        value={stats.products.count.toString()}
        change={stats.products.change}
        icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        loading={loading}
      />
      <StatCard
        title="Produtos com Estoque Baixo"
        value={stats.lowStock.count.toString()}
        change={stats.lowStock.change}
        icon="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        loading={loading}
      />
      <StatCard
        title="Entradas (mês atual)"
        value={`R$ ${stats.inflow.value.toLocaleString('pt-BR')}`}
        change={stats.inflow.change}
        icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        loading={loading}
      />
      <StatCard
        title="Saídas (mês atual)"
        value={`R$ ${stats.outflow.value.toLocaleString('pt-BR')}`}
        change={stats.outflow.change}
        icon="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
        loading={loading}
      />
    </div>
  );
}

function StatCard({ title, value, change, icon, loading = false }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <p className="text-xl font-semibold text-gray-800 mt-1">{value}</p>
          )}
        </div>
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={icon}
            ></path>
          </svg>
        </div>
      </div>
      
      {!loading && (
        <div className="flex items-center mt-4">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              change >= 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <svg
              className={`-ml-0.5 mr-1 h-3 w-3 ${
                change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={change >= 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
              ></path>
            </svg>
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">Em relação ao mês anterior</span>
        </div>
      )}
    </div>
  );
}

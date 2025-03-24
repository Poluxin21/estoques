// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/SideBar';
import Header from '@/components/dashboard/Header';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Product, User } from '@/lib/types';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={session?.user as User} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Visão Geral</h1>
            
            <StatsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Produtos com Baixo Estoque</h2>
                <LowStockList />
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Atividades Recentes</h2>
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface LowStockItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
}

function LowStockList() {
  const [lowStock, setLowStock] = useState<LowStockItem[]>([
    { id: '1', name: 'Produto A', currentStock: 5, minStock: 10 },
    { id: '2', name: 'Produto B', currentStock: 3, minStock: 15 },
    { id: '3', name: 'Produto C', currentStock: 8, minStock: 20 },
    { id: '4', name: 'Produto D', currentStock: 2, minStock: 12 },
  ]);

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {lowStock.map((item) => (
          <li key={item.id} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">Mínimo: {item.minStock}</p>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-semibold ${item.currentStock < item.minStock / 2 ? 'text-red-600' : 'text-orange-500'}`}>
                {item.currentStock} unidades
              </span>
              <button className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm">
                Repor
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
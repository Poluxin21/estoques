"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { StockEntry, Supplier } from "@/lib/types"; // Importando os tipos
import { Product, User } from "@/lib/types"; // Supondo que você tenha esses tipos definidos

export default function StockEntriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  // Dados mockados de entrada de estoque
  const stockEntries: StockEntry[] = [
    {
      id: "1",
      productId: "prod-001",
      productName: "Produto A",
      quantity: 10,
      unitPrice: 20,
      supplierId: "sup-001",
      supplierName: "Fornecedor A",
      invoiceNumber: "INV123",
      notes: "Entrega programada",
      date: new Date(),
      createdBy: "admin",
    },
    // ...outros dados
  ];

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
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Entradas de Estoque</h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200 text-black">
              <table className="min-w-full table-auto">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Produto</th>
                    <th className="px-4 py-2">Quantidade</th>
                    <th className="px-4 py-2">Preço Unitário</th>
                    <th className="px-4 py-2">Fornecedor</th>
                    <th className="px-4 py-2">Data</th>
                    <th className="px-4 py-2">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {stockEntries.map((entry) => (
                    <tr key={entry.id} className="border-t">
                      <td className="px-4 py-2">{entry.productName}</td>
                      <td className="px-4 py-2">{entry.quantity}</td>
                      <td className="px-4 py-2">R$ {entry.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-2">{entry.supplierName || "Não informado"}</td>
                      <td className="px-4 py-2">{entry.date.toLocaleDateString()}</td>
                      <td className="px-4 py-2">{entry.notes || "Nenhuma nota"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

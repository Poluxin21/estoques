"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { Supplier } from "@/lib/types"; // Tipo de Fornecedor
import { User } from "@/lib/types"; // Tipo de Usuário

export default function SuppliersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
      // Aqui você pode fazer a requisição para pegar os fornecedores da API
      setSuppliers([
        {
          id: "1",
          name: "Fornecedor A",
          contactName: "Carlos Silva",
          email: "carlos@fornecedora.com",
          phone: "(11) 98765-4321",
          address: "Rua X, 123",
          cnpj: "12.345.678/0001-90",
          notes: "Entrega sempre pontual",
        },
        // Adicionar outros fornecedores aqui
      ]);
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
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Fornecedores</h1>

            <div className="mb-4">
              <button
                onClick={() => router.push("fornecedores/create")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Adicionar Fornecedor
              </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full table-auto">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Contato</th>
                    <th className="px-4 py-2">E-mail</th>
                    <th className="px-4 py-2">Telefone</th>
                    <th className="px-4 py-2">CNPJ</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-t">
                      <td className="px-4 py-2">{supplier.name}</td>
                      <td className="px-4 py-2">{supplier.contactName || "Não informado"}</td>
                      <td className="px-4 py-2">{supplier.email || "Não informado"}</td>
                      <td className="px-4 py-2">{supplier.phone || "Não informado"}</td>
                      <td className="px-4 py-2">{supplier.cnpj || "Não informado"}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => router.push(`/suppliers/edit/${supplier.id}`)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          Editar
                        </button>
                      </td>
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

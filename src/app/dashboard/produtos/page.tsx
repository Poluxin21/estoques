"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { Product, User } from "@/lib/types";
import Popup from "@/components/dashboard/Popup";

export default function Produtos() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  useEffect(() => {
    setProdutos([
      {
        id: "1",
        name: "Produto A",
        sku: "A001",
        description: "Descrição do Produto A",
        price: 100,
        currentStock: 50,
        minStock: 10,
        category: "Categoria A",
        unit: "unidade",
        location: "Armazém 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Produto B",
        sku: "B002",
        description: "Descrição do Produto B",
        price: 200,
        currentStock: 30,
        minStock: 15,
        category: "Categoria B",
        unit: "unidade",
        location: "Armazém 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Produto C",
        sku: "C003",
        description: "Descrição do Produto C",
        price: 150,
        currentStock: 20,
        minStock: 5,
        category: "Categoria C",
        unit: "unidade",
        location: "Armazém 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, []);

  const handleAddProduct = () => {
    console.log("Produto adicionado!");
    setIsModalOpen(false);
  };

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
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Produtos</h1>
            
            <div className="mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Adicionar Produto
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800">{produto.name}</h2>
                    <p className="text-sm text-gray-500">SKU: {produto.sku}</p>
                    {produto.description && <p className="text-xs text-gray-500 mt-2">{produto.description}</p>}
                    {produto.category && <p className="text-xs text-gray-500 mt-1">Categoria: {produto.category}</p>}
                    {produto.location && <p className="text-xs text-gray-500 mt-1">Localização: {produto.location}</p>}
                    <div className="mt-4">
                      <p className="text-lg font-semibold text-gray-700">Preço: R${produto.price}</p>
                      <p className="text-sm text-gray-600">Estoque Atual: {produto.currentStock}</p>
                      <p className="text-sm text-gray-600">Mínimo: {produto.minStock}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Produto</h2>
      <form onSubmit={handleAddProduct}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="number"
            id="price"
            name="price"
            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Adicionar
          </button>
        </div>
      </form>
    </Popup>
    </div>
  );
}

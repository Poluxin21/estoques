"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { User } from "@/lib/types";

export default function Configuracoes() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  const user = session?.user as User;

  const [newName, setNewName] = useState(user?.name || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");

  const handleSaveChanges = async () => {
    console.log("Configurações atualizadas", { newName, newEmail });
    alert("Configurações atualizadas com sucesso!");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-black">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Configurações</h1>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Nome:</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">E-mail:</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

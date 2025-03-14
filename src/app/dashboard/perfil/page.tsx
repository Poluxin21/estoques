// pages/perfil.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { User } from "@/lib/types";

export default function Perfil() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Verifica se o usuário está autenticado
  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null; // Redireciona para a página de login se o usuário não estiver autenticado
  }

  // Dados do usuário autenticado
  const user = session?.user as User;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Perfil</h1>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Nome:</label>
                  <p className="text-lg text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">E-mail:</label>
                  <p className="text-lg text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Função:</label>
                  <p className="text-lg text-gray-900">{user?.role || "Usuário"}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Data de criação:</label>
                  <p className="text-lg text-gray-900">{new Date(user?.id).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

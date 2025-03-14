// app/layout.tsx
"use client"; // Certifique-se de que o código é executado no lado do cliente

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // Importe seus estilos globais

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Envolvendo a aplicação inteira com o SessionProvider */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

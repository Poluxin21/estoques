import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Usuário de teste para simular a autenticação
        const testUser = {
          id: "1", // Adicionando o campo id
          email: "a@gmail.com",
          password: "123",
          name: "Test User",
          role: "admin"
        };

        // Verifique se as credenciais fornecidas correspondem ao usuário de teste
        if (credentials?.email === testUser.email && credentials?.password === testUser.password) {
          return testUser; // Retorna o usuário simulado com o campo id
        }

        // Se não coincidir, retorna null
        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         try {
//           const res = await fetch("https://api.atlas.estoques.dev/api/v2/token", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ 
//               email: credentials.email, 
//               password: credentials.password 
//             })
//           });
          
//           const user = await res.json();
          
//           if (res.ok && user) {
//             return user;
//           }
//           return null;
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: "/auth/login"
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, token }: { session: any; token: any }) {
//       session.user = token.user;
//       return session;
//     },
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     }
//   }
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
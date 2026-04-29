import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface AuthUser extends User {
  id: string;
  role: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        if (!credentials) return null;

        const res = await fetch(
          `${process.env.API}/Auth/login`, // 🔥 صححي هنا
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const payload = await res.json();

        console.log("LOGIN RESPONSE:", payload);

        // 🔥 أهم تعديل هنا
        if (!res.ok || !payload.token) {
          return null;
        }

        return {
          id: payload.id || "",
          name: payload.displayName || "",
          email: payload.email || "",
          role: payload.role || "user",
          image: payload.image || "",
          token: payload.token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.role = u.role;
        token.token = u.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
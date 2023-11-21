import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password", placeholder: "Your Password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;
        try {
          // Attempt to convert the id to a string
          const idAsString = user.id.toString();
          
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          // Ensure the returned user's id is a string
          return passwordMatch ? { ...user, id: idAsString } : null;
        } catch (error) {
          console.error('Error converting id to string:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    newUser: '/auth/'
  }
};

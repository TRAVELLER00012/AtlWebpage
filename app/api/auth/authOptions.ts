import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            _credentials: {
                email: { label: "Email", type: "email", placeholder: "Your Email" },
                password: { label: "Password", type: "password", placeholder: "Your Password" },
            },
            get credentials() {
                return this._credentials;
            },
            set credentials(value) {
                this._credentials = value;
            },
            async authorize(credentials,req) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findFirst({where: {
                    email: credentials.email,
                    firstName: credentials.firstName,
                    lastName: credentials.lasttName,
                    
                }})
                
                if (!user) return null;
                const passwordMatch = await bcrypt.compare(credentials.password,user.password)
                
                return passwordMatch ? user : null;
            }
        })
    ],
    session: {
      strategy: "jwt",
    },  
    pages: {
        // newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
}


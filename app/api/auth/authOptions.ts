import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials : {
                firstName : {label: "User First Name",type:"text",placeholder: "Your First Name"},
                lasttName : {label: "User Last Name",type:"text",placeholder: "Your Last Name"},
                email : {label: "Email",type:"email",placeholder: "Your Email"},
                password : {label: "Password",type:"password",placeholder: "Your Password"},
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
}

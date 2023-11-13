import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import type { NextAuthOptions } from "next-auth";
// import { users } from "@/helpers/constants"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log("AUTORIZE CREDENTIALS", credentials);

        if (!credentials?.email || !credentials.password) {
          throw new Error('email and password required')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user) {
          throw new Error('User not found')
        } else {
          const isPasswordValid = await compare(credentials.password, user?.password as string);
          if (!isPasswordValid) {
            throw new Error('Invalid password')
          };
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  },
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
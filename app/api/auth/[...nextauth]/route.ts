import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import type { NextAuthOptions } from "next-auth";

const prisma:any = new PrismaClient()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
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
        console.log("user", user);
        return {
          id: user.id + '',
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url,baseUrl);
      return `${baseUrl}/dashboard`;
    },
  },
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
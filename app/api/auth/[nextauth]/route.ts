import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient()

// export default NextAuth({
//   providers: [
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // }),

//     CredentialsProvider({
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'hello@example.com'
//         },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error('email and password required')
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         });
//         if (!user) {
//           throw new Error('User not found')
//         } else {

//           const isPasswordValid = await compare(credentials.password, user?.password as string);
//           if (!isPasswordValid) {
//             throw new Error('Invalid password')
//           };
//         }

//         return {
//           id: user.id + '',
//           email: user.email,
//           name: user.name
//         };
//       }
//     })
//   ],
//   adapter: PrismaAdapter(prisma),
// })


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
              email: {
                label: 'Email',
                type: 'email',
                placeholder: 'hello@example.com'
              },
              password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials,req) {
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
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
      session({ session, token, user }) {
        return session
      },
    },
    pages: {
      signIn: "/auth",
    },
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
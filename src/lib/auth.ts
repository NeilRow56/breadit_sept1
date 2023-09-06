import bcryptjs from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // email: { label: 'email', type: 'text' },
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        // if (!credentials?.email || !credentials?.password) {
        //   // throw new Error('Invalid credentials')
        //   return null
        // }
        // const existingUser = await db.user.findUnique({
        //   where: {
        //     email: credentials?.email,
        //   },
        // })
        if (!credentials?.username || !credentials?.password) {
          // throw new Error('Invalid credentials')
          return null
        }
        const existingUser = await db.user.findUnique({
          where: {
            username: credentials?.username,
          },
        })
        if (!existingUser || !existingUser?.hashedPassword) {
          // throw new Error('Invalid credentials')
          return null
        }
        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          existingUser.hashedPassword
        )
        if (!isCorrectPassword) {
          // throw new Error('Invalid credentials')
          return null
        }
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/sign-in',
  },

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.username,
        email: dbUser.email,
        picture: dbUser.image,
        // username: dbUser.username,
      }
    },
    // redirect() {
    //   return '/'
    // },
  },

  debug: process.env.NODE_ENV === 'development',

  secret: process.env.NEXTAUTH_SECRET,
}

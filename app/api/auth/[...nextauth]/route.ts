import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// This would typically be stored in a database
const authorizedUsers = [
  {
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    // In a real app, you would hash passwords
    password: "admin123",
  },
  {
    email: "editor@example.com",
    name: "Editor User",
    role: "editor",
    password: "editor123",
  },
]

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "", 
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      }, 
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = authorizedUsers.find(
          (user) => user.email === credentials.email && user.password === credentials.password,
        )

        if (user) {
          return {
            id: user.email,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
})

export { handler as GET, handler as POST }

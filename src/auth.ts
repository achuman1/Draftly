import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { db } from "@/lib/firebaseAdmin"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter(db),
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    session({ session, user }) {
      session.user.id = user.id
      return session
    },

  },

})
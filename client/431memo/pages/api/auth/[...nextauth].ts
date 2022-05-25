import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    callbacks: {
      async jwt({ token, account, isNewUser }) {
        if (account) {
          token.accessToken = account.access_token
        }
        if (isNewUser) {
          //최초가입 시 서비스
        }
        return token
      },
      async session({ session, token, user }) {
        session.accessToken = token.accessToken
        return session
      }
    }
    
});
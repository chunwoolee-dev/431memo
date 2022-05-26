import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import axios from 'axios';

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
        return token
      },
      async session({ session, token, user }) {
        const {accessToken, email} = token;
        const body = {
          email : email,
          authCode : accessToken
        }
        // const res = await axios({
        //   url : 'https://localhost:8080/login',
        //   method : 'post',
        //   data : body
        // });
        session.accessToken = token.accessToken
        return session
      }
    }
    
});

//ya29.a0ARrdaM8sYk0FWHHkHYUYfMKAuJUx2vvT7xACuIo0W32e-EFGSP3FrZKpcKgq7oJ3aK7yzVWx1Y_gp8ipBRD50geS1hnzYEM1VllFy8ioXoqTWIyeubtIC0cpt37ueKcf0vju-C-ZvEPkOFoYUAHDxISeuNBj
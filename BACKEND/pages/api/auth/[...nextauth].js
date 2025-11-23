

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
// import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongooseConnect();

        const user = await Profile.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }

        const validPassword = await bcrypt.compare(credentials.password, user.password);
        if (!validPassword) {
          throw new Error("Invalid password");
        }

        return { id: user._id, email: user.email };
      }
    })
  ],
  
  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token._id = user.id;
      return token;
    },

    async session({ session, token }) {
      if (token) session.user._id = token._id;
      return session;
    }
  }
});

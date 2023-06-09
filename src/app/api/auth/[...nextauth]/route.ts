import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import axios from "axios";
import prisma from "@/lib/prisma";

if (!process.env.GOOGLE_CLIENT_ID)
  throw new Error("GOOGLE_CLIENT_ID is not defined");
if (!process.env.GOOGLE_CLIENT_SECRET)
  throw new Error("GOOGLE_CLIENT_SECRET is not defined");
if (!process.env.NEXTAUTH_SECRET)
  throw new Error("NEXTAUTH_SECRET is not defined");
if (!process.env.NEXTAUTH_JWT_SECRET)
  throw new Error("NEXTAUTH_JWT_SECRET is not defined");

async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: `${process.env.GOOGLE_CLIENT_ID}`,
        client_secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await axios.post(url);
    const refreshedTokens = await response.data;

    if (response.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: `${process.env.NEXTAUTH_SECRET}`,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exmaple@gmail.com",
        },
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const userExists: any = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userExists) {
          throw new Error("Email not found");
        }

        const passwordMatch = await bcryptjs.compare(
          credentials.password,
          userExists.password
        );

        if (!passwordMatch) {
          throw new Error("Password is incorrect");
        }
        const user = {
          id: userExists.id,
          email: userExists.email,
          name: userExists.name,
          image: userExists.image,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.provider === "google") {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          provider: "google",
          user,
        };
      }

      if (account?.provider === "credentials" && user) {
        return {
          provider: "credentials",
          user,
        };
      }

      if (
        account?.provider === "google" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }
      if (account?.provider === "google") return refreshAccessToken(token);
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          email: token.user.email,
          name: token.user.name,
          image: token.user.image,
          provider: token.provider,
        };
      }
      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
    async signIn({ user, account }: any) {
      if (account?.provider === "credentials") {
        if (user) {
          return true;
        } else {
          return "/auth/signup";
        }
      } else {
        return true;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: `${process.env.NEXTAUTH_JWT_SECRET}`,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

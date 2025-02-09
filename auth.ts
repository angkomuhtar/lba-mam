import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { LoginFormSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // let user = null;

        // user = {
        //   id: 1,
        //   username: "admin",
        //   password: "password",
        // };

        // return user;

        let user = null;
        const { email, password } = await LoginFormSchema.parseAsync(
          credentials
        );
        user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                username: email,
              },
            ],
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user.password || !compareSync(password, user.password)) {
          throw new Error("Password does not match");
        }
        return user;
        // try {
        // } catch (error) {
        //   if (error instanceof ZodError) {
        //     throw new Error("Invalid credentials");
        //     return null;
        //   }
        // }
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      // const role = auth?.user.role || "user";
      // if (pathname.startsWith("/signin") && isLoggedIn) {
      //   return Response.redirect(new URL("/", nextUrl));
      // }

      // if (pathname.startsWith("/") && !isLoggedIn) {
      //   return Response.redirect(new URL("/signin", nextUrl));
      // }
      return !!auth;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          id: token?.id as string,
        },
        select: {
          id: true,
          email: true,
          username: true,
          roles: true,
          profile: true,
        },
      });
      session.user.id = token.id as string;
      session.user.name = user?.profile?.fullname;
      return session;
    },
  },
});

import {apiAuthPrefix} from "@/app/routes";
import {createImageUrl} from "@/lib/utils/utils";
import {DefaultSession, NextAuthConfig, User} from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      avatarPath?: string;
    } & User;
  }
}

// @ts-ignore
export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/login'
  },
  callbacks: {
    // @ts-ignore
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isAPI = nextUrl.pathname.startsWith(apiAuthPrefix);

      if (isAPI)
        return isLoggedIn;
      if (isLoggedIn && isOnLogin)
        return Response.redirect(new URL('/dashboard', nextUrl));
      return true;
    },
// @ts-ignore
    async jwt({token, session, user, trigger}) {
      if (trigger === 'update') {
        token.avatarPath = session.avatarPath;
        token.email = session.email;
        token.name = session.name;
      } else if (user) {
        // @ts-ignore
        token.avatarPath = user.avatarPath;
        token.id = user.id;
      }
      return token
    },
    // @ts-ignore
    async session({session, trigger, token}) {
      if (trigger === 'update') {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      session.user.id = token.sub;
      session.user.image = token.avatarPath ? createImageUrl(token.avatarPath) : undefined;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
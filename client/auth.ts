import NextAuth from 'next-auth';
import {authConfig} from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from "bcryptjs";
import {User} from "@/lib/types/definitions";
import {getUser} from "@/lib/actions/auth-actions";

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
  session: {strategy: "jwt"},
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({email: z.string().email(), password: z.string().min(6)})
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const {email, password} = parsedCredentials.data;
          const user: User | undefined = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }
        console.log('Invalid credentials');
        return null;
      },
    }),]
});
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { z } from "zod";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages:{
    signIn: "/entrar",
  },
  providers: [
    CredentialsProvider({
      name: "Entrar",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (data) => {
        const schema = z.object({
          email: z.string({
            invalid_type_error: "Email inválido",
            required_error: "O email é obrigatório",
          }).email({
            message: "Email inválido"
          }),
          password: z.string({
            invalid_type_error: "Senha inválida",
            required_error: "A senha é obrigatória",
          }).min(5, {
            message: "A senha tem que conter mais de 5 caracteres"
          })
        });
    
        const validation = schema.safeParse(data);
    
        if (!validation.success) {
          throw new Error(JSON.stringify({
            success: false,
            message: validation.error.errors[0].message,
          }));
        }
    
        const credentials = validation.data;

        let user: User | null = null;

        try {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
        } catch (error) {
          throw new Error(JSON.stringify({
            success: false,
            message: "Erro no servidor",
          }));
        }

        if (!user) {
          throw new Error(JSON.stringify({
            success: false,
            message: "E-mail não cadastrado",
          }));
        }

        let passwordComparision = false;

        try {
          passwordComparision = await compare(credentials.password, user.password)
        } catch (error) {
          throw new Error(JSON.stringify({
            success: false,
            message: "Erro no servidor",
          }));
        }

        if (!passwordComparision) {
          throw new Error(JSON.stringify({
            success: false,
            message: "Senha incorreta",
          }));
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user as any);

      return token;
    },
    session: async ({ session, token }) => {
        session.user = token.user;

        return session;
    }
  }
};
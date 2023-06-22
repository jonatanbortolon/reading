import { prisma } from "@/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const schema = z.object({
      name: z.string({
        invalid_type_error: "Nome inválido",
        required_error: "O nome é obrigatório",
      }),
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

    const validation = schema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error);
      
      return new NextResponse(
        JSON.stringify({
          success: false,
          payload: {
            message: validation.error.errors[0].message,
          },
        }),
        { status: 422 }
      );
    }
    
    const { name, email, password } = validation.data;
    
    console.log({ name, email, password });
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          payload: {
            message: "E-mail já cadastrado",
          },
        }),
        { status: 409 }
      );
    }

    const hashed_password = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        payload: {
          message: "Erro no servidor",
        },
      }),
      { status: 500 }
    );
  }
}

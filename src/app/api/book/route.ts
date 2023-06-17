import { authOptions } from "@/auth";
import { prisma } from "@/prisma";
import { parseISO } from "date-fns";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          payload: {
            message: "Não autorizado",
          },
        }),
        { status: 401 }
      );
    }

    const books = await prisma.book.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        authors: true,
        rating: true,
        startedAt: true,
        coverUrl: true,
      },
      orderBy: {
        startedAt: "desc"
      },
    });

    return NextResponse.json({
      success: true,
      payload: books,
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          payload: {
            message: "Não autorizado",
          },
        }),
        { status: 401 }
      );
    }

    const body = await req.json()

    const schema = z.object({
      authors: z.array(z.string(), {
        invalid_type_error: "Autor(es) inválido(s)",
        required_error: "É obrigatório o livro ter pelo menos 1 autor",
      }).min(1, {
        message: "O livro tem que ter pelo menos 1 autor"
      }),
      title: z.string({
        invalid_type_error: "Título inválido",
        required_error: "O título é obrigatório",
      }).nonempty({
        message: "O título é obrigatório",
      }),
      coverUrl: z.string({
        invalid_type_error: "Link da imagem inválido",
        required_error: "O link da imagem é obrigatório",
      }).nonempty({
        message: "O link da imagem é obrigatório",
      }).url({
        message: "Link da imagem inválido",
      }),
      rating: z.number({
        invalid_type_error: "Avaliação inválida",
        required_error: "A avaliação é obrigatória",
      }).int({
        message: "Avaliação inválida",
      }).min(0, {
        message: "Avaliação inválida",
      }).max(5, {
        message: "Avaliação inválida",
      }),
      pageCount: z.number({
        invalid_type_error: "Numero de páginas inválido",
        required_error: "O numero de páginas é obrigatório",
      }).int({
        message: "Numero de páginas inválido",
      }).min(1, {
        message: "Numero de páginas inválido",
      }),
      review: z.string({
        invalid_type_error: "Resenha inválida",
      }).optional().default(""),
      startedAt: z.string({
        invalid_type_error: "Data de começo da leitura inválida",
        required_error: "A data de começo da leitura é obrigatória",
      }).transform((value) => parseISO(value)),
      finishedAt: z.string({
        invalid_type_error: "Data de término da leitura inválida",
      }).transform((value) => !!value ? parseISO(value) : null).nullable().default(null),
    });

    const validation = schema.safeParse(body);

    if (!validation.success) {
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

    const { 
      coverUrl,
      title,
      authors,
      pageCount,
      rating,
      startedAt,
      finishedAt,
      review,
    } = validation.data;

    const newBook = await prisma.book.create({
      data: {
        userId: session.user.id,
        coverUrl,
        title,
        pageCount,
        rating,
        startedAt,
        finishedAt,
        review,
        authors,
      },
    });

    revalidateTag("books");

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
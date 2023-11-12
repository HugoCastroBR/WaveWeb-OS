import { PrismaClient,  } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: Request, context: { params: { id: number } }) {
  const data = await req.json();

  try {
    const image = await prisma.gallery.update({
      where: { id: +context.params.id },
      data
    });
    return NextResponse.json(image);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json({ error: error.message });
    } else {
      console.log(error);
      return NextResponse.json({ error: "Ocorreu um erro desconhecido." });
    }
  }
}

export async function DELETE(req: Request, context: { params: { id: number } }) {
  try {
    const image = await prisma.gallery.delete({
      where: { id: +context.params.id },
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

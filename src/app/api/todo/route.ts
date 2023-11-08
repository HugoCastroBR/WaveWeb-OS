import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response) {
  try {
    const todo = await prisma.todo.findMany()
    return NextResponse.json(todo)
  } catch (error) {
    return  NextResponse.json({error: error})
  }
}


export async function POST(req: Request, res: Response) {
  
  try {
    const data = await req.json();
    const todo = await prisma.todo.create({
      data
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}




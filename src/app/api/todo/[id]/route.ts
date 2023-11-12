import { prisma } from "@/server/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req:Request,context : {params:{id:string}}) {
  try {
    const todo = await prisma.todo.delete({
      where: { id: +context.params.id },
    })
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({error: error})
  }
}

export async function PATCH(req:Request,context : {params:{id:string}}) {
  
  const data = await req.json()


  try {
    const todo = await prisma.todo.update({
      where: { id: +context.params.id },
      data
    })
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({error: error})
  }
}
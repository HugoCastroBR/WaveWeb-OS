import prisma from "@/utils/connect";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const pictures = await prisma.gallery.findMany();
    return NextResponse.json(pictures);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function POST(request:NextRequest) {
  const data = await request.formData()
  const image : File | null = data.get('image') as unknown as File
  const title : string | null = data.get('title') as unknown as string

  if(!image){
    return NextResponse.json('No files received')
  }else{
    const dir = `./public/pictures`
    // await mkdir(dir) // This is for the first use

    const imageBytes = await image.arrayBuffer()
    const imageBuffer = Buffer.from(imageBytes)
    const imagePath = `${dir}/${image.name}`

    await writeFile(imagePath,imageBuffer)
  }

  try {
    await prisma.gallery.create({
      data:{
        title,
        imageUrl:`pictures/${image.name}`
      }
    })
    return NextResponse.json({message:'Image saved'})
  } catch (error) {
    
  }

  return NextResponse.json({message:'Something went wrong'})
}
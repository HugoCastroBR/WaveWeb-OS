// api/uploadFile.ts

import prisma from "@/utils/connect";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request:NextRequest) {
  const data = await request.formData()
  // console.log(data)
  // console.log(data)
  const music : File | null = data.get('file') as unknown as File
  const image : File | null = data.get('image') as unknown as File
  const title : string | null = data.get('title') as unknown as string
  const artist : string | null = data.get('artist') as unknown as string
  
  // console.log(file)

  if(!music || !image){
    return NextResponse.json('No files received')
  }else{
    const random = Math.random().toString(36).substring(7)
    const dir = `./public/songs/${random}`
    await mkdir(dir)

    const musicBytes = await music.arrayBuffer()
    const musicBuffer = Buffer.from(musicBytes)
    const musicPath = `${dir}/${music.name}`

    const imageBytes = await image.arrayBuffer()
    const imageBuffer = Buffer.from(imageBytes)
    const imagePath = `${dir}/${image.name}`

    await writeFile(imagePath,imageBuffer)
    await writeFile(musicPath,musicBuffer)
    console.log('Files saved at',dir)

    try {
      await prisma.musicFile.create({
        data:{
          title,
          artist,
          musicUrl:`songs/${random}/sound.mp3`,
          coverUrl:`songs/${random}/image.jpg`
        }
      })
      return NextResponse.json({message:'File saved'})
    } catch (error) {
      console.log(error)
    }
  }


  return NextResponse.json({message:'Something went wrong'})
};


export async function GET (request:NextRequest) {
  try {
    const musics = await prisma.musicFile.findMany()
    return NextResponse.json(musics)
  } catch (error) {
    return NextResponse.json({error: error})
  }
}
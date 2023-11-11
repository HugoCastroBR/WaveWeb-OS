import { TodoProps } from "@/store/reducers/todo"

const url = 'http://localhost:3333'

export const verifyHealth = async () => {
  const response = await fetch(`${url}/health`)
  const data = await response.json()
  return data
}

export const uploadMusic = async (song: File, image: File, title: string,artist:string) => {
  const data = new FormData();
  data.append('file', song, 'sound.mp3');
  data.append('image', image, 'image.jpg');
  data.append('title', title);
  data.append('artist', artist);
  // 


  const response = await fetch(`api/music`, {
    method: 'POST',
    body: data
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Erro no envio da música: ${response.status}`);
  }
};

export type getMusic = {
  id: number;
  title: string;
  artist: string;
  musicUrl: string;
  coverUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const getMusics = async ():Promise<getMusic[]> => {
  const response = await fetch(`api/music`)
  const data = await response.json()
  return data
}



export const getTodos = async ():Promise<TodoProps[]> => {
  const response = await fetch(`api/todo`)
  const data = await response.json()
  return data
}

export const postTodo = async (title:string,content:string) => {
  const response = await fetch(`api/todo`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      title,
      content
    })
  })
  const data = await response.json()
  return data
}

export const updateTodo = async (
  id:number,
  title:string,
  content:string,
  isDone:boolean
  ):Promise<TodoProps> => {

  const response = await fetch(`api/todo/${id}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      title,
      content,
      isDone
    })
  })
  const data = await response.json()
  return data
}
export const removeTodo = async (id:number) => {
  const response = await fetch(`api/todo/${id}`,{
    method:'DELETE',
  })
  const data = await response.json()
  return data

}

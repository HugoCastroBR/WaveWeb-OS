'use client'
import React, { useEffect } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { MusicsResetAll, MusicsSetCurrentSongLength, MusicsSetSearch, MusicsSetSongIsPaused, MusicsSetSongIsPlaying, TasksSetIsMusicTaskMaximized, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen } from '@/store/actions'
import MusicPlayerBar from '../molecules/MusicPlayerBar'
import { Divider } from '@mantine/core'
import MusicPlayerContent from '../molecules/MusicPlayerContent'
import { getAccessToken, searchMusic } from '@/api/spotify'

let globalAudio: HTMLAudioElement | null = null;
const MusicApp = () => {

  const {states, dispatch} = useStore()
  const playAudioFromUrl = (audioUrl: string):number =>{
    dispatch(MusicsSetSongIsPaused(false))
    if (globalAudio) {
      // Pausar o áudio global se ele existir
      globalAudio.pause();
    }
  
    const audio = new Audio(audioUrl);
  
    audio.addEventListener('canplaythrough', () => {
      audio.play();
      dispatch(MusicsSetCurrentSongLength(audio.duration))
      dispatch(MusicsSetSongIsPlaying(true))
      const durationSeconds = audio.duration; // Obtenha a duração em segundos
      console.log(`Duração da música: ${durationSeconds} segundos`);
      dispatch(MusicsSetCurrentSongLength(durationSeconds))
    });
  
    audio.addEventListener('ended', () => {
      // O áudio terminou de tocar
      console.log('O áudio terminou de tocar');
      dispatch(MusicsSetSongIsPlaying(false))
    });
  
    audio.addEventListener('error', (e) => {
      // Lidar com quaisquer erros que possam ocorrer durante a reprodução
      console.error('Ocorreu um erro ao reproduzir o áudio:', e);
    });
  
    // Definir o áudio como o áudio global
    globalAudio = audio;
  
    return audio.duration; // Retorne a duração em segundos
  }

  
  useEffect(() => {
    if(globalAudio){
      globalAudio.volume = (states.Musics.volume / 100) 
      // globalAudio.volume = (states.Musics.volume || 50 /100) || 0
    }
  }, [states.Musics.volume])

  useEffect(() => {
    if(globalAudio){
      if(states.Musics.songIsPaused){
        globalAudio.pause()
        dispatch(MusicsSetSongIsPlaying(false))
      } else {
        globalAudio.play()
        dispatch(MusicsSetSongIsPlaying(true))
      }
    }
  }, [states.Musics.songIsPaused])
  

  const handlerGetAccessToken = async () => {
    const res = await getAccessToken()
    localStorage.setItem('spotify_access_token', res.access_token)
  }

  useEffect(() => {
    handlerGetAccessToken()
  }, [states.Tasks.MusicTask.isOpen])

  useEffect(() => {
    if(states.Musics.currentSong) {
      playAudioFromUrl(states?.Musics?.currentSong || '')
    }
  }, [states.Musics.currentSong])

  useEffect(() => {
    console.log("now")
    playAudioFromUrl('/songs/eevee-seeds/sound.mp3' )
  },[states.Tasks.MusicTask.isMinimized])

  const handlerSearch = async (value:string) => {
    const res = await searchMusic(value)
    dispatch(MusicsSetSearch(res))
  }

  useEffect(() => {
    console.log(states.Musics.musicIndex)
  }, [states.Musics.musicIndex])

  return (
    <CustomBox
      tittle='Music'
      className={`
        absolute top-64 left-64 w-3/6 h-5/6 bg-gray-300
        mb-1
      `}
      closed={!states.Tasks.MusicTask.isOpen}
      minimized={states.Tasks.MusicTask.isMinimized}
      maximized={states.Tasks.MusicTask.isMaximized}
      setMaximized={() => {
        if(!states.Tasks.MusicTask.isMaximized) {
          dispatch(TasksSetIsMusicTaskMaximized(true))
        } else {
          dispatch(TasksSetIsMusicTaskMaximized(false))
        }
      }}
      setClosed={() => {
        dispatch(TasksSetIsMusicTaskOpen(false))
        dispatch(MusicsResetAll())
      }}
      setMinimized={() => {
        dispatch(TasksSetIsMusicTaskMinimized(true))
      }}
    >
      <div className='flex flex-col w-full h-5/6  justify-end 
      
      '>
        <div className='w-full h-full'>
          <MusicPlayerContent onSearch={handlerSearch} tracksResult={states.Musics.search}/>
        </div>
        <Divider color='gray'/>
        <div className=' flex h-32 w-full -mb-32 mt-2  '>
          <MusicPlayerBar />
        </div>
      </div>
      
    </CustomBox>
  )
}

export default MusicApp
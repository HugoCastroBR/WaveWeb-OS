'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'
import { Progress, Slider } from '@mantine/core'
import useStore from '@/hooks/useStore'
import { MusicsResetAll, MusicsSetSongIsPaused, MusicsSetSongIsPlaying, MusicsSetVolume } from '@/store/actions'
import CustomActionButton from '../atoms/CustomActionButton'
import { formatSecondsToMinutes } from '@/utils/audio'

let globalAudio: HTMLAudioElement | null = null;

const MusicPlayerBar = () => {

  const {states, dispatch} = useStore()




  function calculateProgress(totalDurationSeconds: number, currentValueSeconds: number): number {
    if (totalDurationSeconds <= 0 || currentValueSeconds <= 0) {
      return 0; // Base case to avoid division by zero
    }
    const progress = (currentValueSeconds / totalDurationSeconds) * 100;
    
    return Math.min(100, progress)

  }

  const [musicProgress, setMusicProgress] = useState(0);
  const [currentSongName, setCurrentSongName] = useState('');
  const [isMusicPaused, setIsMusicPaused] = useState(false);

  useEffect(() => {
    setIsMusicPaused(states.Musics.songIsPaused || false)
  }, [states.Musics.songIsPaused])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (states.Musics.songIsPlaying) {
      if (states.Musics.songName !== currentSongName) {
        // Se o nome da música mudou, reinicie o progresso
        setCurrentSongName(states.Musics.songName || '');
        setMusicProgress(0);
      }

      if (!isMusicPaused) {
        // Verifique se a música não está pausada antes de iniciar o intervalo
        intervalId = setInterval(() => {
          if (!states.Musics.isLocal && musicProgress < 30) {
            setMusicProgress((prevProgress: number) => prevProgress + 1);
          }else{
            setMusicProgress((prevProgress: number) => prevProgress + 1);
          }
        }, 1000);
      }
    } else {
      // Se a música não está tocando, pare o intervalo
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [states.Musics.songIsPlaying, states.Musics.songName, musicProgress, currentSongName, isMusicPaused]);



  function adicionarZero(numero: number): string {
    if (numero < 10) {
      return `0${numero}`;
    } 
    return numero.toString();
  }

  const handlerListArtists = (artists:{name:string}[]) => {
    return artists.map((artist, index) => {
      return(
        artist.name
      )
    }).join(', ')
  }

  const resetALl = () => {
    dispatch(MusicsResetAll())
    setMusicProgress(0)
    setCurrentSongName('')
    setIsMusicPaused(true)
  }




  return (
    <div className='w-full h-full flex  justify-center items-center pb-1'>
      <div className='w-32 h-full flex justify-center items-center mb-8'>
        <Image src={states.Musics.currentSongImage || '/assets/icons/music-default.png'} width={124} height={124} alt='cover' />
      </div>
      <div className='w-4/12 h-full flex flex-col'>
        <CustomText text={states.Musics.songName || 'Mind Void'} className='ml-2 mt-px font-medium text-xl'/>
        <CustomText text={handlerListArtists(states.Musics.artists) || 'Pills and PTSD'} className='ml-2 -mt-1 text-sm'/>
      </div>
      <div className='h-full  flex  w-2/12 justify-evenly items-center'>
        <CustomActionButton 
          className='w-12 h-12 flex justify-center items-center'
          disabled
        >
            <CustomText 
              text='<' 
              className='text-2xl font-semibold'
            />
          </CustomActionButton>
          {!states.Musics.songIsPaused ?
          <CustomActionButton 
            className='w-12 h-12 flex justify-center items-center' 
            onClick={() => {
              setIsMusicPaused(true)
              dispatch(MusicsSetSongIsPaused(true))
            }}
          >
            <span className='i-mdi-pause text-2xl font-semibold'></span>
          </CustomActionButton>
          :
          <CustomActionButton 
            className='w-12 h-12 flex justify-center items-center'
            onClick={() => {
              setIsMusicPaused(false)
              dispatch(MusicsSetSongIsPaused(false))
            }}
          >
            <span className='i-mdi-play text-2xl font-semibold'></span>
          </CustomActionButton>
          }
          {/* <Image src='/assets/icons/music-next.png' width={40} height={40} alt='next track' className='opacity-120' /> */}
          <CustomActionButton 
            className='w-12 h-12 flex justify-center items-center'
            disabled
            onClick={() => {
              
            }}
          >
            <CustomText text='>' className='text-2xl font-semibold' />
          </CustomActionButton>
      </div>
      <div className='w-3/12 h-full  flex flex-col items-center justify-center'>
      {states.Musics.isLocal ?
      <CustomText 
      text={`${formatSecondsToMinutes(Math.max(musicProgress))}/${states.Musics.isLocal ? formatSecondsToMinutes(states.Musics.currentSongLength || 0) : '0:30'}`}
      className='text-md font-medium'
      />
      :
      <CustomText 
        text={`0:${adicionarZero(Math.max(musicProgress))}/0:30`}
        className='text-md font-medium'
      />
      }
      <Progress.Root size="lg" w={180} radius={0} color='gray'>
        <Progress.Section 
          value={calculateProgress(states.Musics.currentSongLength || 0, musicProgress)}
          color='gray' 
        >
          <Progress.Label></Progress.Label>
        </Progress.Section>
      </Progress.Root>
      </div>
      <div className='w-3/12 h-full flex flex-col justify-center items-center'>
      <CustomText text={`Vol: ${states.Musics.volume}%`} className='text-md font-medium'/>
      <Slider 
      w={180}
      size={'xl'}
      radius={0}
      thumbSize={20}
      value={states.Musics.volume} 
      color='gray'
      onChange={(value) => {
        dispatch(MusicsSetVolume(value))
      }}/>
      </div>
    </div>
  )
}

export default MusicPlayerBar
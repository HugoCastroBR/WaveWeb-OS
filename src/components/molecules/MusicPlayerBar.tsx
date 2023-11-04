'use client'
import React from 'react'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'
import { Progress, Slider } from '@mantine/core'
const MusicPlayerBar = () => {

  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false)
  const [musicProgress, setMusicProgress] = React.useState(53)
  const [volume, setVolume] = React.useState(50)

  function calculateProgress(totalDurationSeconds: number, currentValueSeconds: number): number {
    if (totalDurationSeconds <= 0 || currentValueSeconds <= 0) {
      return 0; // Base case to avoid division by zero
    }
    const progress = (currentValueSeconds / totalDurationSeconds) * 100;
    
    return Math.min(100, progress)

  }
  


  return (
    <div className='w-full h-2/3 flex  justify-center items-center'>
      <div className='w-20 h-full flex justify-center items-center'>
        <Image src='/assets/icons/music-default.png' width={40} height={40} alt='cover' />
      </div>
      <div className='w-64 h-full flex flex-col'>
        <CustomText text='Music tittle' className='ml-2 mt-px font-medium text-base'/>
        <CustomText text='Artist name' className='ml-2 -mt-1 text-sm'/>
      </div>
      <div className='w-64 h-full  flex '>
        <div className='w-1/3 h-full flex items-end mt-1 justify-end cursor-pointer'>
          <Image src='/assets/icons/music-prev.png' width={40} height={40}  alt='previous track' className='opacity-70' />
        </div>
        <div className='w-1/3 h-full flex items-end mt-1 justify-center cursor-pointer'>
          {isMusicPlaying ?
          <Image src='/assets/icons/music-pause.png' width={40} height={40} alt='pause song'  className='opacity-70'/>
          :
          <Image src='/assets/icons/music-start.png' width={40} height={40} alt='play song' className='opacity-70' />
          }
        </div>
        <div className='w-1/3 h-full flex items-end mt-1 justify-start cursor-pointer'>
          <Image src='/assets/icons/music-next.png' width={40} height={40} alt='next track' className='opacity-70' />
        </div>
      </div>
      <div className='w-48 h-full  flex flex-col items-center justify-center'>
      <CustomText text='0:15/0:30' className='text-md font-medium'/>
      <Progress.Root size="lg" w={100} radius={0} color='gray'>
        <Progress.Section value={calculateProgress(600,300)}color='gray' >
          <Progress.Label></Progress.Label>
        </Progress.Section>
      </Progress.Root>
      </div>
      <div className='w-32 h-full flex flex-col justify-center items-center'>
      <CustomText text={`Vol: ${volume}%`} className='text-md font-medium'/>
      <Slider 
      w={120}
      size={'xl'}
      radius={0}
      thumbSize={20}
      value={volume} 
      color='gray'
      onChange={(value) => setVolume(value)}/>
      </div>
    </div>
  )
}

export default MusicPlayerBar
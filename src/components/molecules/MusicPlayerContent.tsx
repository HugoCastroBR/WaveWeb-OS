'use client'
import React, { ChangeEvent, useEffect } from 'react'
import CustomText from '../atoms/CustomText'
import MusicPlayerList from './MusicPlayerList'
import Image from 'next/image'
import CustomInput from '../atoms/CustomInput'
import { Divider, Pagination } from '@mantine/core'
import CustomActionButton from '../atoms/CustomActionButton'
import { SpotifySearchMusic } from '@/api/spotify'
import useStore from '@/hooks/useStore'
import { MusicsSetCurrentSong, MusicsSetSongName, MusicsSetArtists, MusicsSetCurrentSongImage, MusicsSetMusicIndex, MusicsSetCurrentSongLength, MusicsSetIsLocal, MusicsSetSongIsPaused, MusicsSetSongIsPlaying } from '@/store/actions'
import { formatSecondsToMinutes, getMP3Duration } from '@/utils/audio'
import musics from '../../../public/songs/musics.json'
import { getMusic, getMusics, uploadMusic, verifyHealth } from '@/api'
import wait from '@/utils/wait'


interface MySongProps {
  songName: string
  artistName: string
  image: string
  url: string
  onClick?: (url: string) => void
}
const MySong = ({
  songName,
  artistName,
  image,
  url,
}: MySongProps) => {

  const { states, dispatch } = useStore()
  const artists = [{
    name: artistName
  }]

  const [musicDuration, setMusicDuration] = React.useState(0)



  React.useEffect(() => {

    getMP3Duration(url).then((duration) => {
      setMusicDuration(duration)
    })
    
  }, [])


  return (
    <div
      className=' 
        w-full h-24  flex justify-center border border-r-0 border-gray-400 -ml-px
        cursor-pointer hover:bg-gray-200 duration-200 border-b-0 my-1 
        '
      onClick={() => {
        getMP3Duration(url).then((duration) => {
          dispatch(MusicsSetCurrentSongLength(duration))
        })
        dispatch(MusicsSetSongIsPaused(false))
        dispatch(MusicsSetSongIsPlaying(true))
        dispatch(MusicsSetIsLocal(true))
        dispatch(MusicsSetCurrentSong(url))
        dispatch(MusicsSetSongName(songName))
        dispatch(MusicsSetArtists(artists))
        dispatch(MusicsSetCurrentSongImage(image))
      }}
    > 
      <div className='flex flex-col h-full w-3/12 '>
        <Image src={image} width={120} height={120} alt={songName} />
      </div>
      <div className='flex flex-col h-full w-9/12 ml-2 '>
        <div className='flex flex-col w-full  h-4/6'>
          <CustomText text={songName} className='text-xl font-medium' />
          <CustomText text={`• ${artistName} •`} className='text-lg font-medium -mt-2 text-gray-800 italic' />
        </div>
        <CustomText 
          text={`${formatSecondsToMinutes(musicDuration)}`} 
          className='text-sm   text-gray-700 h-1/6 mt-2' />
      </div>
    </div>
  )
}

interface MusicPlayerContentProps {
  onSearch: (value: string) => void
  tracksResult?: SpotifySearchMusic
}

const MusicPlayerContent = ({
  onSearch,
  tracksResult
}: MusicPlayerContentProps) => {

  const { states, dispatch } = useStore()


  const [search, setSearch] = React.useState('')


  const [localMusics, setLocalMusics] = React.useState<getMusic[]>([] as getMusic[])
  

  const handlerGetLocalMusics = async () => {
    const res = await getMusics()
    setLocalMusics(res)
  }
  useEffect(() => {
    if(states.Tasks.MusicTask.isOpen) {
      handlerGetLocalMusics()
    }
  },[states.Tasks.MusicTask.isOpen])



  const [musicFile, setMusicFile] = React.useState<File | null>(null)
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [musicName, setMusicName] = React.useState('')
  const [musicArtist, setMusicArtist] = React.useState('')

  const handlerUploadMusic = async () => {
    await uploadMusic(musicFile as File, imageFile as File, musicName,musicArtist)
    await handlerGetLocalMusics()
  }

  const RenderLocalMusics = ( ) => {
    return(
      localMusics.map((music, index) => {
        
        return (
          <MySong
            artistName={music.artist}
            image={`/${music.coverUrl}`}
            songName={music.title}
            url={`/${music.musicUrl}`}
            key={index}
          />
        )
      })
    )
  }

  return (
    <div className=' w-full h-full flex'>
      <div className='h-full w-5/12 flex flex-col border-r border-gray-400 mt-1'>
        <div className='h-1/5 w-full flex justify-center items-center'>
          <form className='flex h-full'>
            <div className='flex flex-col h-full w-1/2 justify-center'>
              <CustomInput 
                type='file' 
                accept='.mp3'
                label='Upload a song:' 
                className='w-full h-10 flex flex-col' 
                onChange={(e:string | ChangeEvent<HTMLInputElement>) => {
                  if(typeof e !== 'string') {
                    setMusicFile(e.target.files?.[0] || null)
                  }
                }}
              />
              <CustomInput 
                type='file' 
                label='Upload a image:' 
                className='w-full h-10 flex flex-col'
                accept='image/jpeg'
                onChange={(e:string | ChangeEvent<HTMLInputElement>) => {
                  if(typeof e !== 'string') {
                    setImageFile(e.target.files?.[0] || null)
                  }
                }}
              />
              </div>
            <div className='flex flex-col h-full w-1/2 pr-2 justify-center'>
              <div className='mt-4'>
                <CustomInput 
                  label='Song name:' 
                  className='w-full h-6 flex flex-col' 
                  onChange={(e) => {
                    setMusicName(e as string)
                  }}
                />
                <CustomInput 
                  label='Artist name:' 
                  className='w-full h-6 flex flex-col' 
                  onChange={(e) => {
                    setMusicArtist(e as string)
                  }}
                />
              </div>
              <div className='mb-2'>
                <CustomActionButton className='w-20 h-6 mt-2' onClick={() => {


                  handlerUploadMusic()
                  handlerGetLocalMusics()

                }}>Upload</CustomActionButton>
              </div>
            </div>
          </form>
        </div>
        <CustomText text='My Musics:' className='text-2xl font-semibold ' />
        <div className=' w-full overflow-y-auto flex flex-col'>
              
          <MySong
            artistName='eevee'
            image='/songs/eevee-seeds/image.jpg'
            songName='Seeds - Full Album'
            url='/songs/eevee-seeds/sound.mp3'
            key={1}
          />
          
          <RenderLocalMusics />


        </div>
      </div>
      <div className='h-full  w-7/12 flex flex-col mt-1'>
        <div className='h-16  ml-1 w-full flex '>
          <div className='w-1/2 '>
            <CustomInput label='Search a song:' className='w-full h-8 flex flex-col'
              onChange={(e) => {
                setSearch(String(e))
              }}
            />
          </div>
          <div className='flex  w-1/2 h-28 items-start mt-6 ml-px '>
            <CustomActionButton className='w-8 h-8' onClick={
              () => {
                onSearch(search)
              }
            }>
              <span className='i-mdi-search '></span>
            </CustomActionButton>
          </div>
        </div>
        <div className='h-full placeholder:flex flex-col my-2 mx-1 mt-1'>
          <CustomText text='Results' className='text-2xl font-medium' />
          <Divider className='w-full mt-2' color='gray' />
          <div className='overflow-y-scroll flex flex-col w-full h-5/6 '>
            <MusicPlayerList
              items={tracksResult?.tracks?.items || []}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayerContent
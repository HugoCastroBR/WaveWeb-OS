'use client'
import React from 'react'
import CustomText from '../atoms/CustomText'
import Image from 'next/image'
import CustomActionButton from '../atoms/CustomActionButton'
import { SpotifySearchMusic } from '@/api/spotify'
import useStore from '@/hooks/useStore'
import { MusicsSetArtists, MusicsSetCurrentSong, MusicsSetCurrentSongImage, MusicsSetMusicIndex, MusicsSetSongIsPaused, MusicsSetSongIsPlaying, MusicsSetSongName } from '@/store/actions'

export interface MusicPlayerListProps {
  items: {
    name: string;
    duration_ms: number;
    preview_url: string;
    artists: {
      name: string;
    }[];
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
  }[];
}

interface MusicItemProps {
  id: number;
  name: string;
  duration?: number;
  preview: string;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    images: {
      url: string;
    }[];
  };
}
const MusicItem = ({
  name,
  artists,
  album,
  preview,
  id,
  duration
}:MusicItemProps) => {

  const handlerListArtists = () => {
    return artists.map((artist, index) => {
      return(
        artist.name
      )
    }).join(', ')
  }

  const {states, dispatch} = useStore()

  const msToSecs = (ms: number) => {
    return (ms / 1000).toFixed(0)
  }

  return(
    <div className='h-20  flex my-px border border-t-0 border-gray-400 border-l-0 cursor-pointer'
      onClick={() => {
        dispatch(MusicsSetSongIsPaused(false))
        dispatch(MusicsSetSongIsPlaying(true))
        dispatch(MusicsSetCurrentSong(preview))
        dispatch(MusicsSetSongName(name))
        dispatch(MusicsSetArtists(artists))
        dispatch(MusicsSetCurrentSongImage(album.images[0].url))
        dispatch(MusicsSetMusicIndex(id))
      }}
    >
      <div className='h-20 min-h-full min-w-max w-20 flex justify-center items-center'>
        <Image src={album.images[0].url} width={80} height={80} alt='Spotify' />
      </div>
      <div className='h-full w-4/6 flex flex-col ml-2'>
        <CustomText text={name} className='text-lg font-medium' />
        <CustomText text={handlerListArtists()} className='text-sm' />

      </div>
      <div className='h-full w-1/4 flex flex-col items-end justify-center mr-2'>
        <div className='h-1/2 flex flex-col mt-2'>
          <CustomText text='00:30' className='text-base font-medium' />
        </div>
      </div>
    </div>
  )
}
const MusicPlayerList = ({
  items
}:MusicPlayerListProps) => {

  const {states, dispatch} = useStore()


  return (
    <>
      {items.filter((item) => {
        if(item.preview_url) {
          return item
        }
      }).map((item, index) => {
        return (
          <MusicItem 
            key={index}
            name={item.name}
            artists={item.artists}
            album={item.album}
            preview={item.preview_url}
            id={index}
          />
        )
      })}
    </>
  )
}

export default MusicPlayerList
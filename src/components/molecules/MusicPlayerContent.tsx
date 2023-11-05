import React, { useEffect } from 'react'
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
        w-full h-28 flex justify-center border border-r-0 border-gray-400 -ml-px
        cursor-pointer hover:bg-gray-200 duration-200 border-b-0 my-1 overflow-hidden
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
          className='text-base   text-gray-800 h-1/6 mt-4' />
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


  const [search, setSearch] = React.useState('')

  return (
    <div className=' w-full h-full flex'>
      <div className='h-full w-5/12 flex flex-col border-r border-gray-400 -mt-1'>
        <div className='h-1/6 w-full flex justify-center items-center'>
          <Image src='/assets/icons/music-task.png' width={48} height={48} alt='Spotify' />
        </div>
        <CustomText text='Full Sounds:' className='text-2xl font-semibold ' />
        <div className='h-auto  w-full overflow-y-auto flex flex-col'>

          <MySong
            artistName='eevee'
            image='/songs/eevee-seeds/image.jpg'
            songName='Seeds - Full Album'
            url='/songs/eevee-seeds/sound.mp3'
            key={1}
          />



        </div>
      </div>
      <div className='h-full  w-7/12 flex flex-col'>
        <div className='h-16  ml-1 w-full flex '>
          <div className='w-1/2 '>
            <CustomInput label='Search a song:' className='w-full h-8 flex flex-col'
              onChange={(e) => {
                setSearch(e)
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
        <div className='h-full placeholder:flex flex-col my-2 mx-1 mt-8'>
          <CustomText text='Results' className='text-2xl font-medium' />
          <Divider className='w-full mt-2' color='gray' />
          <div className='overflow-y-scroll flex flex-col w-full h-5/6 pt-2'>
            <MusicPlayerList
              items={tracksResult?.tracks?.items || []}
            />
          </div>
        </div>
        {/* <div className='m-1 mb-2 pt-1 w-full h-full flex justify-center items-center'>
          <Pagination
            total={10}
            color="gray"
            radius={0}
            size={'sm'}
            gap={1}
            styles={{
              control: {
                borderRadius: 0,
                borderBottom: '2px solid #111827',
                borderRight: '2px solid #111827',
                borderLeft: '2px solid #f3f4f6',
                borderTop: '2px solid #f3f4f6',
                backgroundColor: '#cbd5e1',
              }
            }}
          />
        </div> */}
      </div>
    </div>
  )
}

export default MusicPlayerContent
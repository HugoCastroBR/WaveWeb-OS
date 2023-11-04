import React from 'react'
import CustomText from '../atoms/CustomText'
import MusicPlayerList from './MusicPlayerList'
import Image from 'next/image'
import CustomInput from '../atoms/CustomInput'
import { Divider } from '@mantine/core'

const MySong = () => {
  return (
    <div className=' 
    w-full h-12 flex flex-col justify-center border border-r-0 border-gray-400 -ml-px
    cursor-pointer hover:bg-gray-200 duration-200 border-b-0
    '>
      <CustomText text='Song 1' className='text-sm' />
      <CustomText text='Artist 1' className='text-xs' />
    </div>
  )
}

const MusicPlayerContent = () => {
  return (
    <div className=' w-full h-full flex'>
      <div className='h-full w-1/4 flex flex-col border-r border-gray-400 -mt-1'>
        <div className='h-1/6 w-full flex justify-center items-center'>
          <Image src='/assets/icons/music-task.png' width={48} height={48} alt='Spotify' />
        </div>
        <CustomText text='My songs' className='text-md font-medium ' />
        <div className='h-auto  w-full overflow-y-auto flex flex-col'>
          
          <MySong />
          <MySong />
          <MySong />
          <MySong />
          <MySong />
          <MySong />
          <MySong />

        </div>
      </div>
      <div className='h-full  w-3/4 flex flex-col'>
        <div className='h-16  ml-1'>
          <CustomInput label='Search a song:' className='w-1/2 h-6 ' />
        </div>
        <div className='h-full placeholder:flex flex-col my-1'>
          Results
          <Divider className='w-full mb-px' color='gray' />
          <div className='overflow-y-scroll flex flex-col w-full ' style={{
            height:'400px'
          }}>
            <MusicPlayerList />
          </div>
        </div>
        <div className='m-1 mb-2 pt-1'>
          pagination
        </div>
      </div>
    </div>
  )
}

export default MusicPlayerContent
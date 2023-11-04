import React from 'react'
import CustomText from '../atoms/CustomText'
import Image from 'next/image'
import CustomActionButton from '../atoms/CustomActionButton'

const MusicItem = () => {
  return(
    <div className='h-16  flex my-px border border-t-0 border-gray-400 border-l-0'>
      <div className='h-16 min-h-full min-w-max w-16 flex justify-center items-center'>
        <Image src='/assets/icons/music-no-music.png' width={48} height={48} alt='Spotify' />
      </div>
      <div className='h-full w-4/6 flex flex-col'>
        <CustomText text='Song 1' className='text-base font-medium' />
        <CustomText text='Artist 1' className='text-xs' />

      </div>
      <div className='h-full w-1/4 flex flex-col items-end justify-center mr-2'>
        <div className='h-1/2 flex flex-col mt-2'>
          <CustomText text='0:30' className='text-sm font-medium' />
        </div>
        <div className='h-1/2 -mt-2'>
          <CustomActionButton className='w-6 h-6 flex justify-center items-center'>
            <CustomText text='+' className='text-xl font-medium' />
          </CustomActionButton>
            
        </div>
      </div>
    </div>
  )
}
const MusicPlayerList = () => {
  return (
    <>
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
    </>
  )
}

export default MusicPlayerList
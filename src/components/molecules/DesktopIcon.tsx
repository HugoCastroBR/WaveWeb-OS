'use client'
import React from 'react'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'


interface DesktopIconProps {
  onClick?: () => void
  imgSrc: string
  text: string
}

const DesktopIcon = ({
  onClick,
  imgSrc,
  text
}:DesktopIconProps) => {
  return (
    <div 
      className='flex flex-col w-20 h-20 justify-center items-center m-4 cursor-pointer z-10
      '
      onClick={onClick}
    >
      <Image src={imgSrc} width={64} height={64} alt={`${text}`} />
      <CustomText
        className='text-base -mt-1 font-semibold'
        text={`${text}`}
      />
    </div>
  )
}

export default DesktopIcon
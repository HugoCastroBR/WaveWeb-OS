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
      className='flex flex-col w-12 h-16 justify-center items-center m-2 cursor-pointer z-10
      '
      onClick={onClick}
    >
      <Image src={imgSrc} width={48} height={48} alt={`${text}`} />
      <CustomText
        className='text-sm -mt-1 font-medium'
        text={`${text}`}
      />
    </div>
  )
}

export default DesktopIcon
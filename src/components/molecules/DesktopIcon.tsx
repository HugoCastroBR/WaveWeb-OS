'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'
import { getExtension, verifyIfIsFile } from '@/utils/files'
import useStore from '@/hooks/useStore'
import { PathAddSelectedItem, PathRemoveSelectedItem } from '@/store/actions'


interface DesktopIconProps {
  onClick?: (filepath:string) => void
  onDoubleClick?: (filepath:string) => void
  img?: string,
  deprecated?: boolean,
  file: string,
  pathname: string
}

const DesktopIcon = ({
  onClick,
  onDoubleClick,
  file,
  img,
  pathname,
  deprecated,
}:DesktopIconProps) => {

  const {states, dispatch} = useStore()

  const [isSelect, setIsSelect] = React.useState(false)

  useEffect(() => {
    if(states.Path.selectedItems.includes(file)){
      setIsSelect(true)
    }else{
      setIsSelect(false)
    }
  }, [states.Path.selectedItems])

  const handleLoadDesktopIcon= () => {
    if(verifyIfIsFile(file)){
      switch(getExtension(file)){
        case 'txt':
          return '/assets/icons/note-pad-task.png'
        default:
          return '/assets/icons/file.png'
      }
    }else{
      return '/assets/icons/folder.png'
    }
  }

  const handleOnClick = () => {
    onClick && onClick(file)
    if(!states.Path.selectedItems.includes(file)){
      dispatch(PathAddSelectedItem(file))
    }else{
      dispatch(PathRemoveSelectedItem(file))
    }
  }



  const handleDoubleClick = () => {
    onDoubleClick && onDoubleClick(file)
  }

  const imgSrc = handleLoadDesktopIcon()

  return (
    <div 
      className={`
        flex flex-col w-20 h-20 justify-center items-center m-1 cursor-pointer z-20
        ${isSelect ? 'bg-gray-100' : 'bg-transparent'}
      `}
      onClick={handleOnClick}
      onDoubleClick={handleDoubleClick}
    >
      <Image src={deprecated? img : imgSrc} width={52} height={52} alt={`${file}`} />
      <CustomText
        className='text-sm -mt-0 font-semibold text-gray-800 break-words text-center w-20'
        text={`${file}`}
      />
    </div>
  )
}

export default DesktopIcon
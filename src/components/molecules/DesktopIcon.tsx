'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'
import { getExtension, verifyIfIsFile } from '@/utils/files'
import useStore from '@/hooks/useStore'
import { PathAddSelectedItem, PathRemoveSelectedItem } from '@/store/actions'
import Draggable from 'react-draggable'


interface DesktopIconProps {
  onClick?: (filepath: string) => void
  onDoubleClick?: (filepath: string) => void
  img?: string,
  deprecated?: boolean,
  file: string,
  pathname: string
  native?: boolean
  onStopDrag?: (e: {x:number,y:number}) => void,
  uuid?: string
}

const DesktopIcon = ({
  onClick,
  onDoubleClick,
  file,
  img,
  pathname,
  deprecated,
  native,
  onStopDrag
}: DesktopIconProps) => {

  const { states, dispatch } = useStore()

  const [isSelect, setIsSelect] = React.useState(false)

  useEffect(() => {
    if (states.Path.selectedItems.includes(file)) {
      setIsSelect(true)
    } else {
      setIsSelect(false)
    }
  }, [states.Path.selectedItems])

  const handleLoadDesktopIcon = () => {
    if (verifyIfIsFile(file)) {
      switch (getExtension(file)) {
        case 'txt':
          return '/assets/icons/note-pad-task.png'
        default:
          return '/assets/icons/file.png'
      }
    } else {
      return '/assets/icons/folder.png'
    }
  }

  const handleOnClick = () => {
    onClick && onClick(file)
    if (!states.Path.selectedItems.includes(file)) {
      dispatch(PathAddSelectedItem(file))
    } else {
      dispatch(PathRemoveSelectedItem(file))
    }
  }



  const handleDoubleClick = () => {
    onDoubleClick && onDoubleClick(file)
  }

  const [isMouseIn, setIsMouseIn] = useState(false)

  const imgSrc = handleLoadDesktopIcon()
  const [isDragging, setIsDragging] = useState(false)


  const dragRef = React.useRef(null)

  return (
    <Draggable
      onStop={(e,data) => {
        onStopDrag && onStopDrag(data)
      }}
      ref={dragRef}
    >
      <div
        className={`
        flex flex-col w-20 h-24 justify-center items-center cursor-pointer z-20
        ${isSelect ? 'bg-gray-100' : 'bg-transparent'}
        ${isDragging ? 'opacity-50 cursor-move backdrop-filter backdrop-blur-sm bg-gray-100' : 'opacity-100'}
      `}
        onDrag={(e) => {
          setIsDragging(true)
        }}
        onDragStart={(e) => {
          setIsSelect(true)
        }}
        onDragEnd={(e) => {
          setIsSelect(false)
          setIsDragging(false)
        }}
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => {
          setIsMouseIn(true)
        }}
        onMouseLeave={() => setIsMouseIn(false)}
      >
        <div
          className={`
          ${isMouseIn ? 'block' : 'hidden'} absolute ml-80 mr-4 mt-0
          bg-gray-100 bg-opacity-5 backdrop-filter backdrop-blur-sm
          w-56 p-1 flex justify-start items-start

        `}
        >
          <CustomText
            className='text-base -mt-0 font-semibold text-gray-500 break-words text-start w-full'
            text={`${file.length > 70 ? file.slice(0, 70) + '...' : file}`}
          />
        </div>
        <Image src={deprecated ? img : imgSrc} width={52} height={52} alt={`${file}`} />
        <CustomText
          className='text-sm -mt-0 font-semibold text-slate-500
          break-words text-center w-20'
          text={`${file.length > 12 ? file.slice(0, 12) + '...' : file}`}
        />
      </div>
    </Draggable>
  )
}

export default DesktopIcon
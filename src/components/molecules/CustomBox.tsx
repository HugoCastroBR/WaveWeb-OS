'use client'
import React, { useEffect, useState } from 'react'
import CustomText from '../atoms/CustomText'
import CustomWindowHeaderButton from '../atoms/CustomWindowHeaderButton'
import Draggable from 'react-draggable';
import AppTaskBar from './AppTaskBar';
import Image from 'next/image';
import useStore from '@/hooks/useStore';
import { AppSetFocusedItem } from '@/store/actions';

interface CustomBoxProps {
  children: React.ReactNode
  tittle: string
  className?: string
  disableMinimize?: boolean
  disableMaximize?: boolean
  disableClose?: boolean
  closed?: boolean,
  setClosed?: (closed: boolean) => void
  minimized?: boolean,
  setMinimized?: (minimized: boolean) => void
  maximized?: boolean,
  setMaximized?: (maximized: boolean) => void
  resize?: boolean
  withTaskBar?: boolean
  icon?: string
  onSave?: () => void
  onRemove?: () => void
  removeOption?: boolean
  saveOption?: boolean
  onClick?: () => void
}
const CustomBox = ({
  children,
  tittle,
  className,
  closed,
  disableMinimize,
  disableMaximize,
  disableClose,
  setClosed,
  minimized,
  setMinimized,
  maximized,
  setMaximized,
  resize,
  withTaskBar,
  icon,
  onSave,
  saveOption,
  onRemove,
  removeOption,
  onClick,
}: CustomBoxProps) => {

  const {states, dispatch} = useStore()

  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if(states.App.focusedItem === tittle) {
      setIsFocused(true)
    } else {
      setIsFocused(false)
    }
  }, [states.App.focusedItem])

  return (
    <Draggable 
      handle='.handle' 
      disabled={maximized} 
      position={maximized ? { x: 0, y: 0 } : undefined} 
    >
      
      <div
        className={`top-1/4
        bg-gray-300 ${closed && 'hidden'} ${minimized && 'hidden'}
        z-20
        border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
        border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
        drop-shadow-sm shadow-sm shadow-gray-800 ${className} !overflow-hidden
        ${resize ? 'hover:resize' : ''}
        ${maximized ? ' !w-full !h-full !top-0 !left-0 cursor-auto' : ''}
        ${isFocused ? ' !z-30' : ''}
        `}
        onClick={() => {
          dispatch(AppSetFocusedItem(tittle))
          onClick && onClick()
        }}
      >
        
        <div className={`
        w-full flex justify-between items-center h-10 pl-px pr-1 
        bg-gradient-to-l from-pink-400 via-indigo-300 to-blue-500
        handle cursor-move ${maximized ? ' !cursor-auto' : ''}
        `}
        > 
          <div className='flex items-center'>
          {icon && <Image src={icon} width={32} height={32} alt='icon' />}
          <CustomText
            text={tittle || '404: Mind not found'}
            className='font-medium text-gray-100 ml-1'
          />
          </div>
          <div className='flex'>
            {!disableMinimize && <CustomWindowHeaderButton type='minimize'
              onClick={() => {
                setMinimized && setMinimized(true)
              }}
            />}
            {!disableMaximize && <CustomWindowHeaderButton type='maximize'
              onClick={() => {
                setMaximized && setMaximized(true)
              }}
            />}
            {!disableClose && <CustomWindowHeaderButton type='close' onClick={() => {
              setClosed && setClosed(true)
            }} />}
          </div>
        </div>
        {withTaskBar && <AppTaskBar 
          saveOption={saveOption}
          removeOption={removeOption}
          onRemove={() => {
            onRemove && onRemove()
          }}
          onSave={() => {
            onSave && onSave()
          }}
        />}
        <div className='p-1 w-full h-full '>
          {children}
        </div>
      </div>

    </Draggable>
  )
}

export default CustomBox
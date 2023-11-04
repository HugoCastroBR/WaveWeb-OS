'use client'
import React from 'react'
import CustomText from '../atoms/CustomText'
import CustomWindowHeaderButton from '../atoms/CustomWindowHeaderButton'
import Draggable from 'react-draggable';
import CustomActionButton from '../atoms/CustomActionButton';

interface CustomBoxProps {
  children?: React.ReactNode
  tittle?: string
}
const CustomBox = () => {
  return (
    <Draggable handle='.handle' >
      <div
        className='
      flex flex-col bg-gray-300 w-96 h-96 z-50
      border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
      border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
      drop-shadow-sm shadow-sm shadow-gray-800 
      '
      >
        <div className='
        w-full flex justify-between items-center h-8 pl-2 pr-1 
        bg-gradient-to-l from-pink-400 via-indigo-300 to-blue-500
        handle cursor-move
        '
        
        >
          <CustomText
            text='Login'
            className='font-medium text-gray-100'
          />
          <div className='flex'>
            <CustomWindowHeaderButton type='minimize'/>
            <CustomWindowHeaderButton type='maximize'/>
            <CustomWindowHeaderButton type='close'/>
          </div>
        </div>
        <div className='p-1 flex flex-col'>
          <CustomText
            text='Hello World'
            className='text-gray-900'
          />
          <div className='flex'>
            <CustomActionButton className='w-24'>
              Close Me
            </CustomActionButton>
          </div>
        </div>
      </div>

    </Draggable>
  )
}

export default CustomBox
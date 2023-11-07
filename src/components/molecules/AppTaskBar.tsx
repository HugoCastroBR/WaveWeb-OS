'use client'
import React from 'react'
import CustomText from '../atoms/CustomText'
import CustomActionButton from '../atoms/CustomActionButton'
import useStore from '@/hooks/useStore'
import { AppSetFileMenuOpen, AppSetAboutMenuOpen } from '@/store/actions'


interface AppTaskBarProps {
  saveOption?: boolean
  onSave?: () => void
  removeOption?: boolean
  onRemove?: () => void
}
const AppTaskBar = ({
  onSave,
  saveOption,
  removeOption,
  onRemove
}:AppTaskBarProps) => {

  const {states, dispatch} = useStore()



  return (
    <>
      <div className='
      flex flex-col w-full h-8 bg-gray-300
      border-t-2 border-t-gray-100 
      border-b-2 border-b-gray-800
    '>
        <div className='flex items-center justify-start h-full w-full'>
          <CustomActionButton
            className='h-8 w-24 !justify-start '
            onClick={() => {
              dispatch(AppSetFileMenuOpen(!states.App.isFileMenuOpen))
            }}
          >
            <CustomText
              className='first-letter:underline text-lg ml-px'
              text='file'
            />
          </CustomActionButton>
          <CustomActionButton
            className='h-8 w-24 !justify-start '
            onClick={() => {
              dispatch(AppSetAboutMenuOpen(!states.App.isAboutMenuOpen))
            }}
          >
            <CustomText
              className='first-letter:underline text-lg ml-px'
              text='about'
            />
          </CustomActionButton>
        </div>
      </div>
      {
        states.App.isFileMenuOpen &&
        <div 
        className='
          absolute top-16 w-24 h-32 bg-gray-200 flex flex-col
          border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
          border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
          drop-shadow-sm shadow-sm shadow-gray-800 pt-px pl-0
        '>
          {
          saveOption && 
            <CustomActionButton 
            className='!justify-start mt-px'
            onClick={() => {
              if(onSave) {
                onSave()
              }
            }}
          >
            <CustomText
              text='Save'
              className='text-sm text-start'
            />
          </CustomActionButton>
          }
          {
            removeOption &&
            <CustomActionButton 
            className='!justify-start mt-px'
            onClick={() => {
              if(onRemove) {
                onRemove()
              }
            }}
          >
            <CustomText
              text='Remove'
              className='text-sm text-start'
            />
          </CustomActionButton>
          }
        </div>
      }
      {
        states.App.isAboutMenuOpen &&
        <div 
        className='
          left-24
          absolute top-16 w-24 h-32 bg-gray-200 flex flex-col
          border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
          border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
          drop-shadow-sm shadow-sm shadow-gray-800 px-px pl-0
        '>
          <CustomActionButton 
            className='!justify-start mt-px'
          >
            <CustomText
              text='Credits'
              className='text-sm text-start'
            />
          </CustomActionButton>
          <CustomActionButton 
            className='!justify-start mt-px'
          >
            <CustomText
              text='Docs'
              className='text-sm text-start'
            />
          </CustomActionButton>
        </div>
      }
      
      
    </>
  )
}

export default AppTaskBar
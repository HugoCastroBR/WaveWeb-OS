'use client'
import React from 'react'
import CustomBox from '../molecules/CustomBox'
import CustomActionButton from '../atoms/CustomActionButton'
import useStore from '@/hooks/useStore'
import CustomText from '../atoms/CustomText'
import { AppSetConfirmed, SetNotification } from '@/store/actions'



const CustomAlert = () => {

  const {states, dispatch} = useStore()

  return (
    <CustomBox
      tittle={states.App.notificationTitle}
      className={`
      absolute top-1/4 left-1/4 w-96 h-36 bg-gray-300
      flex flex-col items-center justify-center pb-1 !z-40
      ${states.App.isNotificationOpen ? '' : 'hidden'}
      `}
      icon='/assets/icons/alert.png'
      disableMaximize
      disableMinimize
      setClosed={() => {
        dispatch(AppSetConfirmed(false))
        dispatch(SetNotification(false))
      }}
    >
      <div className='flex w-full h-3/4  mb-1'>
        <CustomText
          className='text-sm text-start'
          text={states.App.notificationMessage}
        />
      </div>
      <div className='flex w-full h-1/4 items-end justify-end'>
        <CustomActionButton className='w-1/6'
          onClick={() => {
            dispatch(AppSetConfirmed(false))
            dispatch(SetNotification(false))
          }}
        >
          No
        </CustomActionButton>
        <CustomActionButton className='w-1/6 ml-0.5'
          onClick={() => {
            dispatch(AppSetConfirmed(true))
          }}
        >
          Yes
        </CustomActionButton>
      </div>
    </CustomBox>
  )
}

export default CustomAlert
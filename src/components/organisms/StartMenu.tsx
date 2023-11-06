'use client'
import React from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'

const StartMenu = () => {

  const {states,dispatch} = useStore()

  return (
    <CustomBox 
      className={`
      absolute   
      flex flex-col justify-center items-center h-2/3 w-96 z-40
      top-1/3 -mt-8
      ${states.Tasks.isStartMenuOpen ? ' left-0' : 'hidden'}
      `}
      tittle='Menu'
      disableClose
      disableMaximize
      disableMinimize
    >
      Start Menu
    </CustomBox>
  )
}

export default StartMenu
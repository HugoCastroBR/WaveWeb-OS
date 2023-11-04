'use client'
import React, { useRef } from 'react'
import CustomText from './CustomText'
import wait from '@/utils/wait'

interface CustomWindowHeaderButton {
  type: 'close' | 'minimize' | 'maximize';
  disabled?: boolean;
  onClick?: () => void;
}
const CustomWindowHeaderButton = (
  { 
    type,
    disabled,
    onClick
  }: CustomWindowHeaderButton
) => {

  const [clicked, setClicked] = React.useState(false)

  const HandlerOnClick = async () => {
    onClick && onClick()
    setClicked(true)
    await wait(300)
    setClicked(false)
  }

  const CloseContent = () => {
    return (
      <CustomText
        text=''
        className={`font-bold text-xl   text-gray-900 i-mdi-close-thick
        font-syncopate duration-100 ${clicked && "text-gray-800"}`}
      />
    )
  }

  const MaxContent = () => {
    return (
      <CustomText
        text=''
        className={`font-bold text-xl   text-gray-900 i-mdi-window-maximize
        font-syncopate duration-100 ${clicked && "text-gray-800"}`}
      />
    )
  }

  const MinContent = () => {
    return (
      <CustomText
        text=''
        className={`font-bold text-xl mt-2  text-gray-900 i-mdi-window-minimize
        font-syncopate duration-100 ${clicked && "text-gray-800"}`}
      />
    )
  }
  const renderButtonContent = () => {
    switch (type) {
      case 'close':
        return CloseContent()
      case 'minimize':
        return MinContent()
      case 'maximize':
        return MaxContent()
    }
  }



  return (
    <button className={`
    flex bg-gray-300 w-6 h-6 z-50 
    border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
    border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
    justify-center items-center
    duration-300 ease-in-out transform mb-px ml-px
    ${clicked && "border-t-gray-800 border-l-gray-800 border-r-gray-100 border-b-gray-100"}
    `}
    onClick={HandlerOnClick}
    >

      {renderButtonContent()}
    </button>
  )
}

export default CustomWindowHeaderButton
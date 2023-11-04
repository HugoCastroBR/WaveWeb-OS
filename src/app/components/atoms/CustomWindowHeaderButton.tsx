'use client'
import React, { useRef } from 'react'
import CustomText from './CustomText'
import wait from '@/utils/wait'

interface CustomWindowHeaderButton {
  type: 'close' | 'minimize' | 'maximize';
  disabled?: boolean;
}
const CustomWindowHeaderButton = (
  { type,disabled }: CustomWindowHeaderButton
) => {

  const [clicked, setClicked] = React.useState(false)

  const HandlerOnClick = async () => {
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
    drop-shadow-sm shadow-sm shadow-gray-800 justify-center items-center
    duration-100 ease-in-out transform 
    focus:border-dotted focus:border-inherit focus:outline-none focus:border-gray-700 focus:border-spacing-1
    ${clicked && "border-t-gray-300 border-b-2 border-l-gray-300 border-b-gray-300 border-r-gray-300 scale-95 "}
    `}
    onClick={HandlerOnClick}
    >

      {renderButtonContent()}
    </button>
  )
}

export default CustomWindowHeaderButton
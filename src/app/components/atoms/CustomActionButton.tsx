'use client'
import wait from '@/utils/wait'
import React from 'react'
interface CustomActionButtonProps {
  className?: string
  onClick?: () => void,
  children: React.ReactNode
}
const CustomActionButton = ({
  className,
  onClick,
  children
}:CustomActionButtonProps) => {

  const [clicked, setClicked] = React.useState(false)

  const HandlerOnClick = async () => {
    setClicked(true)
    await wait(300)
    setClicked(false)
  }

    return (
      <button className={` ${className}
      flex bg-gray-300 z-50 
      border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
      border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
      drop-shadow-sm shadow-sm shadow-gray-800 justify-center items-center
      duration-100 ease-in-out transform 
      focus:border-dotted focus:border-inherit focus:outline-none focus:border-gray-700 focus:border-spacing-1  
      ${clicked && "border-t-gray-300 border-b-2 border-l-gray-300 border-b-gray-300 border-r-gray-300 scale-95 "}
      `}
      onClick={HandlerOnClick}
      >

        {children}
      </button>
    )
}

export default CustomActionButton
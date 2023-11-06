'use client'
import wait from '@/utils/wait'
import Link from 'next/link'
import React from 'react'
interface CustomActionButtonProps {
  className?: string
  onClick?: () => void,
  children: React.ReactNode
  href?: string
  disabled?: boolean
}
const CustomActionButton = ({
  className,
  onClick,
  children,
  href,
  disabled
}:CustomActionButtonProps) => {

  const [clicked, setClicked] = React.useState(false)

  const HandlerOnClick = async () => {
    onClick && onClick()
    setClicked(true)
    await wait(300)
    setClicked(false)
  }

  if(disabled) return (
    <button className={` ${className}
      flex bg-gray-400 z-50 
      border-t-2 border-t-gray-800 border-l-2 border-l-gray-800
      border-r-2 border-r-gray-100 border-b-2 border-b-gray-100
      justify-center items-center
      duration-100 ease-in-out transform 
      focus:outline-none  
      ${clicked && "border-t-gray-800 border-l-gray-800 border-r-gray-100 border-b-gray-100"}
      `}
      disabled
    >
      {children}
    </button>
  )

  if(href) return (
    <Link href={href}>
      <button className={` ${className}
        flex bg-gray-300 z-50 
        border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
        border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
        justify-center items-center
        duration-100 ease-in-out transform 
        focus:outline-none  
        ${clicked && "border-t-gray-800 border-l-gray-800 border-r-gray-100 border-b-gray-100"}
        `}
        onClick={HandlerOnClick}
      >
        {children}
    </button>
    </Link>
  )

    return (
      <button className={` ${className}
      flex bg-gray-300 z-50 
      border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
      border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
      justify-center items-center
      duration-100 ease-in-out transform 
      focus:outline-none  
      ${clicked && "border-t-gray-800 border-l-gray-800 border-r-gray-100 border-b-gray-100"}
      `}
      onClick={(e) => {
        e.preventDefault()
        HandlerOnClick()
      }}
      >
        {children}
      </button>
    )
}

export default CustomActionButton
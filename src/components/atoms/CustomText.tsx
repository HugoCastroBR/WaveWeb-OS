import React from 'react'


interface CustomTextProps {
  text: string
  className?: string
}
const CustomText = (
  { text, className }: CustomTextProps
) => {


  return (
    <span className={`${className}`}>{text}</span>
  )
}

export default CustomText
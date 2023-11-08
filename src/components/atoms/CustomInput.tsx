'use client'
import React, { ChangeEvent, useEffect } from 'react'

interface CustomInputProps {
  className?: string
  label: string
  onChange?: (value:string | ChangeEvent<HTMLInputElement>) => void | ChangeEvent<HTMLInputElement>
  type?: string,
  value?: string
  accept?: string
}

const CustomInput = ({
  className,
  label,
  onChange,
  type,
  value,
  accept
}:CustomInputProps) => {

  const [inputValue, setInputValue] = React.useState(value || '')
  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  return (
    <>
      <label className="text-base first-letter:underline" htmlFor={`text-input-${label}`}>
        {label}
      </label>
      {type === 'file' ?
      <input 
      onChange={(e) => {
        if(onChange) {
          onChange(e)
        }
      }}
      type={type || 'text'}
      id={`text-input-${label}`}
      accept={accept}
      className={`
        file:border-2 file:bg-gray-300 
        file:border-t-white  file:border-l-white
        file:border-r-black  file:border-b-black
        file:focus:outline-none file:px-1 py-0.5
        file:focus:bg-blue-800 file:focus:text-gray-100
        file:shadow-none file:drop-shadow-none file:from-transparent file:to-transparent
        file:cursor-pointer    
      ${className} `}
      />
      :
      <input 
      onChange={(e) => {
        setInputValue(e.target.value)
        if(onChange) {
          onChange(e.target.value)
        }
      }}
      type={type || 'text'}
      id={`text-input-${label}`}
      value={inputValue}
      className={`
      border-2 flex flex-col bg-gray-200 
      border-t-gray-800  border-l-gray-800
      border-r-gray-100  border-b-gray-100
      focus:outline-none p-px 
      focus:bg-blue-800 focus:text-gray-100
      ${className} `}
    />}
    </>
  )
}

export default CustomInput
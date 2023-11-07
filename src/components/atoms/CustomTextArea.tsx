
'use client'
import React, { useEffect } from 'react'

interface CustomTexeAreaProps {
  className?: string
  onChange?: (value:string) => void
  value?: string
  label?: string
}

const CustomTextArea = ({
    className,
    onChange,
    value,
    label
  }:CustomTexeAreaProps
) => {
  const [inputValue, setInputValue] = React.useState(value || '')
  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  return (
    <>
      {label &&
        <label className="text-base first-letter:underline" htmlFor={`text-input-${label}`}>
          {label}
        </label>
      }
      <textarea 
      onChange={(e) => {
        setInputValue(e.target.value)
        if(onChange) {
          onChange(e.target.value)
        }
      }}
      value={inputValue}
      className={`
      border-2 flex flex-col bg-gray-200 
      border-t-gray-800  border-l-gray-800
      border-r-gray-100  border-b-gray-100
      focus:outline-none p-px w-full h-full
      ${className} `}
      />
    </>
  )
}

export default CustomTextArea
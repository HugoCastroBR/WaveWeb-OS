import React from 'react'

interface CustomInputProps {
  className?: string
  label: string
  defaultValue?: string
}

const CustomInput = ({
  className,
  label,
  defaultValue
}:CustomInputProps) => {
  return (
    <>
      <label className="text-base first-letter:underline" htmlFor={`text-input-${label}`}>
        {label}
      </label>
      <input type="text" id={`text-input-${label}`}
        defaultValue={defaultValue || ''}
        className={`
        border-2 flex flex-col bg-gray-300 
        border-t-gray-800  border-l-gray-800
        border-r-gray-100  border-b-gray-100
        focus:outline-none p-px 
        focus:bg-blue-800 focus:text-gray-100
        ${className} `}
      />
    </>
  )
}

export default CustomInput
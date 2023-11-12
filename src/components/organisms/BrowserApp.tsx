'use client'

import React from 'react'
import WindowComponent from '../molecules/WindowComponent'

const BrowserApp = () => {



  return (
    <WindowComponent
      tittle='Browser'
      uuid='browser'
      className='w-1/2 h-2/3'
      resize
    >
      <div className='bg-red-100 h-full w-full flex flex-col'>
        <div className='flex flex-col h-1/6'>
          <div className='bg-green-100 h-1/2'>
            tabs
          </div>
          <div className='bg-violet-100 h-1/2 flex w-full' >
            <div className='bg-violet-200 h-full w-2/12'>
              Back/Next/Refresh
            </div>
            <div className='bg-violet-300 h-full w-9/12'>
              URL INPUT
            </div>
            <div className='bg-violet-500 h-full w-1/12'>
              OTHERS
            </div>
          </div>
        </div>
        <div className='bg-blue-100 w-full h-5/6'>
          content
        </div>
      </div>
    </WindowComponent>
  )
}

export default BrowserApp
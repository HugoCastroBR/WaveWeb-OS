'use client'
import React from 'react'
import useStore from './useStore'

const useSystemProcess = () => {


  const {states, dispatch} = useStore()
  
  
  const CreateProcess = async (processName:string) => {
    console.log('CreateProcess')
    
  }


}

export default useSystemProcess
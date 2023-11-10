'use client'
import React, { useEffect } from 'react'
import useStore from './useStore'
import { processInstance } from '@/store/reducers/process'
import { ProcessAddProcessInstance } from '@/store/actions'
import usePath from './usePath'

const useSystemProcess = () => {


  const {states, dispatch} = useStore()
  const { fs } = usePath()
  
  const CreateProcess = async (Process:processInstance) => {
    const id = states.Process.totalInstances + 1
    dispatch(ProcessAddProcessInstance({
      ...Process,
      id,
    }))
  }



  return { CreateProcess }

}

export default useSystemProcess
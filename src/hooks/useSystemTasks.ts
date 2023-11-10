import React, { useEffect } from 'react'
import useStore from './useStore'
import { SystemAddSelectedItem, SystemRemoveSelectedItem } from '@/store/actions'

export type SystemTask = {
  id: number
  path: string
}

const useSystemTasks = () => {

  const {states, dispatch} = useStore()


  const AddSelectedItem = (item: SystemTask) => {
    dispatch(SystemAddSelectedItem(item))
  }
  const RemoveSelectedItem = (item: SystemTask) => {
    dispatch(SystemRemoveSelectedItem(item))
  }

  

  return { AddSelectedItem, RemoveSelectedItem }
}

export default useSystemTasks
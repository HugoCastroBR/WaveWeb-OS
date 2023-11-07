'use client'
import React, { useEffect, useState } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMaximized, FolderSetIsFolderOpen, FolderSetIsFolderMinimized, NoteSetNotes, NoteSetCurrentNote, NoteSetIsEdit, TasksSetIsNotePadTaskOpen, TasksSetIsNotePadTaskMinimized } from '@/store/actions'
import { NoteProps, getNotes } from '@/api'
import DesktopIcon from '../molecules/DesktopIcon'

const NoteFolder = () => {

  const {states, dispatch} = useStore()


  const handleLoadNotes = async () => {
    const res = await getNotes()
    dispatch(NoteSetNotes(res))
  }

  useEffect(() => {
    handleLoadNotes()
  },[states.Note.Notes])
  
  useEffect(() => {
    handleLoadNotes()
  }, [states.Folders.find(folder => folder.title === 'My Notes')?.isOpen])

  return (
    <CustomBox
      tittle='My Notes'
      icon='/assets/icons/note-folder.png'
      className={`
      absolute top-64 left-64 w-1/4 h-3/6 bg-gray-300
      mb-1 flex flex-col overflow-x-hidden overflow-y-auto
      `}
      closed={!states.Folders.find(folder => folder.title === 'My Notes')?.isOpen}
      minimized={states.Folders.find(folder => folder.title === 'My Notes')?.isMinimized}
      maximized={states.Folders.find(folder => folder.title === 'My Notes')?.isMaximized}
      setMaximized={() => {
        if(!states.Folders.find(folder => folder.title === 'My Notes')?.isMaximized) {
          dispatch(FolderSetIsFolderMaximized('My Notes',true))
        } else {
          dispatch(FolderSetIsFolderMaximized('My Notes',false))
        }
      }}
      setClosed={() => {
        dispatch(FolderSetIsFolderOpen('My Notes',false))
        dispatch(FolderSetIsFolderMinimized('My Notes',false))
      }}
      setMinimized={() => {
        dispatch(FolderSetIsFolderMinimized('My Notes',true))
      }}
    >
      <div className='h-min  flex flex-wrap justify-start items-start'>
        {states.Note.Notes.map(note => {
          return (
            <DesktopIcon
              key={note.id}
              imgSrc='/assets/icons/note-pad-task.png'
              text={note.title}
              onClick={() => {
                console.log(note.title)
                dispatch(NoteSetCurrentNote({
                  id: note.id,
                  title: note.title,
                  content: note.content,
                  createdAt: note.createdAt,
                  updatedAt: note.updatedAt
                }))
                dispatch(NoteSetIsEdit(true))
                dispatch(TasksSetIsNotePadTaskOpen(true))
                dispatch(TasksSetIsNotePadTaskMinimized(false))
              }}
            />
          )
        })}
      </div>
    </CustomBox>
  )
}

export default NoteFolder
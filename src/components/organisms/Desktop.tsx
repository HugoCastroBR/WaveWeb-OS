'use client'
import React, { use, useEffect, useState } from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMinimized, FolderSetIsFolderOpen, PathClearSelectedItems, PathSetPath, ProcessAddProcessItem, ProcessSetProcessItemIsFocused, SystemExplorerSetIsOpen, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsNotePadTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import TodoApp from './TodoApp'
import NotePadApp from './NotePadApp'
import NoteFolder from './NoteFolder'
import CustomAlert from './CustomAlert'
import useStorage from '@/hooks/useStorage'
import CustomActionButton from '../atoms/CustomActionButton'
import { getExtension, uuid, verifyIfIsFile } from '@/utils/files'
import CustomBox from '../molecules/CustomBox'
import RightMenuItem from '../molecules/RightMenuItem'
import NoContent from '../molecules/NoContent'
import WindowComponent from '../molecules/WindowComponent'
import Note from '../molecules/Note'
import { processItemProps } from '@/store/reducers/process'
import wait from '@/utils/wait'
import CustomInput from '../atoms/CustomInput'


interface DesktopItemProps {
  onClick?: () => void
  imgSrc: string
  text: string
}


const Desktop = () => {


  const { fs } = useStorage()

  // Window Items
  const DesktopOpenItems = () => {
    return (
      <>
        <CustomAlert />
        {/* <NoteFolder /> */}
        <NotePadApp />
        <TodoApp />
        <MusicApp />
      </>
    )
  }


  // Desktop Icons
  const DesktopItemProps: DesktopItemProps[] = [
    {
      imgSrc: '/assets/icons/music-task.png',
      text: 'Music',
      onClick() {
        dispatch(TasksSetIsMusicTaskOpen(true))
        dispatch(TasksSetIsMusicTaskMinimized(false))
      },
    },
    {
      imgSrc: '/assets/icons/todo-task.png',
      text: 'Todo List',
      onClick() {
        dispatch(TasksSetIsTodoTaskOpen(true))
        dispatch(TasksSetIsTodoTaskMinimized(false))
      }
    },
    // {
    //   imgSrc: '/assets/icons/note-pad-task.png',
    //   text: 'Notepad',
    //   onClick() {
    //     dispatch(TasksSetIsNotePadTaskOpen(true))
    //     dispatch(TasksSetIsTodoTaskMinimized(false))
    //   }
    // },
    // {
    //   imgSrc: '/assets/icons/note-folder.png',
    //   text: 'My Notes',
    //   onClick() {
    //     dispatch(FolderSetIsFolderOpen('My Notes', true))
    //     dispatch(FolderSetIsFolderMinimized('My Notes', false))
    //   }
    // },
  ]


  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)


  const reloadPath = async () => {
    await wait(100)
    console.log('reload')
    await fs?.readdir('/', (err, files) => {
      console.log("reloading Desktop")
      setDesktopFiles(files.map((file) => {
        return {
          path: file,
          isFile: verifyIfIsFile(file),
        }
      }))
    })

    await fs?.readdir(currentPath, (err, files) => {
      if (err) console.log(err)
      else {
        dispatch(PathSetPath([{
          path: currentPath,
          files: files.map((file) => {
            return {
              path: file,
              isFile: verifyIfIsFile(file),
            }
          })
        }]))
      }
    })
  };





  const MenuContext = () => {


    return (
      <div
        className={`
        bg-gray-500 
          drop-shadow-md shadow-md shadow-gray-800 
          flex flex-col w-40 z-40  
          bg-opacity-5 backdrop-filter backdrop-blur-sm
          py-2
      `}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 100,
        }}>

        <RightMenuItem
          text='New Text File'
          onClick={() => {
            setIsNewTextNameInputOpen(true)

            reloadPath()
            dispatch(PathClearSelectedItems())
            fs?.readdir('/', (err, files) => {
              setDesktopFiles(files.map((file) => {
                return {
                  path: file,
                  isFile: verifyIfIsFile(file),
                }
              }))
            })
          }}
        />
        <RightMenuItem
          text='New Folder'
          onClick={() => {
            setIsNewFolderNameInputOpen(true)
            reloadPath()
            dispatch(PathClearSelectedItems())
            fs?.readdir('/', (err, files) => {
              setDesktopFiles(files.map((file) => {
                return {
                  path: file,
                  isFile: verifyIfIsFile(file),
                }
              }))
            })
          }
          }
        />
        <RightMenuItem
          text='Delete'
          onClick={() => {
            states.Path.selectedItems.forEach((item) => {
              const itemToDelete = `${currentPath}/${item}`.replaceAll('//', '/')

              if (verifyIfIsFile(itemToDelete)) {
                fs?.unlink(itemToDelete, (err) => {
                  if (err) console.log(err)
                  else {
                    console.log('Deleted: ' + itemToDelete)
                  }
                })
              } else {
                fs?.rmdir(itemToDelete, (err) => {
                  if (err) console.log(err)
                  else {
                    console.log('Deleted: ' + itemToDelete)
                  }
                })
              }
            })
            reloadPath()
            dispatch(PathClearSelectedItems())
            fs?.readdir('/', (err, files) => {
              setDesktopFiles(files.map((file) => {
                return {
                  path: file,
                  isFile: verifyIfIsFile(file),
                }
              }))
            })
            // DeleteSelects()
          }}
        />
      </div>
    );
  };



  const { states, dispatch } = useStore()


  const [currentPath, setCurrentPath] = useState('/')

  const readPath = async (path: string) => {
    fs?.readdir(path, (err, files) => {
      if (err) console.log(err)
      else {
        dispatch(PathSetPath([{
          path,
          files: files.map((file) => {
            return {
              path: file,
              isFile: verifyIfIsFile(file),
            }
          })
        }]))
      }
    })
  };


  const goBack = async () => {
    dispatch(PathClearSelectedItems())
    if (currentPath === '/') {
      // Você já está na raiz, não pode voltar mais.
      return;
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    const parentPath = `/${pathSegments.slice(0, -1).join('/')}`;

    fs?.readdir(parentPath, (err, files) => {
      if (err) {
        throw err;
      }
      dispatch(PathSetPath([{
        path: parentPath,
        files: files.map((file) => {
          return {
            path: file,
            isFile: verifyIfIsFile(file),
          }
        })
      }]))
      setCurrentPath(parentPath);
    });
  };

  useEffect(() => {
    dispatch(PathClearSelectedItems())
    readPath(currentPath)
    fs?.readdir('/', (err, files) => {
      setDesktopFiles(files.map((file) => {
        return {
          path: file,
          isFile: verifyIfIsFile(file),
        }
      }))
    })
  }, [currentPath])

  useEffect(() => {
    readPath(currentPath)
    fs?.readdir('/', (err, files) => {
      setDesktopFiles(files.map((file) => {
        return {
          path: file,
          isFile: verifyIfIsFile(file),
        }
      }))
    })
    // console.log("load fs")
  }, [fs])

  const handlerFileType = (item: processItemProps) => {
    switch (item.extension) {
      case 'txt':
        return <Note
          {...item}
          icon='/assets/icons/note-pad-task.png'
          onSaved={() => {
            fs?.readdir('/', (err, files) => {
              setDesktopFiles(files.map((file) => {
                return {
                  path: file,
                  isFile: verifyIfIsFile(file),
                }
              }))
            })
          }}
        />
      default:
        return <>text</>
    }
  }


  type FileItem = {
    path: string;
    isFile: boolean;
  };
  const NewTextNameInput = () => {
    const [textName, setTextName] = useState('New Text')
    return (
      <CustomBox
        tittle='New Text'
        className='!z-40 w-60 h-36 bg-gray-100 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'
        disableMaximize
        disableMinimize
        setClosed={() => {
          setIsNewTextNameInputOpen(false)
        }}
        closed={!IsNewTextNameInputOpen}
      >
        <CustomInput
          label='Text file name: '
          value='New Text'
          onChange={(e) => {
            setTextName(String(e))
          }}
        />
        <div
          className='flex w-full justify-end mt-1'
        >
          <CustomActionButton
            className='p-0.5'
            onClick={() => {
              const filename = `${textName}.txt`
              console.log("create: ", filename)
              fs?.writeFile(`${currentPath}/${filename}`, '', (err) => {
                if (err) console.log(err)
                else {
                  console.log('File created', `${currentPath}/${filename}`)
                }
              })
              setIsNewTextNameInputOpen(false)
              reloadPath()
            }}
          >
            Create
          </CustomActionButton>
        </div>
      </CustomBox>
    )
  }



  const NewFolderInput = () => {
    const [newFolderName, setNewFolderName] = useState('New Folder')
    return (
      <CustomBox
        tittle='New Text'
        className='!z-40 w-60 h-36 bg-gray-100 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'
        disableMaximize
        disableMinimize
        setClosed={() => {
          setIsNewFolderNameInputOpen(false)
        }}
        closed={!IsNewFolderNameInputOpen}
      >
        <CustomInput
          label='Folder name: '
          value='New Folder'
          onChange={(e) => {
            setNewFolderName(String(e))
          }}
        />
        <div
          className='flex w-full justify-end mt-1'
        >
          <CustomActionButton
            className='p-0.5'
            onClick={() => {
              const foldername = `${newFolderName}`
              console.log("create: ", foldername)
              fs?.mkdir(`${currentPath}/${foldername}`, (err) => {
                if (err) console.log(err)
                else {
                  console.log('Folder created', `${currentPath}/${foldername}`)
                }
              })
              setIsNewFolderNameInputOpen(false)
              reloadPath()
            }}
          >
            Create
          </CustomActionButton>
        </div>
      </CustomBox>
    )
  }

  const ConfirmDeleteInput = () => {
    return (
      <CustomBox
        tittle='Confirm Delete'
        className='!z-40 w-60 h-36 bg-gray-100 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'
        disableMaximize
        disableMinimize
        setClosed={() => {
          setIsConfirmDeleteInputOpen(false)
        }}
        closed={!IsConfirmDeleteInputOpen}
      >

        <div
          className='flex w-full h-full justify-end mt-1'
        >
          <CustomActionButton
            className='p-0.5'
            onClick={() => {
              const deleteItems = [states.Path.selectedItems]
              console.log("delete: ", deleteItems)
            }}
          >
            Confirm
          </CustomActionButton>
        </div>
      </CustomBox>
    )
  }

  const [DesktopFiles, setDesktopFiles] = useState<FileItem[]>([])
  const [IsNewTextNameInputOpen, setIsNewTextNameInputOpen] = useState(false)
  const [IsNewFolderNameInputOpen, setIsNewFolderNameInputOpen] = useState(false)
  const [IsConfirmDeleteInputOpen, setIsConfirmDeleteInputOpen] = useState(false)

  useEffect(() => {
    fs?.readdir('/', (err, files) => {
      setDesktopFiles(files.map((file) => {
        return {
          path: file,
          isFile: verifyIfIsFile(file),
        }
      }))
    })
  }, [states.Path.selectedItems])

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        setX(e.pageX)
        setY(e.pageY)
        setIsRightMenuOpen(true)
      }}
      onClick={() => {
        setIsRightMenuOpen(false)
      }}


      className='
      w-full h-full flex flex-col
    '
    >
      {
        isRightMenuOpen &&
        <MenuContext />
      }

      {
        IsNewTextNameInputOpen &&
        <NewTextNameInput />
      }
      {
        IsNewFolderNameInputOpen &&
        <NewFolderInput />
      }
      {
        IsConfirmDeleteInputOpen &&
        <ConfirmDeleteInput />
      }

      {
        DesktopOpenItems()
      }

      {
        states.Process.items.length > 0 &&
        states.Process.items.map((item) => {
          if (item.isOpen) {
            return (
              handlerFileType(item)
            )
          }
        })
      }

      <DesktopIcon
        file={'Explorer'}
        pathname={`/`.replaceAll('//', '/')}
        onDoubleClick={() => {
          dispatch(SystemExplorerSetIsOpen(true))
        }}
      />

      {DesktopItemProps.map((item, index) => {
        return (
          <DesktopIcon
            img={item.imgSrc}
            deprecated
            key={item.text}
            file={item.text}
            pathname={`/`.replaceAll('//', '/')}
            onDoubleClick={() => {
              item.onClick()
            }}
          />
        )
      })
      }

      {
        DesktopFiles.map((file, index) => {
          return (
            <DesktopIcon
              key={file.path}
              file={file.path}
              pathname={`/${file.path}`.replaceAll('//', '/')}
              onDoubleClick={(filename) => {
                if (!verifyIfIsFile(filename)) {
                  dispatch(SystemExplorerSetIsOpen(true))
                }
                const itemUuid = uuid(6)
                if (verifyIfIsFile(file.path)) {
                  dispatch(ProcessAddProcessItem({
                    uuid: itemUuid,
                    name: filename,
                    title: filename,
                    path: `/${filename}`.replaceAll('//', '/'),
                    extension: getExtension(filename),
                    isOpen: true,
                    isMinimized: false,
                  }))
                  dispatch(ProcessSetProcessItemIsFocused({
                    uuid: itemUuid,
                    isFocused: true
                  }))
                } else {
                  setCurrentPath(`/${filename}`.replaceAll('//', '/'))
                }
              }}
            />
          )
        })
      }





      {states.Path.paths.map((path, index) => {
        return (
          <>
            <WindowComponent
              uuid={'explorer'}
              tittle='Explorer'
              key={index}
              className='bg-gray-100 w-5/6 h-4/6 !z-20'
              closed={!states.System.explorer.isOpen}
              setClosed={() => {
                dispatch(SystemExplorerSetIsOpen(!states.System.explorer.isOpen))
              }}
            >
              <div className='
              flex w-full mb-2 h-10 bg-gray-300 items-center 
              border-b-2 border-b-gray-800 border-l-2 border-l-gray-100
              border-r-2 border-r-gray-800 border-t-2 border-t-gray-100
              overflow-hidden
              '>
                <CustomActionButton
                  onClick={() => {
                    readPath(currentPath)
                  }}
                  className='
                    w-20 h-12 -ml-1 bg-gray-300
                  '
                >
                  Load
                </CustomActionButton>
                <CustomActionButton
                  onClick={() => {
                    goBack()
                  }}
                  className='
                    w-20 h-12 bg-gray-300
                  '
                >
                  Go Back
                </CustomActionButton>
                <span className='p-1 '>{currentPath}</span>
              </div>
              {path.files.map((file, index) => {
                return (
                  <DesktopIcon
                    key={file.path}
                    file={file.path}
                    pathname={`${currentPath}/${file.path}`.replaceAll('//', '/')}
                    onDoubleClick={(filename) => {
                      // console.log(`path: ${currentPath}/${filename}`.replaceAll('//','/'))
                      const itemUuid = uuid(6)
                      if (verifyIfIsFile(file.path)) {
                        dispatch(ProcessAddProcessItem({
                          uuid: itemUuid,
                          name: filename,
                          title: filename,
                          path: `${currentPath}/${filename}`.replaceAll('//', '/'),
                          extension: getExtension(filename),
                          isOpen: true,
                          isMinimized: false,
                        }))
                        dispatch(ProcessSetProcessItemIsFocused({
                          uuid: itemUuid,
                          isFocused: true
                        }))
                      } else {
                        setCurrentPath(`${currentPath}/${filename}`.replaceAll('//', '/'))
                      }
                    }}
                  />
                )
              })}
            </WindowComponent>
          </>
        )
      })}

    </div>
  )
}

export default Desktop
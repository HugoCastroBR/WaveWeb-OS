'use client'
import React, { use, useEffect, useState } from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { GalleryAppSetIsMinimized, GalleryAppSetIsOpen, PathClearSelectedItems, PathSetPath, ProcessAddProcessItem, ProcessSetProcessItemIsFocused, SystemExplorerSetIsMaximized, SystemExplorerSetIsMinimized, SystemExplorerSetIsOpen, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsNotePadTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import TodoApp from './TodoApp'
import NotePadApp from './NotePadApp'
import CustomAlert from './CustomAlert'
import useStorage from '@/hooks/useStorage'
import CustomActionButton from '../atoms/CustomActionButton'
import { getExtension, removeExtension, uuid, verifyIfIsFile } from '@/utils/files'
import CustomBox from '../molecules/CustomBox'
import RightMenuItem from '../molecules/RightMenuItem'
import WindowComponent from '../molecules/WindowComponent'
import Note from '../molecules/Note'
import { processItemProps } from '@/store/reducers/process'
import wait from '@/utils/wait'
import CustomInput from '../atoms/CustomInput'
import GalleryApp from './GalleryApp'

interface DesktopItemProps {
  onClick?: () => void
  imgSrc: string
  text: string
}


const Desktop = () => {

  const { fs } = useStorage()
  const { states, dispatch } = useStore()
  // Window Items
  const DesktopOpenItems = () => {
    return (
      <>
        <GalleryApp />
        <CustomAlert />
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
    {
      imgSrc:'/assets/icons/image-app.png',
      text:'Gallery',
      onClick() {
        dispatch(GalleryAppSetIsOpen(true))
        dispatch(GalleryAppSetIsMinimized(false))
      },
    }
  ]

  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const reloadPath = async () => {
    await wait(100)
    
    await fs?.readdir('/', (err, files) => {
      
      setDesktopFiles(files.map((file) => {
        return {
          path: file,
          isFile: verifyIfIsFile(file),
        }
      }))
    })

    await fs?.readdir(currentPath, (err, files) => {
      if (err)  console.log(err)
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
          text='Rename'
          disabled={states.Path.selectedItems.length !== 1}
          onClick={() => {
            // setIsNewFolderNameInputOpen(true)
            const itempath = `${currentPath}/${states.Path.selectedItems[0]}`.replaceAll('//', '/')
            setRenameItemName(states.Path.selectedItems[0])
            setRenameItemPath(itempath)
            setIsRenameInputOpen(true)
            // reloadPath()
            // dispatch(PathClearSelectedItems())
            // fs?.readdir('/', (err, files) => {
            //   setDesktopFiles(files.map((file) => {
            //     return {
            //       path: file,
            //       isFile: verifyIfIsFile(file),
            //     }
            //   }))
            // })
          }
          }
        />
        <RightMenuItem
          text='Delete'
          disabled={states.Path.selectedItems.length === 0}
          onClick={() => {
            states.Path.selectedItems.forEach((item) => {
              const itemToDelete = `${currentPath}/${item}`.replaceAll('//', '/')

              if (verifyIfIsFile(itemToDelete)) {
                fs?.unlink(itemToDelete, (err) => {
                  if (err)  console.log(err)
                  else {
                    
                  }
                })
              } else {
                fs?.rmdir(itemToDelete, (err) => {
                  if (err)  console.log(err)
                  else {
                    
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



  const [renameItemPath, setRenameItemPath] = useState('')
  const [renameItemName, setRenameItemName] = useState('')

  const [currentPath, setCurrentPath] = useState('/')

  const readPath = async (path: string) => {
    fs?.readdir(path, (err, files) => {
      if (err)  console.log(err)
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
      if (err){
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
    // 
  }, [fs])

  const handlerFileType = (item: processItemProps) => {
    switch (item.extension) {
      case 'txt':
        return <Note
          onClick={() => {
            dispatch(PathClearSelectedItems())
          }}
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
              dispatch(PathClearSelectedItems())
              const filename = `${textName}.txt`
              
              fs?.writeFile(`${currentPath}/${filename}`, '', (err) => {
                if (err)  console.log(err)
                else {
                  
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

  const RenameItemInput = () => {
    const [newName, setNewName] = useState(verifyIfIsFile(renameItemName) ? removeExtension(renameItemName) : renameItemName)
    const extension = getExtension(verifyIfIsFile(renameItemName) ? getExtension(renameItemName) : renameItemName)

    return (
      <CustomBox
        tittle='New Text'
        className='!z-40 w-60 h-36 bg-gray-100 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2'
        disableMaximize
        disableMinimize
        setClosed={() => {
          setIsRenameInputOpen(false)
        }}
        closed={!IsRenameInputOpen}
      >
        <CustomInput
          label='New name: '
          value={newName}
          onChange={(e) => {
            // setTextName(String(e))
            setNewName(String(e))
          }}
        />
        <div
          className='flex w-full justify-end mt-1'
        >
          <CustomActionButton
            className='p-0.5'
            onClick={() => {
              const isFile = verifyIfIsFile(renameItemName)
              let toRenameAs = ''
              if(isFile){
                toRenameAs = `${currentPath}/${newName}.${extension}`.replaceAll('//', '/')
              }else{
                toRenameAs = `${currentPath}/${newName}`.replaceAll('//', '/')
              }
              
              const toRename = `${currentPath}/${renameItemName}`.replaceAll('//', '/')
              console.log(toRename,toRenameAs)
              fs?.rename(toRename, toRenameAs, (err) => {
                if (err)  console.log(err)
              })
              dispatch(PathClearSelectedItems())
              setIsRenameInputOpen(false)
              reloadPath()
            }}
          >
            Rename
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
              dispatch(PathClearSelectedItems())
              const foldername = `${newFolderName}`
              
              fs?.mkdir(`${currentPath}/${foldername}`, (err) => {
                if (err)  console.log(err)
                else {
                  
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
  const [IsRenameInputOpen, setIsRenameInputOpen] = useState(false)


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
        IsRenameInputOpen &&
        <RenameItemInput />
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
        native
      />

      {DesktopItemProps.map((item, index) => {
        return (
          <DesktopIcon
            img={item.imgSrc}
            native
            deprecated
            key={`DesktopIcon${index}`}
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
              key={`DesktopFile${index}`}
              uuid={uuid(6)}
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


{/*             Explorer App             */}
      {states.Path.paths.map((path, index) => {
        return (
          <>
            <WindowComponent
              resize
              uuid={'explorer'}
              tittle='Explorer'
              key={`explorer${index}`}
              className='bg-gray-100 w-1/2 h-1/2'
              closed={!states.System.explorer.isOpen}
              setClosed={() => {
                dispatch(SystemExplorerSetIsOpen(!states.System.explorer.isOpen))
              }}
              maximized={states.System.explorer.isMaximized}
              setMaximized={() => {
                dispatch(SystemExplorerSetIsMaximized(!states.System.explorer.isMaximized))
              }}
              minimized={states.System.explorer.isMinimized}
              setMinimized={() => {
                dispatch(SystemExplorerSetIsMinimized(!states.System.explorer.isMinimized))
              }}
              
            >
              <div className='
              flex w-full mb-2 h-8 bg-gray-300 items-center 
              border-b-2 border-b-gray-800 border-l-2 border-l-gray-100
              border-r-2 border-r-gray-800 border-t-2 border-t-gray-100
              overflow-hidden
              '>
                <CustomActionButton
                  onClick={() => {
                    readPath(currentPath)
                  }}
                  className='
                    w-20 h-10 -ml-1 bg-gray-300
                    text-sm font-medium
                  '
                >
                  Refresh
                </CustomActionButton>
                <CustomActionButton
                  onClick={() => {
                    goBack()
                  }}
                  className='
                    w-20 h-10 bg-gray-300
                    text-sm font-medium
                  '
                >
                  Go Back
                </CustomActionButton>
                <span className='p-1 text-sm font-medium'>{currentPath}</span>
              </div>
              {path.files.map((file, index) => {
                return (
                  <DesktopIcon
                    key={`path${index}`}
                    file={file.path}
                    pathname={`${currentPath}/${file.path}`.replaceAll('//', '/')}
                    onDoubleClick={(filename) => {
                      // )
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
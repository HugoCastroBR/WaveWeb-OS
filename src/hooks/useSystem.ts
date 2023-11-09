import React, { useEffect } from 'react'
import useStore from './useStore'
import useStorage from './useStorage'
import { SystemClearSelectedItems } from '@/store/actions'
import { verifyIfIsFile } from '@/utils/files'


const useSystem = () => {
  const {states, dispatch} = useStore()
  const { fs } = useStorage()

  const [mainPath, setMainPath] = React.useState<string[]>([])
  const [mainPathLoaded, setMainPathLoaded] = React.useState<boolean>(false)
  const [currentPath, setCurrentPath] = React.useState<string>('')
  const [contentOfCurrentPath, setContentOfCurrentPath] = React.useState<string[]>([])

  useEffect(() => {
    LoadMainPath()
  }, [])

  

  const LoadMainPath = async () => {
    dispatch(SystemClearSelectedItems())

    fs?.readdir('/', (err, files) => {
      if (err) {
        throw err;
      }
      if(!mainPathLoaded){
        setContentOfCurrentPath(files)
        setCurrentPath('/')
      }
      
      setMainPathLoaded(true)
    })

  }

  const LoadCurrentPath = async () => {
    dispatch(SystemClearSelectedItems())

    fs?.readdir(`/${currentPath}`, (err, files) => {
      if (err) {
        throw err;
      }
      setContentOfCurrentPath(files)
    })
  }

  const CreateFolder = async (folderName:string) => {
    dispatch(SystemClearSelectedItems())
    if(currentPath === '/'){
      fs?.mkdir(`${folderName}`, (err) => {
        if (err) {
          throw err;
        }
        
        LoadCurrentPath()
      })
      return;
    }
    fs?.mkdir(`${currentPath}/${folderName}`, (err) => {
      if (err) {
        throw err;
      }
      LoadCurrentPath()
    })
  }

  const NavigateTo = async (path:string) => {
    dispatch(SystemClearSelectedItems())
    fs?.readdir(`/${path}`, (err, files) => {
      if (err) {
        throw err;
      }
      setContentOfCurrentPath(files)
      setCurrentPath(path)
    })
    LoadCurrentPath()
  }

  const goBack = async () => {
    dispatch(SystemClearSelectedItems())
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
      setContentOfCurrentPath(files);
      setCurrentPath(parentPath);
    });
  };



  const DeleteSelects = async () => {
    states.System.selectedItems.forEach((item) => {
      if(verifyIfIsFile(item.path)){
        fs?.unlink(`${item.path}`, (err) => {
          if (err) {
            throw err;
          }
          LoadCurrentPath()
        })
      }else{
        fs?.rmdir(`${item.path}`, (err) => {
          if (err) {
            throw err;
          }
          LoadCurrentPath()
        })
      }
    })
  }


  
  
  



  return {DeleteSelects,goBack,currentPath,contentOfCurrentPath, mainPath, CreateFolder,LoadMainPath,NavigateTo }

}

export default useSystem
'use client'
import React, { useEffect, useState } from 'react'
import WindowComponent from '../molecules/WindowComponent'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomInput from '../atoms/CustomInput'
import { deletePicture, getPicture, getPictures, renamePicture, uploadPicture } from '@/api'
import wait from '@/utils/wait'
import useStore from '@/hooks/useStore'
import { GalleryAppSetIsMaximized, GalleryAppSetIsMinimized, GalleryAppSetIsOpen, SystemOsSetBackground } from '@/store/actions'
import CustomBox from '../molecules/CustomBox'
const GalleryApp = () => {

  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imageTitle, setImageTitle] = React.useState('')


  const ConfirmUploadInput = () => {
    return (
      <>
        <CustomInput
          label='Title'
          className='w-28 h-6 flex flex-col text-sm font-semibold text-gray-800'
          onBlur={(value) => {
            console.log(value)
            setImageTitle(value)
          }}
        />
        <CustomActionButton
          className='mt-1 p-px px-4 rounded-sm'
          onClick={async () => {
            await uploadPicture(imageFile as File, imageTitle)
            await wait(300)
            await GetPictures()
            setImageFile(null)
            setImageTitle('')
          }}
        >
          <CustomText text='Send' className='text-sm font-semibold text-gray-800' />
        </CustomActionButton>
      </>
    )
  }

  const PictureUploadInput = () => {
    return (
      <div
        className='
          w-32 h-52 m-2 bg-gray-300 flex justify-center items-start
          border-2 rounded-sm
          border-dashed border-opacity-50 border-gray-400 hover:border-gray-500 duration-300
          overflow-hidden
        '>
        <input
          type="file"
          name="file" id="file"
          className="hidden w-full h-full"
          accept='image/png, image/gif, image/jpeg'
          onChange={(e) => {
            setImageFile(e.target.files?.[0] || null)
          }}
        />
        <label htmlFor="file" className='cursor-pointer flex flex-col justify-start items-center -mt-1'>
          <Image
            src={imageFile ? URL.createObjectURL(imageFile) : '/assets/icons/image-upload.png'}
            alt='upload'
            width={imageFile ? 128 : 64}
            height={imageFile ? 128 : 64}
            className={` ${imageFile ? 'rounded-sm' : 'mt-12'}`}
          />
          {
            imageFile ? (
              <ConfirmUploadInput />
            ) : (
              <CustomText
                text='Upload'
                className='text-lg font-semibold text-gray-800 mt-12'
              />
            )
          }


        </label>
      </div>
    )
  }

  const [loadedPictures, setLoadedPictures] = useState<getPicture[]>([])

  useEffect(() => {
    GetPictures()
  }, [])


  const GetPictures = async () => {
    const res = await getPictures()
    const data: getPicture[] = await res.map((picture) => {
      return {
        imageUrl: picture.imageUrl,
        title: picture.title,
        id: picture.id,
        createdAt: picture.createdAt,
        updatedAt: picture.updatedAt
      }
    })
    setLoadedPictures(data)
  }

  type getPictureProps = getPicture & {
    index: number
  }
  const Picture = ({
    id,
    imageUrl,
    title,
    index,
    createdAt,
    updatedAt
  }: getPictureProps) => {
    return (
      <div
        className='
          w-32 h-52 m-2 bg-gray-300 flex justify-center items-start
          border-2  rounded-sm
          border-opacity-50 border-gray-400 hover:border-gray-500 duration-300
          overflow-hidden
        '
        onDoubleClick={() => {
          setCurrentImageIndex(index)
          setPictureOpened({
            imageUrl,
            title,
            id,
            createdAt,
            updatedAt
          })
        }}
      >
        <label className='cursor-pointer flex flex-col justify-start items-center -mt-1'>
          <Image
            src={imageUrl}
            alt={title}
            width={128}
            height={128}
            className='rounded-sm'
          />
          <CustomText
            text={title}
            className='text-base font-semibold text-gray-800 mt-2'
          />
        </label>
      </div>
    )
  }

  const { states, dispatch } = useStore()

  const [pictureOpened, setPictureOpened] = useState<getPicture | null>(null)
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [IsRenameInputOpen, setIsRenameInputOpen] = useState(false)
  const [editNameValue, setEditNameValue] = useState('' as string)

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % loadedPictures.length);
    setEditNameValue(loadedPictures[currentImageIndex].title)
  };

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + loadedPictures.length) % loadedPictures.length
    );
    setEditNameValue(loadedPictures[currentImageIndex].title)
  };

  const handlerRename = async () => {
    const itemToRename = loadedPictures[currentImageIndex]
    console.log(itemToRename)
    const data = {
      ...itemToRename,
      title: editNameValue
    }
    const res = await renamePicture(data)
    console.log(res)
    await wait(300)
    await GetPictures()
    await setIsRenameInputOpen(false)
    await setEditNameValue('')
  }

  const handleRemove = async () => {
    const itemToRemove = loadedPictures[currentImageIndex]
    const res = await deletePicture(itemToRemove.id)
    handleNextClick()
    await wait(300)
    await GetPictures()
  }    

  const handlerSetAsWallpaper = async (url:string) => {
    dispatch(SystemOsSetBackground(url))
  }

  const PictureSelected = () => {
    return (
      <WindowComponent
        tittle={loadedPictures[currentImageIndex].title}
        uuid='Gallery'
        key={'ImageOpened'}
        closed={!states.System.gallery.isOpen}
        minimized={states.System.gallery.isMinimized}
        maximized={true}
        disableMaximize
        withTaskBar
        newOption={false}
        refreshOption={false}
        saveAsOption={false}
        saveOption={false}
        renameOption
        removeOption
        setAsWallpaperOption
        onSetAsWallpaper={() => {
          handlerSetAsWallpaper(loadedPictures[currentImageIndex].imageUrl)
        }}
        onRename={() => {
          setIsRenameInputOpen(true)
        }}
        onRemove={async () => {
          handleRemove()
        }}
        fileMenuIsOpen={isFileMenuOpen}
        closeFileMenu={(value) => {
          setIsFileMenuOpen(value)
        }}
        setMinimized={() => {
          dispatch(GalleryAppSetIsMinimized(!states.System.gallery.isMinimized))
        }}
        setClosed={() => {
          setPictureOpened(null)
        }}
        className='absolute !z-30 justify-center items-center'>
        <div
          className='flex w-full h-full justify-center items-center -mt-12'
        >
          <CustomActionButton
            className='ml-24  p-2 px-4 rounded-sm'
            onClick={() => {
              /// previous picture
              handlePrevClick()
            }}>
              <CustomText 
              text='<' 
              className='text-4xl font-bold text-black'
            />
            </CustomActionButton>
          <div className='flex flex-col w-full h-full items-center justify-center'>
            <Image
              src={`/${loadedPictures[currentImageIndex].imageUrl}`.replaceAll("//","/")|| ''}
              alt={pictureOpened?.title || ''}
              height={720}
              width={720}
            />
            {
              IsRenameInputOpen &&
              <div className='-mb-8 mt-2 flex flex-col items-center'>
                <CustomInput
                  label='Rename'
                  className=''
                  onBlur={(value) => {
                    setEditNameValue(String(value))
                  }}
                />
                <CustomActionButton 
                  className='mt-2 p-2'
                  onClick={() => {
                    console.log('confirm rename')
                    if(editNameValue !== loadedPictures[currentImageIndex].title) {
                      if(editNameValue !== '') {
                        console.log('rename')
                        handlerRename()
                      } else {
                        console.log('empty rename image')
                      }
                    }
                  }}
                >
                  <CustomText
                    text='Confirm'
                    className='text-sm font-semibold text-gray-800 '
                  />
                </CustomActionButton>
              </div>
            }
          </div>
          <CustomActionButton
            className='mr-24 p-2 px-4 rounded-sm'
            onClick={() => {
              handleNextClick()
            }}>
              <CustomText 
              text='>' 
              className='text-4xl font-bold text-black'
            />
            </CustomActionButton>
        </div>
      </WindowComponent>
    )
  }

  return (
    <>
      {
        pictureOpened
          ?
          <PictureSelected />
          :
          <WindowComponent
            tittle='Gallery'
            uuid='Gallery'
            resize
            onMouseEnter={() => {
              GetPictures()
            }}
            closed={!states.System.gallery.isOpen}
            minimized={states.System.gallery.isMinimized}
            maximized={states.System.gallery.isMaximized}
            setMaximized={() => {
              dispatch(GalleryAppSetIsMaximized(!states.System.gallery.isMaximized))
            }}
            setClosed={() => {
              dispatch(GalleryAppSetIsOpen(false))
            }}
            setMinimized={() => {
              dispatch(GalleryAppSetIsMinimized(!states.System.gallery.isMinimized))
            }}
            className={`
              absolute top-64 left-64 w-1/3 h-1/2 bg-gray-300
              pb-10
              mb-1 
        
            `}
          >

            <div
              className='w-full h-full flex flex-wrap justify-start items-start overflow-auto'
            >
              <PictureUploadInput />
              {/* <Picture
          src='/pictures/ts.png'
          title='ts'
        /> */}
              {
                loadedPictures.map((picture, index) => {
                  return (
                    <Picture
                      id={picture.id}
                      imageUrl={`/${picture.imageUrl}`}
                      title={picture.title}
                      key={`gallery-image-${index}`}
                      index={index}
                      createdAt={picture.createdAt}
                      updatedAt={picture.updatedAt}
                    />
                  )
                })
              }

            </div>
          </WindowComponent>
      }
    </>

  )
}

export default GalleryApp
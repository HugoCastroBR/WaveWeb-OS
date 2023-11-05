'use client'
import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'

interface CustomPaginationProps {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
}

const CustomPagination = ({
  totalPages,
  currentPage,
  onChangePage
}: CustomPaginationProps) => {

  const PageButton = (page: number) => {
    return (
      <CustomActionButton className='h-6 w-6'>
        {page}
      </CustomActionButton>
    )
  }

  const PageButtons = () => {
    const buttons = []
    for (let i = 1; i < totalPages + 1; i++) {
      buttons.push(PageButton(i))
    }
    return buttons
  }

  return (
    <div className='h-full w-full bg-red-200 flex justify-center items-center'>
      <CustomActionButton className='h-6 w-6'>
        {'<'}
      </CustomActionButton>
      {PageButtons()}
      <CustomActionButton className='h-6 w-6'>
        {'>'}
      </CustomActionButton>
    </div>
  )
}

export default CustomPagination
'use client'
import React from 'react'
import { MantineProvider, Button, createTheme } from '@mantine/core';
import useStore from '@/hooks/useStore';
import Image from 'next/image'

interface ThemeProvidersProps {
  children: React.ReactNode
}

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

const ThemeProviders = (
  { children }: ThemeProvidersProps
) => {

  const {states, dispatch} = useStore()

  return (
      <MantineProvider theme={theme}>
          <div 
          className={`${states.System.OS.background ? '' : 'bg-gradient-to-tl from-pink-500 via-violet-500 to-blue-500'} `}
          style={{
            // background: `${states.System.OS.background || ''}`,
            background: `url('../../public/pictures/ts.png') no-repeat center center fixed')`
          }}
          > 
            <Image
              alt='background'
              src={`/${states.System.OS.background }`|| ''}
              fill
              objectFit='cover'
              quality={100}
              className={`bg-gradient-to-tl from-pink-500 via-violet-500 to-blue-500
              `}
              style={{
                display: `${states.System.OS.background ? 'block' : 'none'}`,
              }}
            />
            
            {children}
          </div>
      </MantineProvider>
  )
}

export default ThemeProviders
'use client'
import React from 'react'
import { MantineProvider, Button, createTheme } from '@mantine/core';

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


  return (
      <MantineProvider theme={theme}>
          <div 
          className='bg-gradient-to-tl from-pink-500 via-violet-500 to-blue-500'> 
            {children}
          </div>
      </MantineProvider>
  )
}

export default ThemeProviders
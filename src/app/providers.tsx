'use client'
import React from 'react'
import { MantineProvider, Button, Group, createTheme } from '@mantine/core';
import { Provider } from 'react-redux';
import store from '@/store';

interface ProvidersProps {
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

const Providers = (
  { children }: ProvidersProps
) => {
  return (
    <Provider store={store}>
        <MantineProvider theme={theme}>
          <div className='bg-gradient-to-tl from-pink-500 via-violet-500 to-blue-500'> 
            {children}
          </div>
      </MantineProvider>
    </Provider>


  )
}

export default Providers
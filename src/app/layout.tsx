'use client'

import React, { useState } from 'react';
import ThemeRegistry from './lib/ThemeRegistry'
import { styled, useTheme, Theme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'

import Header from './components/MainLayout/Header/Header';
import Sidebar from './components/MainLayout/Sidebar/Sidebar';

import themeTypography from './themes/typography';
import customTheme from './themes/theme';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme , open }) => ({
  // ...theme.typography?.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(260 - 20),
    width: `calc(100% - ${260}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${260}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${260}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

 
export default function RootLayout({ children }: { children: React.ReactNode}) {
  const theme = useTheme();
  const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(true)
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));


  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened)
  };

  return (
    <html lang="en">
      <body>
      <ThemeRegistry options={{ key: 'mui' }}>
        <Box sx={{ display: 'flex' }}>
          {/* header */}
          <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
              bgcolor: theme.palette.background.default,
              // bgcolor: 'pink',
              transition: leftDrawerOpened ? 'width' : 'none'
            }}
          >
            <Toolbar>
              <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
            </Toolbar>
          </AppBar>

          {/* drawer */}
          <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} handleLeftDrawerToggle={handleLeftDrawerToggle}/>

          {/* main content */}
          <Main theme={theme} open={leftDrawerOpened}>
            {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
            {/* <Outlet /> */}
            {children}
          </Main>
          </Box>
          </ThemeRegistry>
      </body>
    </html>
  )
}
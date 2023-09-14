'use client';

import React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import customTheme from '../themes/theme';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    mainContent?: any;
  }
}

export default function ThemeRegistry(props: any) {
  const { options, children } = props;
  const muiTheme = useTheme();

  const theme = createTheme({
    status: {
      danger: 'orange',
    },
    mainContent: {
      // backgroundColor: theme.background,
      backgroundColor: 'red',
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      // borderRadius: `${theme.borderRadius}px`
      borderRadius: '12px'
    },
  });

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      {/* <MuiThemeProvider theme={muiTheme}> */}
      <MuiThemeProvider theme={theme}>
      {/* <StyledThemeProvider theme={customTheme}> */}
        <CssBaseline />
        {children}
      {/* </StyledThemeProvider> */}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
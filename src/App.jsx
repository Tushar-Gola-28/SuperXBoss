import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { createBrowserRouter, RouterProvider } from 'react-router';
import { root } from './routes';
import { SnackbarProvider } from './components/ui';
import theme from './theme';
import './App.css'
export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <RouterProvider router={createBrowserRouter(root)} />
          </SnackbarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

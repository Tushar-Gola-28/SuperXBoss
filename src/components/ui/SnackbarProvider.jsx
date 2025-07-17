import React, { forwardRef, useRef } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import { Box, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
export function SnackbarProvider({ children }) {
  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    if (notistackRef && notistackRef?.current) {
      notistackRef?.current.closeSnackbar(key)
    }
  };

  return (
    <>
      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <CloseIcon  />
          </IconButton>
        )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}


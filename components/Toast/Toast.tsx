import React from 'react';
import { Snackbar, Alert, AlertProps, Slide, SlideProps } from '@mui/material';

export enum ToastAlertSeverity {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error', // Added 'error' severity
}

export interface ToastProps {
  open: boolean;
  message?: string;
  severity?: ToastAlertSeverity;
  autoHideDuration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity,
  autoHideDuration = 3000, // Default to 3 seconds
  onClose,
}) => {

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
};

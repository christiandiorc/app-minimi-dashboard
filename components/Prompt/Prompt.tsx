// components/ReusableModal.tsx

import React from 'react';
import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';

interface ActionButton {
  label: string,
  variant: 'text' | 'outlined' | 'contained',
  onClick: () => void,
}

interface PromptModalProps {
  disabled: boolean;
  open: boolean;
  header?: string;
  subHeader?: string;
  onClose?: () => void;
  onProceed?: () => void;
}

export const Prompt: React.FC<PromptModalProps> = ({
  disabled,
  open,
  header = 'Header Verbiage',
  subHeader = 'Subheader Verbiage',
  onClose,
  onProceed,
}) => {

  // Default action button if none is passed
  const defaultAction = (
    <Button variant='outlined' onClick={onClose}>
      Close
    </Button>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={headerStyle}>
          {header}
        </Typography>

        {subHeader && (
          <Typography variant="body2" sx={subHeaderStyle}>
            {subHeader}
          </Typography>
        )}

        {/* Action Buttons */}
        <Box sx={actionButtonContainer}>
          {onProceed ? (
            <React.Fragment>
              <Button variant='outlined' onClick={onClose} disabled={disabled}>
                Cancel
              </Button>
              <Button variant='contained' onClick={onProceed} disabled={disabled}>
                {disabled && (
                  <CircularProgress 
                    sx={{
                      width: 15,      // Adjust the size of the spinner
                      height: 15,     // Adjust the size of the spinner
                      color: '#fff', 
                      marginRight: 1  // Add some space between the spinner and the label
                    }}
                    size={15}        // Make the spinner smaller by setting its size
                    thickness={4}    // Optional: Control the thickness of the spinner
                  />
                )}
                Proceed
              </Button>
            </React.Fragment>
          ) : defaultAction}
        </Box>
      </Box>
    </Modal>
  );
};

// Styles
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const headerStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '8px',
};

const subHeaderStyle = {
  color: '#777',
  fontSize: '14px',
  marginBottom: '20px',
};

const actionButtonContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};


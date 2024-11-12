import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';

type ButtonIconPlacement = 'left' | 'right';

export enum ButtonIconPlacementEnum {
  Left = 'left',
  Right = 'right',
}

interface ButtonProps {
  disabled?: boolean;
  Icon?: SvgIconComponent; // Optional icon to display inside the button
  label?: string;          // Text to display on the button
  onClick?: () => void;    // Function to call when the button is clicked
  style?: any;
  iconPlacement?: ButtonIconPlacement;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick, 
  Icon,
  disabled = false,
  style = {},
  iconPlacement = 'right',
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: disabled ? '#CACFD2' : '#79A1DC',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: 'max-content',
        ...style,
      }}
      disabled={disabled}
      {...!disabled && {onMouseEnter: (e) => e.currentTarget.style.backgroundColor = '#A1C4E5'}}
      {...!disabled && {onMouseLeave: (e) => e.currentTarget.style.backgroundColor = '#79A1DC'}}
    >
      {(iconPlacement === 'left' && Icon) && <span style={label ? {marginRight: '8px', lineHeight: '10px'} : {lineHeight: '10px'}}>{<Icon />}</span>}
      {label}
      {(iconPlacement === 'right' && Icon) && <span style={label ? {marginLeft: '8px', lineHeight: '10px'} : {lineHeight: '10px'}}>{<Icon />}</span>}
    </button>
  );
};
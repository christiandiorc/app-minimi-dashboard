import React, { ReactNode } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface DropDownOption {
  value: string;
  label: string;
}

type OnChangeType = (event: SelectChangeEvent<string | number>, child?: ReactNode) => void;

interface DropdownProps {
  label?: string;
  options?: DropDownOption[];
  selectedValue?: string | number;
  onChange?: OnChangeType;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label = 'Label',
  options = [
    {value: 'option1', label: 'Option 1', default: true},
    {value: 'option2', label: 'Option 2'},
    {value: 'option3', label: 'Option 3'},
  ],
  selectedValue,
  onChange,
}) => {

  const randomUUID = uuidv4();

  // Handle filter change
  const handleFilterChange: OnChangeType = (event: SelectChangeEvent<string | number>) => {
    if (onChange) onChange(event);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="filter-label">{label}</InputLabel>
      <Select
        labelId="filter-label"
        value={selectedValue}
        onChange={handleFilterChange}
        label={label}
        placeholder='Sort'
        size="small"
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={`dropdown-item-${index}-${randomUUID}`} value={option.value}>{option.label}</MenuItem>
          )
        })}
      </Select>
      {/* <FormHelperText>Select to filter by date</FormHelperText> */}
    </FormControl>
  );
};

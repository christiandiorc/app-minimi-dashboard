import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import UndoIcon from '@mui/icons-material/Undo';

interface SearchBoxProps {
  label?: string;
  placeholder?: string;
  onSearch?: (query: string) => void; // Callback function to handle search action
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchCleared?: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  label = "Label",
  placeholder = "Placeholder",
  onSearch,
  onChange,
  onSearchCleared,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search input

  // Handle the change in the search input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event)
    if(!event.target.value.length) setSearchQuery('');
    setSearchQuery(event.target.value);
  };

  // Handle the search button click
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      if (onSearch) onSearch(searchQuery); // Call the onSearch function with the current query
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick(); // Trigger search on Enter key
    }
  };

  const handleUndoClick = () => {
    setSearchQuery('');
    if (onSearchCleared) onSearchCleared();
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* Search Textbox */}
      <TextField
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        label={label}
        placeholder={placeholder}
        fullWidth
        size="small"
      />
      {/* Search Button */}
      <Button
        Icon={SearchIcon} 
        onClick={handleSearchClick}
        style={{marginLeft: "4px"}}
        disabled={!searchQuery.length}
      />
      <Button
        Icon={UndoIcon} 
        onClick={handleUndoClick}
        style={{marginLeft: "4px"}}
        disabled={!searchQuery.length}
      />
    </Box>
  );
};

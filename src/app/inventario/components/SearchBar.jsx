import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ search, setSearch, setPage }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  return (
    <Grid direction="column" display="flex">
      <Grid container direction="row" sx={{ mt: 3 }}>
        <TextField
          label="Buscar"
          variant="outlined"
          sx={{ transform: 'scale(0.9)' }}
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment variant="outlined" position="end">
                <IconButton ><Search /> </IconButton>
               
              </InputAdornment>
            ),
          }}
        ></TextField>
         
        
      </Grid>
    </Grid>
  );
};

export default SearchBar;
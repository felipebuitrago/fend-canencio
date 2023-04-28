import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
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
        ></TextField>
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{ transform: 'scale(0.8)', ml: -2 }}
        >
          <Search />
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
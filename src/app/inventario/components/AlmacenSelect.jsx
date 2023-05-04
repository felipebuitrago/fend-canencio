import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

 const AlmacenSelect = ({ almacenes, selectedStore, handleStoreChange }) => {
  
    return (
    <FormControl fullWidth>
      <InputLabel id="store-select-label">Almacén</InputLabel>
      <Select
        labelId="store-select-label"
        id="store-select"
        value={selectedStore}
        label="Almacen"
        onChange={handleStoreChange}
      >
        {almacenes.map((store) => (
          <MenuItem key={store.id} value={store.name}>
            {store.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AlmacenSelect;


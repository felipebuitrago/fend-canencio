import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";

const MultipleSelectChip = ({ label, items, value, error, active, onChange, icon }) => {
  
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${label}-multiple-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-multiple-select-label`}
        id={`${label}-multiple-select`}
        multiple
        value={value}
        onChange={onChange}
        error={error}
        disabled={active}
        input={
          <OutlinedInput
            id={`${label}-select-multiple-chip`}
            label={label}
            startAdornment={
              icon ? (
                <InputAdornment position="start">
                  <IconButton edge="start">{icon}</IconButton>
                </InputAdornment>
              ) : null
            }
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((val) => (
              <Chip key={val} label={items.find((item) => item._id === val).name} />
            ))}
          </Box>
        )}
      >
        {items.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectChip;


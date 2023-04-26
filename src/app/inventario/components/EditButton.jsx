import React from 'react';
import { Button } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

const EditButton = ({ item, onClick }) => (
  <Button
    size="small"
    variant="contained"
    color="info"
    sx={{ transform: "scale(0.9)" }} 
    onClick={() => onClick(item)}
  >
    <EditOutlined />
  </Button>
);

export default EditButton;

import React from 'react';
import { Button } from '@mui/material';
import { DeleteForeverOutlined } from '@mui/icons-material';

const DeleteButton = ({ item, onClick }) => (
  <Button
      size="small"
      variant="contained"
    color="error"
    sx={{ transform: "scale(0.9)" }}
    onClick={() => onClick(item)}
  >
    <DeleteForeverOutlined />
  </Button>
);

export default DeleteButton;

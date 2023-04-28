import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

const EditButton = ({ item, onClick }) => (
    <Tooltip title="Editar" arrow>
        <IconButton
            size="medium"
            color="primary"
            onClick={() => onClick(item)}
            aria-label="edit"
        >
            <EditOutlined fontSize='medium' />
        </IconButton>
    </Tooltip>
);

export default EditButton;
import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { DateRange, AccessTime } from '@mui/icons-material';

export const InicioPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={6}>
          <DateRange fontSize="large" />
          <h3 style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
            {currentTime.toLocaleDateString()}
          </h3>
          <AccessTime fontSize="large" />
          <h3 style={{ marginLeft: '0.5rem' }}>
            {currentTime.toLocaleTimeString()}
          </h3>
        </Box>
        <Box display="flex" justifyContent="center">
          <img src="/tapa-inventario.png" alt="Inventario App Web" style={{ maxWidth: '30%', maxHeight: '30%' }} />
        </Box>
      </Grid>
    </Grid>
  );
};
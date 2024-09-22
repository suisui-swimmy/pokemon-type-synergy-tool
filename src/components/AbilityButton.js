import React from 'react';
import { Button } from '@mui/material';

const AbilityButton = ({ ability, isSelected, onClick }) => {
  return (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      color={isSelected ? "primary" : "inherit"}
      sx={{
        margin: '2px',
        minWidth: '80px',
      }}
      onClick={() => onClick(ability)}
    >
      {ability}
    </Button>
  );
};

export default AbilityButton;
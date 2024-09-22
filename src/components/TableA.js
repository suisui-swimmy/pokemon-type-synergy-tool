import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { typeData } from '../data/typeData';

const TableA = ({ effectiveness }) => {
  const [sortOrder, setSortOrder] = useState('desc');

  const getBackgroundColor = (value) => {
    if (value === 4) return 'rgba(255, 0, 0, 0.8)';
    if (value === 2) return 'rgba(255, 0, 0, 0.4)';
    if (value === 1) return 'white';
    if (value === 0.5) return 'rgba(0, 0, 255, 0.2)';
    if (value === 0.25) return 'rgba(0, 0, 255, 0.4)';
    if (value === 0) return 'rgba(0, 0, 255, 0.8)';
    return 'white';
  };

  const formatEffectiveness = (value) => {
    if (value === undefined) return '-';
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(2).replace(/\.?0+$/, '');
  };

  const sortedTypes = Object.keys(typeData).sort((a, b) => {
    if (sortOrder === 'desc') {
      return effectiveness[b] - effectiveness[a];
    } else {
      return effectiveness[a] - effectiveness[b];
    }
  });

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Button onClick={handleSort}>
                {sortOrder === 'desc' ? '↓' : '↑'}
              </Button>
            </TableCell>
            {sortedTypes.map((type) => (
              <TableCell key={type} style={{ backgroundColor: typeData[type].color, color: typeData[type].textColor, textAlign: 'center' }}>
                {type}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">倍率</TableCell>
            {sortedTypes.map((type) => (
              <TableCell 
                key={type} 
                style={{ 
                  backgroundColor: getBackgroundColor(effectiveness[type]),
                  textAlign: 'center'
                }}
              >
                {formatEffectiveness(effectiveness[type])}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableA;
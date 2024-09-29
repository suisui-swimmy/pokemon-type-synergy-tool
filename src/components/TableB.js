import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { typeData } from '../data/typeData';

// タイプの順序を定義
const typeOrder = ['無', '炎', '水', '電', '草', '氷', '闘', '毒', '地', '飛', '超', '虫', '岩', '霊', '竜', '悪', '鋼', '妖'];

// タイプをソートする関数
const sortTypes = (type1, type2) => {
  const index1 = typeOrder.indexOf(type1);
  const index2 = typeOrder.indexOf(type2);
  return index1 - index2;
};

const TableB = ({ resistantType, ability, effectiveness, matchCount, resistantToWeakTypes, customResistance, originalEffectiveness, onTypeClick }) => {
  const [sortOrder, setSortOrder] = useState('asc');

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

  const TypeDisplay = ({ type, isLast }) => (
    <Typography variant="h6" component="span" style={{ 
      backgroundColor: typeData[type].color, 
      color: typeData[type].textColor,
      padding: '5px',
      display: 'inline-block',
      marginRight: isLast ? '0' : '10px'
    }}>
      {type}
    </Typography>
  );

  const shouldHighlightRed = (type) => {
    const isWeakTypeInTableA = originalEffectiveness && originalEffectiveness[type] >= 2;
    const isResistantTypeInTableB = effectiveness[type] <= 0.5;
    const isResistantTypeInTableA = originalEffectiveness && originalEffectiveness[type] <= 0.5;
    const isWeakTypeInTableB = effectiveness[type] >= 2;
    return (isWeakTypeInTableA && isResistantTypeInTableB) || (isResistantTypeInTableA && isWeakTypeInTableB);
  };

  const shouldHighlightBlue = (type) => {
    return type in customResistance;
  };

  const shouldHighlightPurple = (type) => {
    const isResistantTypeInTableA = originalEffectiveness && originalEffectiveness[type] <= 0.5;
    return type in customResistance && customResistance[type] >= 2 && isResistantTypeInTableA;
  };

  const getCellBorder = (type) => {
    if (shouldHighlightPurple(type)) {
      return '3px solid purple';
    } else if (shouldHighlightRed(type) && shouldHighlightBlue(type)) {
      return '3px solid purple';
    } else if (shouldHighlightRed(type)) {
      return '3px solid red';
    } else if (shouldHighlightBlue(type)) {
      return '3px solid blue';
    }
    return undefined;
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedTypes = Object.keys(typeData).sort((a, b) => {
    if (sortOrder === 'asc') {
      return effectiveness[a] - effectiveness[b];
    } else {
      return effectiveness[b] - effectiveness[a];
    }
  });

  const customResistanceDisplay = Object.entries(customResistance).map(([type, value], index, array) => (
    <React.Fragment key={type}>
      <TypeDisplay type={type} isLast={index === array.length - 1} />
      <span style={{ margin: 0 }}>×{value}</span>
      {index < array.length - 1 && <span style={{ marginRight: '10px' }}></span>}
    </React.Fragment>
  ));

  // タイプの表示順を変更する
  const sortedResistantTypes = resistantType.split('/').sort(sortTypes);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Box 
        onClick={() => onTypeClick(resistantType, ability)} 
        sx={{ 
          cursor: 'pointer', 
          display: 'inline-block',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Typography variant="h6" component="span">
          {sortedResistantTypes.map((type, index) => (
            <TypeDisplay key={type} type={type} isLast={index === sortedResistantTypes.length - 1} />
          ))}
          {ability && <span style={{ marginLeft: '10px' }}>({ability})</span>}
          {customResistanceDisplay.length > 0 && (
            <span style={{ marginLeft: '10px' }}>
              ({customResistanceDisplay})
            </span>
          )}
          <span style={{ marginLeft: '10px', fontSize: '1.25rem' }}>
            (一致数: {matchCount})
          </span>
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Button onClick={handleSort}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </TableCell>
              {sortedTypes.map((type) => (
                <TableCell 
                  key={type} 
                  style={{ 
                    backgroundColor: typeData[type].color, 
                    color: typeData[type].textColor, 
                    textAlign: 'center',
                    border: getCellBorder(type)
                  }}
                >
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
                    textAlign: 'center',
                    border: getCellBorder(type)
                  }}
                >
                  {formatEffectiveness(effectiveness[type])}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableB;
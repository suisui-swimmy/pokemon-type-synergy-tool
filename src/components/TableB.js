import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { typeData } from '../data/typeData';

const typeOrder = ['無', '炎', '水', '電', '草', '氷', '闘', '毒', '地', '飛', '超', '虫', '岩', '霊', '竜', '悪', '鋼', '妖'];

const sortTypes = (type1, type2) => {
  const index1 = typeOrder.indexOf(type1);
  const index2 = typeOrder.indexOf(type2);
  return index1 - index2;
};

const formatEffectivenessValue = (value) => {
  if (value === undefined) return '-';
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(2).replace(/\.?0+$/, '');
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

  // 一致率の計算
  const calculateMatchRate = () => {
    const superEffectiveTypesB = Object.keys(effectiveness).filter(type => effectiveness[type] >= 2);
    const resistanceTypesA = Object.keys(originalEffectiveness).filter(type => originalEffectiveness[type] <= 0.5);
    const matchingTypes = superEffectiveTypesB.filter(type => resistanceTypesA.includes(type));
    
    if (superEffectiveTypesB.length === 0) return 0;
    return (matchingTypes.length / superEffectiveTypesB.length * 100).toFixed(1);
  };

  const matchRate = calculateMatchRate();

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

  // カスタム耐性条件の表示を生成
  const getCustomResistanceDisplay = () => {
    return Object.entries(customResistance).map(([type, maxValue]) => {
      const actualValue = effectiveness[type];
      return {
        type,
        displayValue: formatEffectivenessValue(actualValue)
      };
    });
  };

  const CustomResistanceDisplay = ({ customResistanceInfo }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      {customResistanceInfo.map(({ type, displayValue }, index) => (
        <span key={type} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <TypeDisplay type={type} isLast={true} />
          <span>×{displayValue}</span>
        </span>
      ))}
    </span>
  );

  const customResistanceDisplay = getCustomResistanceDisplay();
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
              (<CustomResistanceDisplay customResistanceInfo={customResistanceDisplay} />)
            </span>
          )}
          <span style={{ marginLeft: '10px', fontSize: '1.25rem' }}>
            (一致率: {matchRate}%)
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
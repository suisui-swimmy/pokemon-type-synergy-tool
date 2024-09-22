import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Typography, Button, Box, Select, MenuItem, FormControl, Paper, Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TypeButton from './components/TypeButton';
import AbilityButton from './components/AbilityButton';
import TableA from './components/TableA';
import TableB from './components/TableB';
import { typeData } from './data/typeData';
import { calculateTypeEffectiveness, findResistantTypes } from './utils/calculations';
import './App.css';

const abilities = [
  'かんそうはだ', 'ちょすい', 'よびみず', 'こんがりボディ', 'もらいび',
  'ちくでん', 'ひらいしん', 'そうしょく', 'どしょく', 'ふゆう'
];

const typeAbilityCombinations = {
  'かんそうはだ': ['闘/毒'],
  'ちょすい': ['水', '水/闘', '水/氷', '水/電', '水/地', '毒/地', '草', '草/悪', '炎/水', '水/虫', '水/草'],
  'よびみず': ['水', '水/地', '水/竜'],
  'こんがりボディ': ['妖'],
  'もらいび': ['炎', '炎/岩', '炎/悪', '炎/鋼', '炎/霊', '岩', '炎/超'],
  'ちくでん': ['電', '水/電', '電/飛', '電/闘'],
  'ひらいしん': ['電', '地/岩'],
  'そうしょく': ['水/妖', '無/超', '無', '無/妖', '電', '無/草', '草', '竜', '竜/鋼'],
  'どしょく': ['鋼'],
  'ふゆう': ['毒/霊', '毒', '毒/妖', '霊', '地/竜', '超', '超/竜', '超/鋼', '電/霊', '炎/電', '水/電', '電/氷', '電/飛', '電/草', '霊/竜', '電', '氷', '竜/悪', '電/虫']
};

const theme = createTheme({
  typography: {
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
  },
});

const TypeDisplay = React.memo(({ type }) => (
  <Typography variant="h6" component="span" style={{ 
    backgroundColor: typeData[type].color, 
    color: typeData[type].textColor,
    padding: '5px',
    display: 'inline-block',
    marginRight: '10px'
  }}>
    {type}
  </Typography>
));

function App() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [effectiveness, setEffectiveness] = useState({});
  const [customResistance, setCustomResistance] = useState({});
  const [weakTypes, setWeakTypes] = useState([]);

  const newEffectiveness = useMemo(() => 
    calculateTypeEffectiveness(selectedTypes, selectedAbility ? [selectedAbility] : []),
    [selectedTypes, selectedAbility]
  );

  useEffect(() => {
    setEffectiveness(newEffectiveness);
    const newWeakTypes = Object.keys(newEffectiveness).filter(type => newEffectiveness[type] > 1);
    setWeakTypes(newWeakTypes);
    setCustomResistance({});
  }, [newEffectiveness]);

  const handleTypeClick = useCallback((type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : prev.length < 2 ? [...prev, type] : prev
    );
  }, []);

  const handleAbilityClick = useCallback((ability) => {
    setSelectedAbility(prev => prev === ability ? null : ability);
  }, []);

  const handleTypeReset = useCallback(() => {
    setSelectedTypes([]);
  }, []);

  const handleAbilityReset = useCallback(() => {
    setSelectedAbility(null);
  }, []);

  const handleCustomTypeClick = useCallback((type) => {
    setCustomResistance(prev => {
      if (prev[type]) {
        const { [type]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [type]: 1 };
      }
    });
  }, []);

  const handleCustomEffectivenessChange = useCallback((type, value) => {
    setCustomResistance(prev => ({
      ...prev,
      [type]: Number(value)
    }));
  }, []);

  const handleTableBTypeClick = useCallback((types, ability) => {
    const typeArray = types.split('/');
    setSelectedTypes(typeArray);
    setSelectedAbility(ability);
  }, []);

  const memoizedTableA = useMemo(() => {
    if (selectedTypes.length > 0) {
      return <TableA effectiveness={effectiveness} />;
    }
    return null;
  }, [effectiveness, selectedTypes.length]);

  const memoizedResistantTypesData = useMemo(() => {
    if (selectedTypes.length > 0) {
      return findResistantTypes(effectiveness, customResistance, typeAbilityCombinations);
    }
    return {};
  }, [effectiveness, customResistance, selectedTypes.length]);

  const memoizedTableB = useMemo(() => {
    if (selectedTypes.length > 0) {
      if (Object.entries(memoizedResistantTypesData).length > 0) {
        const resistanceTypesA = Object.keys(effectiveness).filter(type => effectiveness[type] < 1);

        return Object.entries(memoizedResistantTypesData)
          .map(([typeAbility, data]) => {
            const [types, ability] = typeAbility.split(' (');
            const superEffectiveTypesB = Object.keys(data.effectiveness).filter(type => data.effectiveness[type] >= 2);
            const matchCount = resistanceTypesA.filter(type => superEffectiveTypesB.includes(type)).length;

            return {
              typeAbility,
              data: {
                ...data,
                matchCount,
                types,
                ability: ability ? ability.slice(0, -1) : null
              }
            };
          })
          .sort((a, b) => {
            if (b.data.matchCount !== a.data.matchCount) {
              return b.data.matchCount - a.data.matchCount;
            } else {
              const sumA = a.data.resistantToWeakTypes.reduce((sum, type) => sum + a.data.effectiveness[type], 0);
              const sumB = b.data.resistantToWeakTypes.reduce((sum, type) => sum + b.data.effectiveness[type], 0);
              return sumA - sumB;
            }
          })
          .map(({ typeAbility, data }) => (
            <TableB 
              key={typeAbility} 
              resistantType={data.types}
              ability={data.ability}
              effectiveness={data.effectiveness}
              matchCount={data.matchCount}
              resistantToWeakTypes={data.resistantToWeakTypes}
              customResistance={customResistance}
              originalEffectiveness={effectiveness}
              onTypeClick={handleTableBTypeClick}
            />
          ));
      } else {
        return (
          <Typography>
            選択されたタイプのすべての弱点に対して耐性を持つタイプの組み合わせが見つかりませんでした。
          </Typography>
        );
      }
    }
    return null;
  }, [memoizedResistantTypesData, effectiveness, customResistance, handleTableBTypeClick, selectedTypes.length]);

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <Box sx={{ textAlign: 'center', my: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            ポケモン相性補完考察ツール
          </Typography>
          <Link 
            href="https://github.com/suisui-swimmy/pokemon-type-synergy-tool/blob/main/README.md" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            使い方
          </Link>
        </Box>
        <Paper sx={{ bgcolor: '#f4f6f7', p: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
            {Object.keys(typeData).map((type) => (
              <TypeButton
                key={type}
                type={type}
                isSelected={selectedTypes.includes(type)}
                onClick={handleTypeClick}
              />
            ))}
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#808080',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#606060',
                },
              }} 
              onClick={handleTypeReset}
            >
              リセット
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
            {abilities.map((ability) => (
              <AbilityButton
                key={ability}
                ability={ability}
                isSelected={selectedAbility === ability}
                onClick={handleAbilityClick}
              />
            ))}
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#808080',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#606060',
                },
              }} 
              onClick={handleAbilityReset}
            >
              リセット
            </Button>
          </Box>

          {selectedTypes.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom>
              ▍選択したタイプ: {selectedTypes.map(type => <TypeDisplay key={type} type={type} />)}
              </Typography>

              <Typography variant="h5" gutterBottom>
              ▍選択したとくせい: {selectedAbility && <span>{selectedAbility}</span>}
              </Typography>

              {memoizedTableA}

              {weakTypes.length > 0 && (
                <Box sx={{ my: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight="normal">
                    &lt;耐性タイプの条件を変更する&gt;
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 2 }}>
                    {weakTypes.map((type) => (
                      <Box key={type} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TypeButton
                          type={type}
                          isSelected={type in customResistance}
                          onClick={() => handleCustomTypeClick(type)}
                        />
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <Select
                            value={customResistance[type] || 1}
                            onChange={(e) => handleCustomEffectivenessChange(type, e.target.value)}
                            disabled={!(type in customResistance)}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              <Typography variant="h5" gutterBottom>
              ▍弱点を相互に補完するタイプ
              </Typography>

              {memoizedTableB}
            </>
          )}
        </Paper>
        <Box 
          component="footer" 
          sx={{ 
            bgcolor: 'black', 
            color: 'white', 
            py: 2, 
            mt: 3, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="body2">
            © 2024 suisui-swimmy
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

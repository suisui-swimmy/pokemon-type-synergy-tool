import { typeEffectiveness } from '../data/typeEffectiveness';

const memoizedTypeEffectiveness = new Map();

export const calculateTypeEffectiveness = (selectedTypes, selectedAbilities) => {
  const key = `${selectedTypes.sort().join(',')}|${selectedAbilities.sort().join(',')}`;
  if (memoizedTypeEffectiveness.has(key)) {
    return memoizedTypeEffectiveness.get(key);
  }

  let effectiveness = Object.fromEntries(
    Object.keys(typeEffectiveness).map(type => [type, 1])
  );
  
  selectedTypes.forEach(type => {
    Object.keys(typeEffectiveness).forEach(attackType => {
      effectiveness[attackType] *= typeEffectiveness[type][attackType];
    });
  });

  if (selectedAbilities.includes('かんそうはだ')) {
    effectiveness['炎'] *= 1.25;
    effectiveness['水'] = 0;
  }
  if (selectedAbilities.includes('ちょすい') || selectedAbilities.includes('よびみず')) {
    effectiveness['水'] = 0;
  }
  if (selectedAbilities.includes('こんがりボディ') || selectedAbilities.includes('もらいび')) {
    effectiveness['炎'] = 0;
  }
  if (selectedAbilities.includes('ちくでん') || selectedAbilities.includes('ひらいしん')) {
    effectiveness['電'] = 0;
  }
  if (selectedAbilities.includes('そうしょく')) {
    effectiveness['草'] = 0;
  }
  if (selectedAbilities.includes('どしょく') || selectedAbilities.includes('ふゆう')) {
    effectiveness['地'] = 0;
  }

  memoizedTypeEffectiveness.set(key, effectiveness);
  return effectiveness;
};

const memoizedResistantTypes = new Map();

const generateTypeCombinations = (() => {
  const allTypes = Object.keys(typeEffectiveness);
  const combinations = [
    ...allTypes.map(type => [type]),
    ...allTypes.flatMap((type1, index) => 
      allTypes.slice(index + 1).map(type2 => [type1, type2])
    )
  ];
  return () => combinations;
})();

export const findResistantTypes = (effectiveness, customResistance, typeAbilityCombinations) => {
  const key = `${JSON.stringify(effectiveness)}|${JSON.stringify(customResistance)}|${JSON.stringify(typeAbilityCombinations)}`;
  if (memoizedResistantTypes.has(key)) {
    return memoizedResistantTypes.get(key);
  }

  const weakTypes = Object.keys(effectiveness).filter(type => effectiveness[type] > 1);
  const resistanceTypes = Object.keys(effectiveness).filter(type => effectiveness[type] < 1);

  let resistantTypes = {};
  const resistantTypesCache = new Map();

  const typeCombinations = generateTypeCombinations();

  typeCombinations.forEach(combo => {
    const [type1, type2] = combo;
    const cacheKey = combo.join('/');
    
    if (resistantTypesCache.has(cacheKey)) {
      resistantTypes[cacheKey] = resistantTypesCache.get(cacheKey);
      return;
    }

    let combinedEffectiveness = calculateTypeEffectiveness(combo, []);
    
    const resistantToWeakTypes = weakTypes.filter(type => {
      if (type in customResistance) {
        // カスタム耐性が設定されている場合、設定された倍率以下であることを確認
        return combinedEffectiveness[type] <= customResistance[type];
      }
      // カスタム耐性が設定されていない場合は従来通り0.5倍以下
      return combinedEffectiveness[type] <= 0.5;
    });
    
    if (resistantToWeakTypes.length === weakTypes.length) {
      const superEffectiveTypes = Object.keys(combinedEffectiveness).filter(type => combinedEffectiveness[type] >= 2);
      let matchCount = resistanceTypes.filter(type => superEffectiveTypes.includes(type)).length;
      
      const result = {
        effectiveness: combinedEffectiveness,
        matchCount: matchCount,
        resistantToWeakTypes: resistantToWeakTypes
      };

      resistantTypesCache.set(cacheKey, result);
      resistantTypes[cacheKey] = result;
    }
  });

  // とくせいを持つケースの処理
  Object.entries(typeAbilityCombinations).forEach(([ability, typeList]) => {
    typeList.forEach(types => {
      const [type1, type2] = types.split('/');
      let combinedEffectiveness = calculateTypeEffectiveness([type1, type2].filter(Boolean), [ability]);
      
      const resistantToWeakTypes = weakTypes.filter(type => {
        if (type in customResistance) {
          // カスタム耐性が設定されている場合、設定された倍率以下であることを確認
          return combinedEffectiveness[type] <= customResistance[type];
        }
        // カスタム耐性が設定されていない場合は従来通り0.5倍以下
        return combinedEffectiveness[type] <= 0.5;
      });
      
      if (resistantToWeakTypes.length === weakTypes.length) {
        const superEffectiveTypes = Object.keys(combinedEffectiveness).filter(type => combinedEffectiveness[type] >= 2);
        let matchCount = resistanceTypes.filter(type => superEffectiveTypes.includes(type)).length;
        
        const typeCombination = `${types} (${ability})`;
        resistantTypes[typeCombination] = {
          effectiveness: combinedEffectiveness,
          matchCount: matchCount,
          resistantToWeakTypes: resistantToWeakTypes
        };
      }
    });
  });
  
  memoizedResistantTypes.set(key, resistantTypes);
  return resistantTypes;
};

// メモ化されたキャッシュをクリアする関数
export const clearCalculationCache = () => {
  memoizedTypeEffectiveness.clear();
  memoizedResistantTypes.clear();
};

// 特定のタイプの組み合わせに対する相性を計算する関数
export const calculateCombinedEffectiveness = (type1, type2) => {
  return Object.fromEntries(
    Object.keys(typeEffectiveness).map(attackType => [
      attackType,
      type1 === type2
        ? typeEffectiveness[type1][attackType]
        : typeEffectiveness[type1][attackType] * typeEffectiveness[type2][attackType]
    ])
  );
};

// 弱点タイプを取得する関数
export const getWeakTypes = (effectiveness) => {
  return Object.keys(effectiveness).filter(type => effectiveness[type] > 1);
};

// 耐性タイプを取得する関数
export const getResistanceTypes = (effectiveness) => {
  return Object.keys(effectiveness).filter(type => effectiveness[type] < 1);
};
export const typeEffectiveness = {
    無: { 無: 1, 炎: 1, 水: 1, 電: 1, 草: 1, 氷: 1, 闘: 2, 毒: 1, 地: 1, 飛: 1, 超: 1, 虫: 1, 岩: 1, 霊: 0, 竜: 1, 悪: 1, 鋼: 1, 妖: 1 },
    炎: { 無: 1, 炎: 0.5, 水: 2, 電: 1, 草: 0.5, 氷: 0.5, 闘: 1, 毒: 1, 地: 2, 飛: 1, 超: 1, 虫: 0.5, 岩: 2, 霊: 1, 竜: 1, 悪: 1, 鋼: 0.5, 妖: 0.5 },
    水: { 無: 1, 炎: 0.5, 水: 0.5, 電: 2, 草: 2, 氷: 0.5, 闘: 1, 毒: 1, 地: 1, 飛: 1, 超: 1, 虫: 1, 岩: 1, 霊: 1, 竜: 1, 悪: 1, 鋼: 0.5, 妖: 1 },
    電: { 無: 1, 炎: 1, 水: 1, 電: 0.5, 草: 1, 氷: 1, 闘: 1, 毒: 1, 地: 2, 飛: 0.5, 超: 1, 虫: 1, 岩: 1, 霊: 1, 竜: 1, 悪: 1, 鋼: 0.5, 妖: 1 },
    草: { 無: 1, 炎: 2, 水: 0.5, 電: 0.5, 草: 0.5, 氷: 2, 闘: 1, 毒: 2, 地: 0.5, 飛: 2, 超: 1, 虫: 2, 岩: 1, 霊: 1, 竜: 1, 悪: 1, 鋼: 1, 妖: 1 },
    氷: { 無: 1, 炎: 2, 水: 1, 電: 1, 草: 1, 氷: 0.5, 闘: 2, 毒: 1, 地: 1, 飛: 1, 超: 1, 虫: 1, 岩: 2, 霊: 1, 竜: 1, 悪: 1, 鋼: 2, 妖: 1 },
    闘: { 無: 1, 炎: 1, 水: 1, 電: 1, 草: 1, 氷: 1, 闘: 1, 毒: 1, 地: 1, 飛: 2, 超: 2, 虫: 0.5, 岩: 0.5, 霊: 1, 竜: 1, 悪: 0.5, 鋼: 1, 妖: 2 },
    毒: { 無: 1, 炎: 1, 水: 1, 電: 1, 草: 0.5, 氷: 1, 闘: 0.5, 毒: 0.5, 地: 2, 飛: 1, 超: 2, 虫: 0.5, 岩: 1, 霊: 1, 竜: 1, 悪: 1, 鋼: 1, 妖: 0.5 },
    地: { 無: 1, 炎: 1, 水: 2, 電: 0, 草: 2, 氷: 2, 闘: 1, 毒: 0.5, 地: 1, 飛: 1, 超: 1, 虫: 1, 岩: 0.5, 霊: 1, 竜: 1, 悪: 1, 鋼: 1, 妖: 1 },
    飛: { 無: 1, 炎: 1, 水: 1, 電: 2, 草: 0.5, 氷: 2, 闘: 0.5, 毒: 1, 地: 0, 飛: 1, 超: 1, 虫: 0.5, 岩: 2, 霊: 1, 竜: 1, 悪: 1, 鋼: 1, 妖: 1 },
    超: { 無: 1, 炎: 1, 水: 1, 電: 1, 草: 1, 氷: 1, 闘: 0.5, 毒: 1, 地: 1, 飛: 1, 超: 0.5, 虫: 2, 岩: 1, 霊: 2, 竜: 1, 悪: 2, 鋼: 1, 妖: 1 },
    虫: { 無: 1, 炎: 2, 水: 1, 電: 1, 草: 0.5, 氷: 1, 闘: 0.5, 毒: 1, 地: 0.5, 飛: 2, 超: 1, 虫: 1, 岩: 2, 霊: 1, 竜: 1, 悪: 1, 鋼: 1, 妖: 1 },
    岩: { 無: 0.5, 炎: 0.5, 水: 2, 電: 1, 草: 2, 氷: 1, 闘: 2, 毒: 0.5, 地: 2, 飛: 0.5, 超: 1, 虫: 1, 岩: 1, 霊: 1, 竜: 1, 悪: 1, 鋼: 2, 妖: 1 },
    霊: { 無: 0, 炎: 1, 水: 1, 電: 1, 草: 1, 氷: 1, 闘: 0, 毒: 0.5, 地: 1, 飛: 1, 超: 1, 虫: 0.5, 岩: 1, 霊: 2, 竜: 1, 悪: 2, 鋼: 1, 妖: 1 },
    竜: { 無: 1, 炎: 0.5, 水: 0.5, 電: 0.5, 草: 0.5, 氷: 2, 闘: 1, 毒: 1, 地: 1, 飛: 1, 超: 1, 虫: 1, 岩: 1, 霊: 1, 竜: 2, 悪: 1, 鋼: 1, 妖: 2 },
    悪: { 無: 1, 炎: 1, 水: 1, 電: 1, 草: 1, 氷: 1, 闘: 2, 毒: 1, 地: 1, 飛: 1, 超: 0, 虫: 2, 岩: 1, 霊: 0.5, 竜: 1, 悪: 0.5, 鋼: 1, 妖: 2 },
    鋼: { 無: 0.5, 炎: 2, 水: 1, 電: 1, 草: 0.5, 氷: 0.5, 闘: 2, 毒: 0, 地: 2, 飛: 0.5, 超: 0.5, 虫: 0.5, 岩: 0.5, 霊: 1, 竜: 0.5, 悪: 1, 鋼: 0.5, 妖: 0.5 },
    妖: { 無: 1, 炎: 1, 水: 1, 電: 1, 草: 1, 氷: 1, 闘: 0.5, 毒: 2, 地: 1, 飛: 1, 超: 1, 虫: 0.5, 岩: 1, 霊: 1, 竜: 0, 悪: 0.5, 鋼: 2, 妖: 1 },
  };
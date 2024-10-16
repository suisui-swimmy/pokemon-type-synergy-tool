# ポケモン相性補完考察ツール
[https://suisui-swimmy.github.io/pokemon-type-synergy-tool/](https://suisui-swimmy.github.io/pokemon-type-synergy-tool/)

## 機能
「選択されたポケモンのタイプ」に対し、「弱点タイプ(倍率が2、4)であるタイプすべてに耐性を持つタイプ(倍率が0、0.25、0.5)」を表示します。
## 表示の詳細
- **タイプ選択ボタン** : 最大2タイプまで選択できます。
- **とくせい選択ボタン** : タイプ相性が変化するとくせいを最大1つまで選択できます。この選択は後のタイプ相性表示に反映されます。
- **「選択されたタイプのタイプ相性」テーブル** : 「選択されたタイプのポケモン」が攻撃を受ける際のタイプ相性を表示します。デフォルトでは倍率は降順に表示されます。「↓」ボタンで昇順にソートできます。
- **「弱点を相互に補完するタイプ」テーブル** : 「選択されたポケモンのタイプ」に対し、「弱点タイプ(倍率が2、4)であるタイプすべてに耐性を持つタイプ(倍率が0、0.25、0.5)」を表示します。デフォルトでは倍率は昇順に表示されます。「↑」ボタンで降順にソートできます。{type}{type}を押すと、そのタイプについての結果が表示されるようになります。

    このテーブルは「一致数」の値が大きい順に表示されます。「一致数」は、「選択されたポケモンのタイプ」に対し、「弱点タイプ(倍率が2、4)であるタイプすべてに耐性を持つタイプ(倍率が0、0.25、0.5)」の「弱点タイプ(倍率が2、4)」と、「選択されたポケモンのタイプ」の「耐性タイプ(倍率が0、0.25、0.5)」が一致するタイプの数を表示しています。

    また、このテーブルでは、「選択されたポケモンのタイプ」の「弱点タイプ(倍率が2、4)」と「選択されたポケモンのタイプ」に対し、「弱点タイプ(倍率が2、4)であるタイプすべてに耐性を持つタイプ(倍率が0、0.25、0.5)」の「耐性タイプ(倍率が0、0.25、0.5)」が一致するタイプと、「選択されたポケモンのタイプ」に対し、「弱点タイプ(倍率が2、4)であるタイプすべてに耐性を持つタイプ(倍率が0、0.25、0.5)」の「弱点タイプ(倍率が2、4)」と「選択されたポケモンのタイプ」の「耐性タイプ(倍率が0、0.25、0.5)」が一致するタイプが赤枠で強調表示されます。


![README_1.png](https://github.com/suisui-swimmy/pokemon-type-synergy-tool/blob/main/README_1.png?raw=true)


- **<耐性タイプの条件を変更する>** : デフォルトでは選択されたタイプのすべての弱点に対して耐性を持つタイプを表示しますが、選択したタイプによっては、すべての弱点に対して耐性を持つタイプの組み合わせが存在しない場合があります。そういった場合や、選択したタイプの弱点タイプに対する耐性倍率を任意に変更したい場合にこの機能を使用します。倍率を変更したいタイプのアイコンを選択し、プルダウンから任意の倍率を選択することで、表示結果が更新されます。ここで選択したタイプと倍率は、「弱点を相互に補完するタイプ」テーブルで青枠で強調表示されます。
## フィードバック
[X(@peixe0307)](https://x.com/peixe0307)

export const defenseModules = [
    {
        id: 'cannon_defense_turret',
        name: '大砲式の防御砲塔',
        icon: '🔫',
        stars: 1,
        description: '対空防御に特化した砲塔です。航空機の後部に装備され、敵戦闘機からの攻撃に対して反撃能力を提供します。',
        stats: {
            airDefense: 1.0,
            weight: 3.5,
            agility: -1.0,
            cost: 1.00
        }
    },
    {
        id: 'heavy_mg_defense_turret',
        name: '重機関銃式の防御砲塔',
        icon: '🔫',
        stars: 1,
        description: '全方位に対して回転で取り付けることにより全方位攻撃に対して、防御能力を持った重機関銃による後方砲塔で防護します。',
        stats: {
            airDefense: 4.0,
            weight: 3.0,
            agility: -2.0,
            cost: 4.00
        }
    },
    {
        id: 'light_mg_defense_turret',
        name: '軽機関銃式の防御砲塔',
        icon: '🔫',
        stars: 1,
        description: '同様に軽量に支援機能を取り付けることで、以前場面にとって十分弱い機関銃による後方砲塔で防護します。そして主要車戦により対応できるようになります。',
        stats: {
            airDefense: 1.5,
            weight: 2.0,
            agility: -1.0,
            cost: 2.00
        }
    }
];

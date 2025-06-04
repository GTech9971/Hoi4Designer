export const armorModules = [
    {
        id: 'basic_armor',
        name: '基本装甲',
        icon: '🛡️',
        stars: 1,
        description: '基本的な装甲プレート。防御力を向上させますが重量が増加します。',
        stats: {
            airDefense: 5.0,
            weight: 0.8,
            agility: -2.0,
            cost: 1.0
        }
    },
    {
        id: 'heavy_armor',
        name: '重装甲',
        icon: '🛡️',
        stars: 2,
        description: '厚い装甲プレート。高い防御力を持ちますが重量と機動性に大きく影響します。',
        stats: {
            airDefense: 12.0,
            weight: 1.5,
            agility: -5.0,
            cost: 1.8
        }
    }
];
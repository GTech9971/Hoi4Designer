export const specialModules = [
    {
        id: 'drop_tank',
        name: '落下タンク',
        icon: '⛽',
        stars: 1,
        description: '航続距離を延長するための追加燃料タンクです。',
        stats: {
            range: 0.3,
            weight: 0.4,
            cost: 0.6
        }
    },
    {
        id: 'self_sealing_fuel_tank',
        name: '自己密閉燃料タンク',
        icon: '🛡️',
        stars: 1,
        description: '燃料タンクが損傷を受けた時に自動的に密閉する機能を持つ燃料タンク。',
        stats: {
            reliability: 2.0,
            weight: 0.3,
            cost: 1.0
        }
    },
    {
        id: 'non_strategic_materials_use',
        name: '非戦略物資の使用',
        icon: '🔧',
        stars: 1,
        description: '戦略物資の代わりに非戦略物資を使用することでコストを削減します。',
        stats: {
            cost: -2.0,
            reliability: -1.0,
            weight: 0.1
        }
    },
    {
        id: 'advanced_materials',
        name: '高性能材料の適用',
        icon: '⚙️',
        stars: 2,
        description: 'アルミニウムなどの高性能材料を使用してパフォーマンスを向上させます。',
        stats: {
            agility: 2.0,
            weight: -0.3,
            cost: 3.0
        }
    }
];
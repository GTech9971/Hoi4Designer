export const specialModules = [
    {
        id: 'drop_tank',
        name: '落下タンク',
        icon: '⛽',
        stars: 1,
        description: '航続距離を延長するための追加燃料タンクです。戦闘時には投下して軽量化できます。',
        stats: {
            range: 0.3,
            weight: 0.4,
            cost: 0.6
        }
    },
    {
        id: 'dive_brakes',
        name: '急降下ブレーキ',
        icon: '🛬',
        stars: 1,
        description: '急降下爆撃時に機体を安定させるブレーキ。急降下爆撃の精度が向上しますが機動性が低下します。',
        stats: {
            surfaceAttack: 3.0,
            agility: -2.0,
            weight: 0.3,
            cost: 2.0
        }
    },
    {
        id: 'floats',
        name: '浮き',
        icon: '🌊',
        stars: 1,
        description: '水上での離着陸を可能にする浮き。水上機として運用できますが重量が大幅に増加し機動性が低下します。',
        stats: {
            weight: 1.0,
            agility: -5.0,
            maxSpeed: -10.0,
            reliability: 2.0,
            cost: 1.5
        }
    },
    {
        id: 'armor_plate',
        name: '装甲板',
        icon: '🛡️',
        stars: 1,
        description: '重要部位を保護する追加装甲板。防御力が向上しますが重量が増加し機動性が低下します。',
        stats: {
            airDefense: 8.0,
            weight: 1.2,
            agility: -3.0,
            maxSpeed: -5.0,
            cost: 2.5
        }
    },
    {
        id: 'additional_fuel_tank',
        name: '追加増槽',
        icon: '⛽',
        stars: 1,
        description: '機体内部に追加の燃料タンクを設置。航続距離が大幅に延長されますが重量が増加します。',
        stats: {
            range: 0.8,
            weight: 0.6,
            agility: -1.0,
            cost: 1.2
        }
    },
    {
        id: 'non_strategic_materials_use',
        name: '非戦略物資の使用',
        icon: '🔧',
        stars: 1,
        description: '戦略物資の代わりに非戦略物資を使用することでコストを削減します。ただし信頼性が低下します。',
        stats: {
            cost: -2.0,
            reliability: -1.0,
            weight: 0.1
        }
    },
    {
        id: 'self_sealing_fuel_tank',
        name: '自己密閉燃料タンク',
        icon: '🛡️',
        stars: 1,
        description: '燃料タンクが損傷を受けた時に自動的に密閉する機能を持つ燃料タンク。生存性が向上します。',
        stats: {
            reliability: 2.0,
            weight: 0.3,
            cost: 1.0
        }
    }
];
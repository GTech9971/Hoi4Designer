export const cannonModules = [
    {
        id: 'cannon_1x1',
        name: '大砲I×1',
        icon: '🔫',
        stars: 1,
        description: '軽量で信頼性の高い基本的な航空機用大砲です。対空戦闘において基本的な火力を提供します。',
        stats: {
            airAttack: 18.0,
            reliability: 1.0,
            weight: 0.8,
            cost: 1.00
        }
    },
    {
        id: 'cannon_1x2',
        name: '大砲I×2',
        icon: '🔫',
        stars: 2,
        description: '2門の大砲I。火力が向上しますが重量とコストが増加します。',
        stats: {
            airAttack: 36.0,
            surfaceAttack: 4.0,
            reliability: 1.0,
            weight: 1.6,
            cost: 2.00
        }
    },
    {
        id: 'heavy_mg_x2',
        name: '重機関銃×2',
        icon: '🔫',
        stars: 1,
        description: '2門の重機関銃。連射速度が高く対空戦闘に優れています。',
        stats: {
            airAttack: 18.0,
            reliability: 1.0,
            weight: 0.6,
            cost: 1.00
        }
    },
    {
        id: 'heavy_mg_x4',
        name: '重機関銃×4',
        icon: '🔫',
        stars: 2,
        description: '4門の重機関銃。非常に高い連射速度を持ちます。',
        stats: {
            airAttack: 36.0,
            reliability: 1.0,
            weight: 1.2,
            cost: 2.00
        }
    },
    {
        id: 'light_mg_x2',
        name: '軽機関銃×2',
        icon: '🔫',
        stars: 1,
        description: '2門の軽機関銃。軽量で燃費が良い基本武装です。',
        stats: {
            airAttack: 10.0,
            reliability: 3.0,
            weight: 0.3,
            cost: 0.50
        }
    },
    {
        id: 'light_mg_x4',
        name: '軽機関銃×4',
        icon: '🔫',
        stars: 2,
        description: '4門の軽機関銃。軽量ながら十分な火力を持ちます。',
        stats: {
            airAttack: 20.0,
            reliability: 3.0,
            weight: 0.6,
            cost: 1.00
        }
    },
    {
        id: 'cannon_2x1',
        name: '大砲II×1',
        icon: '💥',
        stars: 2,
        description: '改良された大砲。より強力な火力を持ちますが重量が増加します。',
        stats: {
            airAttack: 24.0,
            surfaceAttack: 2.0,
            reliability: 1.0,
            weight: 1.0,
            cost: 1.50
        }
    },
    {
        id: 'large_cannon_1x',
        name: '1×大型大砲',
        icon: '💥',
        stars: 1,
        description: '大型の単発砲。非常に強力ですが重量とコストが大幅に増加します。',
        stats: {
            airAttack: 12.0,
            surfaceAttack: 10.0,
            reliability: 1.0,
            weight: 2.0,
            cost: 3.00
        }
    },
    {
        id: 'cannon_2x2',
        name: '大砲II×2',
        icon: '💥',
        stars: 2,
        description: '2門の改良された大砲。高い火力を持ちますが重量とコストが大幅に増加します。',
        stats: {
            airAttack: 48.0,
            surfaceAttack: 4.0,
            reliability: 1.0,
            weight: 2.0,
            cost: 3.00
        }
    },
    {
        id: 'large_cannon_2x',
        name: '2×大型大砲',
        icon: '💥',
        stars: 1,
        description: '2門の大型砲。対地攻撃に特化していますが非常に重く高価です。',
        stats: {
            airAttack: 24.0,
            surfaceAttack: 20.0,
            reliability: 1.0,
            weight: 4.0,
            cost: 6.00
        }
    }
];
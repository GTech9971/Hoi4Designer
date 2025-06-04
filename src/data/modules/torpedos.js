export const torpedoModules = [
    {
        id: 'torpedo_1',
        name: '軽魚雷',
        icon: '🚀',
        stars: 1,
        description: '軽量で取り回しの良い魚雷を搭載する装置。対艦攻撃に特化しており、機動性への影響は軽微です。',
        stats: {
            navalAttack: 28.2,
            weight: 1.0,
            agility: -0.2,
            cost: 4.00
        }
    },
    {
        id: 'torpedo_2',
        name: '軽魚雷の安価な代',
        icon: '🚀',
        stars: 1,
        description: '安価で軽量な魚雷の代替品。性能は劣りますが、コストを抑えて対艦攻撃力を向上させます。',
        stats: {
            navalAttack: 18.0,
            weight: 0.8,
            agility: -0.1,
            cost: 2.00
        }
    },
    {
        id: 'torpedo_3',
        name: '軽魚雷の小型版',
        icon: '🚀',
        stars: 1,
        description: 'さらに小型化された魚雷。機動性への影響を最小限に抑えつつ、対艦攻撃力を提供します。',
        stats: {
            navalAttack: 13.1,
            weight: 0.6,
            agility: -0.05,
            cost: 1.50
        }
    }
];
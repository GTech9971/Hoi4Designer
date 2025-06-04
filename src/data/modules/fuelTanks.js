export const fuelTankModules = [
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
        id: 'self_oxygen',
        name: '自己酸素供給タンク',
        icon: '🫁',
        stars: 2,
        description: '高高度飛行を可能にする酸素供給システムです。',
        stats: {
            altitude: 50,
            reliability: 1.0,
            weight: 0.3,
            cost: 1.0
        }
    }
];
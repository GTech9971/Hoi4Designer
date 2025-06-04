export const bombModules = [
    {
        id: 'armor_piercing_bomb',
        name: '徹甲爆弾層',
        icon: '💣',
        stars: 2,
        description: '対戦車用の徹甲爆弾。装甲目標に対して非常に効果的ですが、重量が大きく機動性に影響します。',
        stats: {
            surfaceAttack: 42.0,
            weight: 3.0,
            agility: -10.0,
            cost: 1.00
        }
    },
    {
        id: 'incendiary_bomb',
        name: '仕込み爆弾',
        icon: '🔥',
        stars: 2,
        description: '焼夷弾。対地攻撃に特化した爆弾で、広範囲に被害を与えます。',
        stats: {
            surfaceAttack: 48.0,
            weight: 2.0,
            agility: -5.0,
            cost: 1.00
        }
    },
    {
        id: 'large_bomb',
        name: '大型爆弾層',
        icon: '💥',
        stars: 2,
        description: '大型の高性能爆弾。非常に強力な爆発力を持ちますが、重量が大きく機動性に大きく影響します。',
        stats: {
            surfaceAttack: 20.0,
            weight: 15.0,
            agility: -40.0,
            cost: 5.00
        }
    },
    {
        id: 'rocket_rail',
        name: 'ロケットレール',
        icon: '🚀',
        stars: 2,
        description: '地上目標を支援する対戦車ロケット。高精度で目標を破壊できます。',
        stats: {
            surfaceAttack: 15.0,
            weight: 2.0,
            agility: -5.0,
            cost: 1.00
        }
    },
    {
        id: 'small_bomb',
        name: '小型爆弾層',
        icon: '💣',
        stars: 1,
        description: '軽量な小型爆弾。機動性への影響が少なく、繰り返し使用に適しています。',
        stats: {
            surfaceAttack: 15.0,
            weight: 2.0,
            agility: -3.0,
            cost: 1.50
        }
    },
    {
        id: 'anti_tank_gun_1',
        name: '対戦車砲I',
        icon: '🎯',
        stars: 1,
        description: '小型対戦車砲の対戦車砲。対戦車目標に対して特化した武装です。',
        stats: {
            surfaceAttack: 6.0,
            weight: 3.0,
            agility: -15.0,
            cost: 3.00
        }
    },
    {
        id: 'anti_tank_gun_2',
        name: '対戦車砲II',
        icon: '🎯',
        stars: 2,
        description: '現代技術で強化されたバージョンのより強力な対戦車砲。非常に優れた対戦車能力を持ちますが、重量と機動性に大きく影響します。',
        stats: {
            surfaceAttack: 15.0,
            weight: 15.0,
            agility: -20.0,
            cost: 8.00
        }
    }
];

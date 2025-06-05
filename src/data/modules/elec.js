export const elecModules = [
    {
        id: 'air_radar_1',
        name: '空対空レーダーI',
        icon: '📡',
        stars: 1,
        description: '空対空レーダー。航空機のレーダーアンテナが装備されたとして、対空戦闘の攻撃を受けた時に回避性が向上する。',
        stats: {
            airDefense: 1.0,
            agility: 20.0,
            nightPenalty: -20.0,
            weight: 0.5,
            cost: 4.00
        }
    },
    {
        id: 'air_radar_1_alt',
        name: '空対空レーダーI',
        icon: '📡',
        stars: 1,
        description: '改良された空対空レーダー。より高性能な探知能力を持ちます。',
        stats: {
            airDefense: 2.0,
            agility: 18.0,
            nightPenalty: -18.0,
            weight: 0.5,
            cost: 4.00
        }
    },
    {
        id: 'bomb_sight_1',
        name: '爆撃照準器I',
        icon: '🎯',
        stars: 1,
        description: '爆撃照準器。航空機により正確な爆撃を行うことができるようになり、敵味方の機械を精確に攻撃できる。',
        stats: {
            surfaceAttack: 4.0,
            weight: 1.0,
            nightPenalty: -10.0,
            cost: 1.50
        }
    },
    {
        id: 'radio_nav_1',
        name: '無線航行I',
        icon: '📻',
        stars: 1,
        description: '無線航行装置。より長距離の飛行と迷子を防ぐために誘導システムが装備される。',
        stats: {
            range: 4.0,
            reliability: 1.0,
            weight: 0.3,
            nightPenalty: -10.0,
            cost: 1.50
        }
    },
    {
        id: 'air_radar_2',
        name: '空対空レーダーII',
        icon: '📡',
        stars: 1,
        description: 'より強力な空対空レーダー。より早く敵機を発見でき回避性も向上します。',
        stats: {
            airDefense: 4.0,
            agility: 30.0,
            weight: 0.7,
            nightPenalty: -40.0,
            cost: 6.00
        }
    },
    {
        id: 'air_radar_2_alt',
        name: '空対空レーダーII',
        icon: '📡',
        stars: 1,
        description: '空対空を使用して敵戦闘機レーダー回避により早期に警告し、適切に回避される。',
        stats: {
            airDefense: 4.0,
            agility: 35.0,
            weight: 0.7,
            nightPenalty: -30.0,
            cost: 6.00
        }
    },
    {
        id: 'bomb_sight_2',
        name: '爆撃照準器II',
        icon: '🎯',
        stars: 1,
        description: '改良された爆撃照準器。コンピューター誘導と、自動計算、音波計算して対抗を正確に算出できる。',
        stats: {
            surfaceAttack: 6.0,
            weight: 1.2,
            nightPenalty: -20.0,
            cost: 3.00
        }
    },
    {
        id: 'radio_nav_2',
        name: '無線航行II',
        icon: '📻',
        stars: 1,
        description: '最新の無線航行装置。より精密な航法により長距離飛行が可能になり、目標探知性能も向上します。',
        stats: {
            range: 6.0,
            reliability: 3.0,
            weight: 0.4,
            nightPenalty: -20.0,
            cost: 3.00
        }
    }
];
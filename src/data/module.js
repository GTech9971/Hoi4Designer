export const moduleData = {
    engine: [
        {
            id: 'engine_1',
            name: 'エンジンI×1',
            icon: '⚙️',
            stars: 1,
            description: '標準的なエンジンです。基本的な性能を提供しますが、すべてで劣りがちです。',
            stats: {
                maxSpeed: 20.0,
                reliability: 1.0,
                fuelUsage: 0.1,
                cost: 2.00
            }
        },
        {
            id: 'engine_2',
            name: 'エンジンII×1',
            icon: '⚙️',
            stars: 2,
            description: 'より強力なエンジンです。速度と機動性が向上しますが、燃料消費量が増加します。',
            stats: {
                maxSpeed: 80.0,
                reliability: 1.0,
                agility: 2.0,
                fuelUsage: 0.1,
                cost: 12.00
            }
        },
        {
            id: 'engine_3',
            name: 'エンジンIII×1',
            icon: '⚙️',
            stars: 3,
            description: 'メタノール供給により手動エンジン外の要素を無視することで、このエンジンは他のエンジン以上の対応率を実現します。',
            stats: {
                maxSpeed: 120.0,
                agility: 5.0,
                fuelUsage: 0.1,
                cost: 16.00
            }
        },
        {
            id: 'engine_4',
            name: 'エンジンIV×1',
            icon: '⚙️',
            stars: 4,
            description: 'より内らつ軽量を重ねた武力で、工場技師を常に的確にして、それが強化者にとって最高出力によってエンジンをバランスし直したもので実現する。',
            stats: {
                maxSpeed: 180.0,
                agility: 10.0,
                fuelUsage: 0.1,
                cost: 18.00
            }
        }
    ],
    cannon: [
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
    ],
    armor: [
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
    ],
    fuel_tank: [
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
    ],
    special: [
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
                weight: 1.0,
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
                nightPenalty: -20.0,
                cost: 3.00
            }
        }
    ]
};

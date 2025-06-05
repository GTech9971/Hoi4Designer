export const airframeTypes = {
    fighter: {
        id: 'fighter',
        name: '戦闘機',
        icon: '✈️',
        description: '敵航空機との戦闘に特化した単発エンジンの軽量機体。高い機動性と対空攻撃力を持つ。',
        baseWeight: 3.5, // 基本機体重量（より軽量）
        baseStats: {
            maxSpeed: 320.0,
            altitude: 450,
            agility: 0.35,
            reliability: 12.0,
            range: 0.85,
            fuelUsage: 0.8
        },
        baseCombatStats: {
            airAttack: 12.0,
            airDefense: 2.0,
            surfaceAttack: 8.0,
            surfaceDefense: 1.0,
            navalAttack: 0.5,
            navalDefense: 1.0,
            strategicBombing: 0.2,
            casualtyRate: 0.05,
            nightPenalty: 0.15
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 1 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['cannon'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon'], maxCount: 1 },
            { id: 'armor', name: '装甲', locked: true },
            { id: 'fuel_tank', name: '燃料タンク', locked: true },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 2 }
        ]
    },

    heavy_fighter: {
        id: 'heavy_fighter',
        name: '重戦闘機',
        icon: '🛩️',
        description: '双発エンジンの大型戦闘機。長距離飛行能力と重装備が可能だが機動性は劣る。',
        baseWeight: 5.5,
        baseStats: {
            maxSpeed: 280.0,
            altitude: 400,
            agility: 0.18,
            reliability: 15.0,
            range: 1.2,
            fuelUsage: 1.4
        },
        baseCombatStats: {
            airAttack: 15.0,
            airDefense: 8.0,
            surfaceAttack: 12.0,
            surfaceDefense: 1.5,
            navalAttack: 1.0,
            navalDefense: 1.2,
            strategicBombing: 0.5,
            casualtyRate: 0.08,
            nightPenalty: 0.10
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 2 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['cannon', 'bomb'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon', 'defense'], maxCount: 2 },
            { id: 'armor', name: '装甲', locked: false, maxCount: 1 },
            { id: 'fuel_tank', name: '燃料タンク', locked: true },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 2 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 2 }
        ]
    },

    tactical_bomber: {
        id: 'tactical_bomber',
        name: '戦術爆撃機',
        icon: '🛫',
        description: '地上目標への爆撃に特化した中型機。適度な爆弾搭載量と航続距離を持つ。',
        baseWeight: 7.0,
        baseStats: {
            maxSpeed: 240.0,
            altitude: 350,
            agility: 0.12,
            reliability: 18.0,
            range: 1.5,
            fuelUsage: 2.0
        },
        baseCombatStats: {
            airAttack: 5.0,
            airDefense: 3.0,
            surfaceAttack: 25.0,
            surfaceDefense: 2.0,
            navalAttack: 8.0,
            navalDefense: 1.5,
            strategicBombing: 2.0,
            casualtyRate: 0.12,
            nightPenalty: 0.25
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 2 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['bomb'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon', 'defense'], maxCount: 1 },
            { id: 'armor', name: '装甲', locked: false, maxCount: 1 },
            { id: 'fuel_tank', name: '燃料タンク', locked: false, maxCount: 1 },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 1 }
        ]
    },

    strategic_bomber: {
        id: 'strategic_bomber',
        name: '戦略爆撃機',
        icon: '✈️',
        description: '大型の四発爆撃機。長距離戦略爆撃に特化し、大量の爆弾を搭載可能。',
        baseWeight: 12.0,
        baseStats: {
            maxSpeed: 200.0,
            altitude: 300,
            agility: 0.08,
            reliability: 22.0,
            range: 2.5,
            fuelUsage: 4.0
        },
        baseCombatStats: {
            airAttack: 2.0,
            airDefense: 12.0,
            surfaceAttack: 15.0,
            surfaceDefense: 3.0,
            navalAttack: 5.0,
            navalDefense: 2.0,
            strategicBombing: 8.0,
            casualtyRate: 0.20,
            nightPenalty: 0.30
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 4 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['bomb'], maxCount: 2 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['defense'], maxCount: 3 },
            { id: 'armor', name: '装甲', locked: false, maxCount: 2 },
            { id: 'fuel_tank', name: '燃料タンク', locked: false, maxCount: 2 },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 1 }
        ]
    },

    cas: {
        id: 'cas',
        name: '急降下爆撃機',
        icon: '🎯',
        description: '地上部隊支援に特化した爆撃機。高精度の対地攻撃が可能。',
        baseWeight: 4.5,
        baseStats: {
            maxSpeed: 260.0,
            altitude: 300,
            agility: 0.20,
            reliability: 14.0,
            range: 1.0,
            fuelUsage: 1.5
        },
        baseCombatStats: {
            airAttack: 8.0,
            airDefense: 4.0,
            surfaceAttack: 35.0,
            surfaceDefense: 1.8,
            navalAttack: 3.0,
            navalDefense: 1.2,
            strategicBombing: 0.8,
            casualtyRate: 0.10,
            nightPenalty: 0.20
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 1 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['bomb', 'cannon'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon'], maxCount: 1 },
            { id: 'armor', name: '装甲', locked: false, maxCount: 1 },
            { id: 'fuel_tank', name: '燃料タンク', locked: true },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 2 }
        ]
    },

    naval_bomber: {
        id: 'naval_bomber',
        name: '艦上攻撃機',
        icon: '🚢',
        description: '海上目標への攻撃に特化した機体。魚雷や対艦爆弾を搭載可能。',
        baseWeight: 4.0,
        baseStats: {
            maxSpeed: 250.0,
            altitude: 250,
            agility: 0.15,
            reliability: 16.0,
            range: 1.3,
            fuelUsage: 1.2
        },
        baseCombatStats: {
            airAttack: 6.0,
            airDefense: 2.0,
            surfaceAttack: 8.0,
            surfaceDefense: 1.2,
            navalAttack: 28.0,
            navalDefense: 1.5,
            strategicBombing: 0.3,
            casualtyRate: 0.08,
            nightPenalty: 0.18
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 1 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['torpedo', 'bomb'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon'], maxCount: 1 },
            { id: 'armor', name: '装甲', locked: true },
            { id: 'fuel_tank', name: '燃料タンク', locked: false, maxCount: 1 },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 1 }
        ]
    }
};

export const getAirframeById = (id) => {
    return airframeTypes[id] || null;
};

export const getAllAirframes = () => {
    return Object.values(airframeTypes);
};
// HOI4準拠のエアフレームシステム
// 機体サイズと年代でエアフレームタイプが決まり、主兵装で役割が決定される

export const airframeSizes = {
    light: {
        id: 'light',
        name: '軽戦航空機',
        icon: '✈️',
        description: '単発エンジンの軽量機体。機動性に優れ、基本的な戦闘任務に適している。',
        baseWeight: 3.2,
        engineSlots: 1,
        baseStats: {
            maxSpeed: 300.0,
            altitude: 450,
            agility: 0.40,
            reliability: 12.0,
            range: 0.9,
            fuelUsage: 0.8
        },
        baseCombatStats: {
            airAttack: 8.0,
            airDefense: 1.0,
            surfaceAttack: 5.0,
            surfaceDefense: 0.8,
            navalAttack: 2.0,
            navalDefense: 0.8,
            strategicBombing: 0.1,
            casualtyRate: 0.05,
            nightPenalty: 0.20
        },
        // 主兵装による役割決定
        roles: {
            cannon: { name: '戦闘機', icon: '⚔️', specialization: 'air_superiority' },
            bomb: { name: '急降下爆撃機', icon: '🎯', specialization: 'cas' },
            torpedo: { name: '艦上戦闘機', icon: '🛩️', specialization: 'naval_strike' }
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 1 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['cannon', 'bomb', 'torpedo'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon'], maxCount: 1 },
            { id: 'armor', name: '装甲', locked: true },
            { id: 'fuel_tank', name: '燃料タンク', locked: true },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 2 }
        ]
    },

    medium: {
        id: 'medium',
        name: '中航空機',
        icon: '🛩️',
        description: '双発エンジンの中型機体。重装備が可能で、多様な任務に対応できる汎用性を持つ。',
        baseWeight: 6.0,
        engineSlots: 2,
        baseStats: {
            maxSpeed: 280.0,
            altitude: 400,
            agility: 0.20,
            reliability: 15.0,
            range: 1.4,
            fuelUsage: 1.6
        },
        baseCombatStats: {
            airAttack: 12.0,
            airDefense: 6.0,
            surfaceAttack: 18.0,
            surfaceDefense: 1.5,
            navalAttack: 8.0,
            navalDefense: 1.3,
            strategicBombing: 1.5,
            casualtyRate: 0.08,
            nightPenalty: 0.15
        },
        roles: {
            cannon: { name: '重戦闘機', icon: '⚔️', specialization: 'heavy_fighter' },
            bomb: { name: '戦術爆撃機', icon: '💥', specialization: 'tactical_bomber' },
            torpedo: { name: '攻撃機', icon: '🚀', specialization: 'naval_bomber' }
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 2 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['cannon', 'bomb', 'torpedo'], maxCount: 1 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon', 'defense'], maxCount: 2 },
            { id: 'armor', name: '装甲', locked: false, maxCount: 1 },
            { id: 'fuel_tank', name: '燃料タンク', locked: true },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 2 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 2 }
        ]
    },

    heavy: {
        id: 'heavy',
        name: '大型航空機',
        icon: '✈️',
        description: '四発エンジンの大型機体。長距離戦略任務や海上哨戒に特化した重装備機。',
        baseWeight: 12.0,
        engineSlots: 4,
        baseStats: {
            maxSpeed: 220.0,
            altitude: 350,
            agility: 0.08,
            reliability: 20.0,
            range: 2.8,
            fuelUsage: 3.5
        },
        baseCombatStats: {
            airAttack: 4.0,
            airDefense: 15.0,
            surfaceAttack: 12.0,
            surfaceDefense: 3.0,
            navalAttack: 15.0,
            navalDefense: 2.5,
            strategicBombing: 8.0,
            casualtyRate: 0.15,
            nightPenalty: 0.25
        },
        roles: {
            bomb: { name: '戦略爆撃機', icon: '💣', specialization: 'strategic_bomber' },
            torpedo: { name: '哨戒機', icon: '🔍', specialization: 'maritime_patrol' }
        },
        moduleSlots: [
            { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 4 },
            { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['bomb', 'torpedo'], maxCount: 2 },
            { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['defense'], maxCount: 4 },
            { id: 'armor', name: '装甲', locked: false, maxCount: 2 },
            { id: 'fuel_tank', name: '燃料タンク', locked: false, maxCount: 2 },
            { id: 'radio', name: '無線機', locked: true },
            { id: 'elec', name: '電装系', locked: false, maxCount: 2 },
            { id: 'special', name: '特殊装備', locked: false, maxCount: 1 }
        ]
    }
};

export const airframeGenerations = {
    early: {
        id: 'early',
        name: '初期型',
        year: '1936-1940',
        description: '戦前から大戦初期の技術で設計された機体。基本的な性能を持つ。',
        modifiers: {
            weight: 0.9,    // 軽い
            speed: 0.85,    // 遅い
            agility: 0.9,   // やや機動性低
            reliability: 0.8, // 信頼性低
            cost: 0.7       // 安い
        },
        icon: '📜'
    },
    basic: {
        id: 'basic',
        name: '基本型',
        year: '1940-1943',
        description: '大戦中期の標準的な技術で設計された機体。バランスの取れた性能。',
        modifiers: {
            weight: 1.0,    // 標準
            speed: 1.0,     // 標準
            agility: 1.0,   // 標準
            reliability: 1.0, // 標準
            cost: 1.0       // 標準
        },
        icon: '⚙️'
    },
    improved: {
        id: 'improved',
        name: '改良型',
        year: '1943-1945',
        description: '大戦後期の先進技術で設計された機体。高性能だが複雑。',
        modifiers: {
            weight: 1.1,    // やや重い
            speed: 1.2,     // 速い
            agility: 1.15,  // 高機動
            reliability: 1.1, // 高信頼性
            cost: 1.4       // 高価
        },
        icon: '🔧'
    },
    advanced: {
        id: 'advanced',
        name: '先進型',
        year: '1945+',
        description: '戦後技術の最新機体。最高性能だが非常に高価。',
        modifiers: {
            weight: 1.2,    // 重い
            speed: 1.4,     // 非常に速い
            agility: 1.3,   // 非常に高機動
            reliability: 1.25, // 非常に高信頼性
            cost: 2.0       // 非常に高価
        },
        icon: '🚀'
    }
};

// エアフレーム組み合わせを生成
export const generateAirframe = (size, generation) => {
    const sizeData = airframeSizes[size];
    const genData = airframeGenerations[generation];
    
    if (!sizeData || !genData) return null;

    return {
        id: `${size}_${generation}`,
        name: `${genData.name}${sizeData.name}`,
        displayName: `${sizeData.name} ${genData.name}`,
        size: size,
        generation: generation,
        year: genData.year,
        icon: sizeData.icon,
        genIcon: genData.icon,
        description: `${genData.description} ${sizeData.description}`,
        baseWeight: sizeData.baseWeight * genData.modifiers.weight,
        engineSlots: sizeData.engineSlots,
        
        // 世代による性能修正を適用
        baseStats: {
            maxSpeed: sizeData.baseStats.maxSpeed * genData.modifiers.speed,
            altitude: sizeData.baseStats.altitude,
            agility: sizeData.baseStats.agility * genData.modifiers.agility,
            reliability: sizeData.baseStats.reliability * genData.modifiers.reliability,
            range: sizeData.baseStats.range,
            fuelUsage: sizeData.baseStats.fuelUsage
        },
        
        baseCombatStats: sizeData.baseCombatStats,
        roles: sizeData.roles,
        moduleSlots: sizeData.moduleSlots,
        
        cost: genData.modifiers.cost,
        researchCost: genData.modifiers.cost * 10
    };
};

// 利用可能な全エアフレームを取得
export const getAllAirframes = () => {
    const airframes = [];
    
    Object.keys(airframeSizes).forEach(size => {
        Object.keys(airframeGenerations).forEach(generation => {
            airframes.push(generateAirframe(size, generation));
        });
    });
    
    return airframes;
};

// サイズと世代から特定のエアフレームを取得
export const getAirframe = (size, generation) => {
    return generateAirframe(size, generation);
};

// 主兵装に基づく機体役割を取得
export const getAircraftRole = (airframe, primaryWeaponType) => {
    if (!airframe || !airframe.roles) return null;
    return airframe.roles[primaryWeaponType] || null;
};
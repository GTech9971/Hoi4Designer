export const moduleSlots = [
    { id: 'engine', name: 'エンジン', locked: false },
    { id: 'cannon', name: '機関銃', locked: false },
    { id: 'armor', name: '装甲', locked: true },
    { id: 'fuel_tank', name: '燃料タンク', locked: true },
    { id: 'radio', name: '無線機', locked: true },
    { id: 'special', name: '特殊装備', locked: false }
];

export const baseStats = {
    maxSpeed: { label: '最高速度:', value: 280.0, unit: 'km/h' },
    altitude: { label: '高度:', value: 400, unit: 'km' },
    agility: { label: '機動性:', value: 0.24 },
    weight: { label: '重量:', value: 4.0 },
    reliability: { label: '信頼性:', value: 11.0 },
    range: { label: '航続距離:', value: 1.00 },
    fuelUsage: { label: '燃料使用量:', value: 0.0 }
};

export const baseCombatStats = {
    airAttack: { label: '対空攻撃力:', value: 7.0 },
    airDefense: { label: '対空防御力:', value: 0.0 },
    surfaceAttack: { label: '対地攻撃力:', value: 36.8 },
    surfaceDefense: { label: '対地防御力:', value: 1.00 },
    navalAttack: { label: '対艦攻撃力:', value: 1.00 },
    navalDefense: { label: '対艦防御力:', value: 1.00 },
    strategicBombing: { label: '戦略爆撃:', value: 1.00 },
    casualtyRate: { label: '損耗率:', value: 0.0 },
    nightPenalty: { label: '夜間ペナルティ:', value: 0.00 }
};
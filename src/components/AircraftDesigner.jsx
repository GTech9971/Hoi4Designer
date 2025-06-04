import React, { useState } from 'react';
import { Lock, Plus, X, ChevronUp, ChevronDown, Star, TrendingUp, TrendingDown } from 'lucide-react';

const AircraftDesigner = () => {
    const [selectedModuleSlot, setSelectedModuleSlot] = useState(null);
    const [equippedModules, setEquippedModules] = useState({
        engine: 'engine_1'
    });
    const [previousStats, setPreviousStats] = useState(null);
    const [presetName, setPresetName] = useState('FF「ワイフィ」');

    const moduleSlots = [
        { id: 'engine', name: 'エンジン', locked: false },
        { id: 'cannon', name: '機関銃', locked: false },
        { id: 'armor', name: '装甲', locked: true },
        { id: 'fuel_tank', name: '燃料タンク', locked: true },
        { id: 'radio', name: '無線機', locked: true },
        { id: 'special', name: '特殊装備', locked: false }
    ];

    const moduleData = {
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

    const baseStats = {
        maxSpeed: { label: '最高速度:', value: 280.0, unit: 'km/h' },
        altitude: { label: '高度:', value: 400, unit: 'km' },
        agility: { label: '機動性:', value: 0.24 },
        weight: { label: '重量:', value: 4.0 },
        reliability: { label: '信頼性:', value: 11.0 },
        range: { label: '航続距離:', value: 1.00 },
        fuelUsage: { label: '燃料使用量:', value: 0.0 }
    };

    const baseCombatStats = {
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

    const calculateStats = () => {
        let modifiedStats = JSON.parse(JSON.stringify(baseStats));
        let modifiedCombatStats = JSON.parse(JSON.stringify(baseCombatStats));

        // Apply module bonuses
        Object.entries(equippedModules).forEach(([slotId, moduleId]) => {
            const moduleCategory = moduleData[slotId];
            if (moduleCategory) {
                const module = moduleCategory.find(m => m.id === moduleId);
                if (module && module.stats) {
                    // Engine stats
                    if (module.stats.maxSpeed) {
                        modifiedStats.maxSpeed.value += module.stats.maxSpeed;
                    }
                    if (module.stats.fuelUsage) {
                        modifiedStats.fuelUsage.value += module.stats.fuelUsage;
                    }

                    // Combat stats
                    if (module.stats.airAttack) {
                        modifiedCombatStats.airAttack.value += module.stats.airAttack;
                    }
                    if (module.stats.airDefense) {
                        modifiedCombatStats.airDefense.value += module.stats.airDefense;
                    }
                    if (module.stats.surfaceAttack) {
                        modifiedCombatStats.surfaceAttack.value += module.stats.surfaceAttack;
                    }

                    // General stats
                    if (module.stats.weight) {
                        modifiedStats.weight.value += module.stats.weight;
                    }
                    if (module.stats.range) {
                        modifiedStats.range.value += module.stats.range;
                    }
                    if (module.stats.agility) {
                        modifiedStats.agility.value += module.stats.agility / 100;
                    }
                    if (module.stats.reliability) {
                        modifiedStats.reliability.value += module.stats.reliability;
                    }
                    if (module.stats.altitude) {
                        modifiedStats.altitude.value += module.stats.altitude;
                    }
                    if (module.stats.nightPenalty) {
                        modifiedCombatStats.nightPenalty.value += module.stats.nightPenalty / 100;
                    }
                }
            }
        });

        return { modifiedStats, modifiedCombatStats };
    };

    const { modifiedStats, modifiedCombatStats } = calculateStats();

    const handleModuleSlotClick = (slotId) => {
        if (moduleSlots.find(s => s.id === slotId)?.locked) return;
        if (!moduleData[slotId]) return; // モジュールデータが存在しない場合は何もしない

        // 現在のステータスを保存
        setPreviousStats({
            stats: JSON.parse(JSON.stringify(modifiedStats)),
            combatStats: JSON.parse(JSON.stringify(modifiedCombatStats))
        });
        setSelectedModuleSlot(slotId);
    };

    const handleModuleSelect = (moduleId) => {
        setEquippedModules(prev => ({
            ...prev,
            [selectedModuleSlot]: moduleId
        }));
        setSelectedModuleSlot(null);
    };

    const handleModuleRemove = (slotId) => {
        setPreviousStats({
            stats: JSON.parse(JSON.stringify(modifiedStats)),
            combatStats: JSON.parse(JSON.stringify(modifiedCombatStats))
        });
        setEquippedModules(prev => {
            const newModules = { ...prev };
            delete newModules[slotId];
            return newModules;
        });
    };

    const renderStars = (count) => {
        return (
            <div className="flex">
                {[...Array(count)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-current" />
                ))}
            </div>
        );
    };

    const renderStatChange = (currentValue, previousValue) => {
        if (!previousStats) return null;

        const diff = currentValue - previousValue;
        if (Math.abs(diff) < 0.01) return null;

        const isPositive = diff > 0;
        const color = isPositive ? 'text-green-400' : 'text-red-400';
        const icon = isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />;

        return (
            <div className={`flex items-center space-x-1 ${color}`}>
                {icon}
                <span className="text-xs">
                    {isPositive ? '+' : ''}{diff.toFixed(1)}
                </span>
            </div>
        );
    };

    if (selectedModuleSlot && moduleData[selectedModuleSlot]) {
        return (
            <div className="bg-gray-900 text-yellow-100 font-mono text-sm min-h-screen p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-yellow-800 to-yellow-700 p-3 rounded border border-yellow-600">
                    <h1 className="text-xl font-bold text-yellow-100">モジュール選択 - {moduleSlots.find(s => s.id === selectedModuleSlot)?.name}</h1>
                    <button
                        onClick={() => {
                            setSelectedModuleSlot(null);
                            setPreviousStats(null);
                        }}
                        className="text-yellow-100 hover:text-white bg-gray-700 px-3 py-1 rounded"
                    >
                        戻る
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Panel - Module List */}
                    <div className="space-y-2">
                        {/* Remove Module Option */}
                        {equippedModules[selectedModuleSlot] && (
                            <div
                                onClick={() => {
                                    handleModuleRemove(selectedModuleSlot);
                                    setSelectedModuleSlot(null);
                                }}
                                className="bg-red-800 border border-red-600 rounded p-4 hover:bg-red-700 cursor-pointer transition-colors mb-4"
                            >
                                <div className="flex items-center space-x-3">
                                    <X size={20} className="text-red-300" />
                                    <span className="text-red-100 font-bold">モジュールを取り外す</span>
                                </div>
                                <p className="text-xs text-red-300 mt-1">現在装備中のモジュールを取り外します</p>
                            </div>
                        )}

                        {moduleData[selectedModuleSlot].map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handleModuleSelect(module.id)}
                                className={`border rounded p-4 hover:bg-gray-700 cursor-pointer transition-colors ${equippedModules[selectedModuleSlot] === module.id
                                    ? 'bg-green-800 border-green-600'
                                    : 'bg-gray-800 border-yellow-600'
                                    }`}
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="text-2xl">{module.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-yellow-100 font-bold">{module.name}</span>
                                            {renderStars(module.stars)}
                                            {equippedModules[selectedModuleSlot] === module.id && (
                                                <span className="text-xs bg-green-600 px-2 py-1 rounded">装備中</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-300 grid grid-cols-2 gap-2">
                                    {Object.entries(module.stats).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <span className="capitalize">{key}:</span>
                                            <span className="text-green-400">+{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Panel - Module Details */}
                    <div className="bg-gray-800 border border-yellow-600 rounded p-4">
                        <h3 className="text-yellow-100 font-bold mb-4">詳細</h3>
                        {moduleData[selectedModuleSlot][0] && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">{moduleData[selectedModuleSlot][0].icon}</div>
                                    <div>
                                        <div className="text-lg font-bold text-yellow-100">
                                            {moduleData[selectedModuleSlot][0].name}
                                        </div>
                                        {renderStars(moduleData[selectedModuleSlot][0].stars)}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {moduleData[selectedModuleSlot][0].description}
                                </p>

                                <div className="space-y-2">
                                    <h4 className="text-yellow-100 font-bold border-b border-gray-600 pb-1">ステータス効果</h4>
                                    {Object.entries(moduleData[selectedModuleSlot][0].stats).map(([key, value]) => (
                                        <div key={key} className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">{key}:</span>
                                            <span className="text-green-400 font-mono">+{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-600">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">生産コスト:</span>
                                        <span className="text-yellow-400 font-mono">+{moduleData[selectedModuleSlot][0].stats.cost || 1.00}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">開発コスト:</span>
                                        <span className="text-red-400 font-mono">1</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-yellow-100 font-mono text-sm min-h-screen p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-yellow-800 to-yellow-700 p-3 rounded border border-yellow-600">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-yellow-100">飛行機の設計社</h1>
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-200 text-sm">プリセット:</span>
                        <span className="text-yellow-100 font-bold bg-gray-800 px-3 py-1 rounded border border-gray-600">
                            {presetName}
                        </span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="text-yellow-100 hover:text-white">
                        <ChevronUp size={20} />
                    </button>
                    <button className="text-yellow-100 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Aircraft Name and Modules */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Aircraft Type */}
                    <div className="bg-gray-800 border border-yellow-600 rounded p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-yellow-600 rounded"></div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={presetName}
                                    onChange={(e) => setPresetName(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-yellow-100 font-bold text-sm w-full focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                                    placeholder="プリセット名を入力..."
                                />
                            </div>
                            <span className="text-gray-400">2</span>
                        </div>
                        <p className="text-xs text-gray-300">主兵装を追加して傷等を与える</p>
                    </div>

                    {/* Module Slots */}
                    <div className="bg-gray-800 border border-yellow-600 rounded p-4">
                        <h3 className="text-yellow-100 font-bold mb-3 border-b border-gray-600 pb-2">戦闘機の設計概体</h3>
                        <div className="space-y-2">
                            {moduleSlots.map((slot) => (
                                <div
                                    key={slot.id}
                                    onClick={() => handleModuleSlotClick(slot.id)}
                                    className={`flex items-center space-x-2 bg-gray-700 p-2 rounded transition-colors ${slot.locked ? 'cursor-not-allowed' :
                                        moduleData[slot.id] ? 'hover:bg-gray-600 cursor-pointer' : 'cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    {slot.locked ? (
                                        <Lock size={16} className="text-gray-500" />
                                    ) : (
                                        <div className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center">
                                            {equippedModules[slot.id] ? (
                                                <div className="w-4 h-4 bg-green-500 rounded"></div>
                                            ) : (
                                                <Plus size={12} className="text-yellow-100" />
                                            )}
                                        </div>
                                    )}
                                    <span className={`flex-1 ${slot.locked ? 'text-gray-500' :
                                        moduleData[slot.id] ? 'text-yellow-100' : 'text-gray-500'
                                        }`}>
                                        {slot.name}
                                    </span>
                                    {equippedModules[slot.id] && moduleData[slot.id] && (
                                        <span className="text-xs text-green-400">
                                            {moduleData[slot.id]?.find(m => m.id === equippedModules[slot.id])?.name || equippedModules[slot.id]}
                                        </span>
                                    )}
                                    {!moduleData[slot.id] && !slot.locked && (
                                        <span className="text-xs text-gray-500">未実装</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Panel - Aircraft Blueprint */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-800 border border-yellow-600 rounded p-6 h-96">
                        <h3 className="text-yellow-100 font-bold mb-4 text-center">戦闘機の設計概体</h3>
                        <div className="flex items-center justify-center h-full">
                            {/* Aircraft SVG Outline */}
                            <svg width="300" height="200" viewBox="0 0 300 200" className="text-gray-400">
                                <path
                                    d="M50 100 L80 90 L150 100 L220 90 L250 100 L220 110 L150 100 L80 110 Z M100 80 L100 120 M200 80 L200 120 M150 60 L150 140"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />
                                {/* Engine module highlight - always show since engine is always equipped */}
                                {equippedModules.engine && (
                                    <>
                                        <circle cx="150" cy="100" r="8" fill="#fbbf24" className="opacity-80" />
                                        <text x="150" y="130" textAnchor="middle" className="text-xs fill-yellow-400">エンジン</text>
                                    </>
                                )}

                                {/* Gun module highlight */}
                                {equippedModules.cannon && (
                                    <>
                                        <circle cx="120" cy="100" r="6" fill="#10b981" className="opacity-80" />
                                        <text x="120" y="85" textAnchor="middle" className="text-xs fill-green-400">機関銃</text>
                                    </>
                                )}

                                {/* Special equipment module highlight */}
                                {equippedModules.special && (
                                    <>
                                        <circle cx="200" cy="100" r="6" fill="#8b5cf6" className="opacity-80" />
                                        <text x="200" y="85" textAnchor="middle" className="text-xs fill-purple-400">特殊</text>
                                    </>
                                )}
                            </svg>
                        </div>
                        <div className="flex justify-center mt-4">
                            <div className="bg-green-600 rounded-full p-2">
                                <ChevronUp size={16} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Stats */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Primary Stats */}
                    <div className="bg-gradient-to-b from-yellow-800 to-yellow-900 border border-yellow-600 rounded p-4">
                        <h3 className="text-yellow-100 font-bold mb-3 border-b border-yellow-600 pb-2">基本能力</h3>
                        <div className="space-y-1">
                            {Object.entries(modifiedStats).map(([key, stat]) => (
                                <div key={key} className="flex justify-between items-center text-xs">
                                    <span className="text-yellow-200">{stat.label}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white font-mono">
                                            {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value} {stat.unit || ''}
                                        </span>
                                        {previousStats && renderStatChange(stat.value, previousStats.stats[key]?.value || stat.value)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Combat Stats */}
                    <div className="bg-gradient-to-b from-yellow-800 to-yellow-900 border border-yellow-600 rounded p-4">
                        <h3 className="text-yellow-100 font-bold mb-3 border-b border-yellow-600 pb-2">その他統計</h3>
                        <div className="space-y-1">
                            {Object.entries(modifiedCombatStats).map(([key, stat]) => (
                                <div key={key} className="flex justify-between items-center text-xs">
                                    <span className="text-yellow-200">{stat.label}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white font-mono">
                                            {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
                                        </span>
                                        {previousStats && renderStatChange(stat.value, previousStats.combatStats[key]?.value || stat.value)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Template Section */}
                    <div className="bg-gray-800 border border-yellow-600 rounded p-4">
                        <h3 className="text-yellow-100 font-bold mb-3">概要</h3>
                        <div className="bg-gray-700 p-3 rounded">
                            <div className="text-xs text-gray-300 mb-2">改良された戦闘機体系</div>
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-8 h-6 bg-gray-600 rounded"></div>
                                <span className="text-xs">54.4</span>
                                <div className="flex-1 bg-blue-600 h-2 rounded"></div>
                            </div>

                            {/* Preset Name Display */}
                            <div className="border-t border-gray-600 pt-3">
                                <div className="text-xs text-gray-400 mb-1">現在のプリセット:</div>
                                <div className="text-sm text-yellow-100 font-bold bg-gray-800 px-2 py-1 rounded border border-gray-600">
                                    {presetName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Panel - Production Cost */}
            <div className="mt-6 bg-gray-800 border border-yellow-600 rounded p-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-8">
                        <div className="text-xs">
                            <span className="text-gray-400">プリセット名: </span>
                            <span className="text-yellow-100 font-bold">{presetName}</span>
                        </div>
                        <div className="text-xs">
                            <span className="text-gray-400">転換コスト: </span>
                            <span className="text-white">27</span>
                        </div>
                        <div className="text-xs">
                            <span className="text-gray-400">生産コスト: </span>
                            <span className="text-yellow-400">13.94</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-xs font-bold">
                            保存
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-xs">
                            キャンセル
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AircraftDesigner;
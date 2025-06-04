import React from 'react';
import { Lock, Plus, X, ChevronUp, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { moduleData } from '../data/module';

const MainDesignScreen = ({
    presetName,
    setPresetName,
    moduleSlots,
    equippedModules,
    modifiedStats,
    modifiedCombatStats,
    previousStats,
    onModuleSlotClick
}) => {
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
                                    onClick={() => onModuleSlotClick(slot.id)}
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

export default MainDesignScreen;
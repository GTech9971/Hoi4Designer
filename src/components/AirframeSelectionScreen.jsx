import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { getAllAirframes } from '../data/airframes/airframeTypes';

const AirframeSelectionScreen = ({ onAirframeSelect, onBack }) => {
    const airframes = getAllAirframes();

    const renderStars = (airframe) => {
        // エアフレームの複雑さに基づく星評価
        const complexity = {
            fighter: 2,
            cas: 2,
            naval_bomber: 3,
            heavy_fighter: 3,
            tactical_bomber: 4,
            strategic_bomber: 5
        };

        const count = complexity[airframe.id] || 3;
        return (
            <div className="flex">
                {[...Array(count)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-current" />
                ))}
            </div>
        );
    };

    const getAirframeCategory = (airframe) => {
        const categories = {
            fighter: '戦闘機系',
            heavy_fighter: '戦闘機系',
            cas: '爆撃機系',
            tactical_bomber: '爆撃機系',
            strategic_bomber: '爆撃機系',
            naval_bomber: '海軍航空機系'
        };
        return categories[airframe.id] || 'その他';
    };

    const groupedAirframes = airframes.reduce((groups, airframe) => {
        const category = getAirframeCategory(airframe);
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(airframe);
        return groups;
    }, {});

    return (
        <div className="bg-gray-900 text-yellow-100 font-mono text-sm min-h-screen p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-yellow-800 to-yellow-700 p-4 rounded border border-yellow-600">
                <h1 className="text-2xl font-bold text-yellow-100">エアフレーム選択</h1>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="text-yellow-100 hover:text-white bg-gray-700 px-3 py-2 rounded transition-colors"
                    >
                        戻る
                    </button>
                )}
            </div>

            {/* Description */}
            <div className="bg-gray-800 border border-yellow-600 rounded p-4 mb-6">
                <h2 className="text-lg font-bold text-yellow-100 mb-3">エアフレームについて</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                    エアフレームは航空機の基本設計を決定します。各エアフレームには固有のモジュールスロット制限、
                    基本性能、および装備可能な武器タイプの制限があります。用途に応じて適切なエアフレームを選択してください。
                </p>
            </div>

            {/* Airframe Categories */}
            <div className="space-y-6">
                {Object.entries(groupedAirframes).map(([category, categoryAirframes]) => (
                    <div key={category}>
                        <h3 className="text-xl font-bold text-yellow-100 mb-4 border-b border-yellow-600 pb-2">
                            {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryAirframes.map((airframe) => (
                                <div
                                    key={airframe.id}
                                    onClick={() => onAirframeSelect(airframe)}
                                    className="bg-gray-800 border border-yellow-600 rounded p-6 hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:border-yellow-500 hover:shadow-lg"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl">{airframe.icon}</div>
                                            <div>
                                                <h4 className="text-lg font-bold text-yellow-100">
                                                    {airframe.name}
                                                </h4>
                                                {renderStars(airframe)}
                                            </div>
                                        </div>
                                        <ArrowRight size={20} className="text-yellow-400" />
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                        {airframe.description}
                                    </p>

                                    {/* Key Stats */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">基本重量:</span>
                                            <span className="text-white">{airframe.baseWeight.toFixed(1)}t</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">最高速度:</span>
                                            <span className="text-green-400">{airframe.baseStats.maxSpeed.toFixed(0)} km/h</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">機動性:</span>
                                            <span className="text-blue-400">{airframe.baseStats.agility.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">航続距離:</span>
                                            <span className="text-purple-400">{airframe.baseStats.range.toFixed(1)}</span>
                                        </div>
                                    </div>

                                    {/* Module Slots Info */}
                                    <div className="border-t border-gray-600 pt-3">
                                        <div className="text-xs text-gray-400 mb-2">主要スロット:</div>
                                        <div className="grid grid-cols-2 gap-1 text-xs">
                                            {airframe.moduleSlots.slice(0, 4).map((slot) => (
                                                <div key={slot.id} className="flex justify-between">
                                                    <span className="text-gray-300">{slot.name}:</span>
                                                    <span className="text-yellow-400">
                                                        {slot.maxCount ? `×${slot.maxCount}` : slot.locked ? '固定' : '○'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Combat Focus */}
                                    <div className="border-t border-gray-600 pt-3 mt-3">
                                        <div className="text-xs text-gray-400 mb-2">戦闘特化:</div>
                                        <div className="flex space-x-2">
                                            {airframe.baseCombatStats.airAttack > 10 && (
                                                <span className="bg-blue-800 text-blue-200 px-2 py-1 rounded text-xs">対空</span>
                                            )}
                                            {airframe.baseCombatStats.surfaceAttack > 20 && (
                                                <span className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs">対地</span>
                                            )}
                                            {airframe.baseCombatStats.navalAttack > 15 && (
                                                <span className="bg-purple-800 text-purple-200 px-2 py-1 rounded text-xs">対艦</span>
                                            )}
                                            {airframe.baseCombatStats.strategicBombing > 3 && (
                                                <span className="bg-red-800 text-red-200 px-2 py-1 rounded text-xs">戦略</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 p-4 bg-gray-800 border border-yellow-600 rounded">
                <div className="text-center text-gray-400 text-sm">
                    <p>エアフレームを選択すると、設計画面に移行します。</p>
                    <p className="mt-1">各エアフレームには固有の制限と特性があるため、用途に応じて選択してください。</p>
                </div>
            </div>
        </div>
    );
};

export default AirframeSelectionScreen;
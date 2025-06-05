import React, { useState } from 'react';
import { Star, ArrowRight, Calendar, Cog } from 'lucide-react';
import { airframeSizes, airframeGenerations, getAllAirframes } from '../data/airframes/airframeTypes';

const AirframeSelectionScreen = ({ onAirframeSelect, onBack }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedGeneration, setSelectedGeneration] = useState(null);

    const airframes = getAllAirframes();

    const renderStars = (generation) => {
        const complexity = {
            early: 1,
            basic: 2,
            improved: 3,
            advanced: 4
        };
        
        const count = complexity[generation] || 2;
        return (
            <div className="flex">
                {[...Array(count)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-current" />
                ))}
            </div>
        );
    };

    // サイズでグループ化されたエアフレーム
    const groupedBySize = airframes.reduce((groups, airframe) => {
        if (!groups[airframe.size]) {
            groups[airframe.size] = [];
        }
        groups[airframe.size].push(airframe);
        return groups;
    }, {});

    return (
        <div className="bg-gray-900 text-yellow-100 font-mono text-sm min-h-screen p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-yellow-800 to-yellow-700 p-4 rounded border border-yellow-600">
                <h1 className="text-2xl font-bold text-yellow-100">航空機フレーム選択</h1>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="text-yellow-100 hover:text-white bg-gray-700 px-3 py-2 rounded transition-colors"
                    >
                        戻る
                    </button>
                )}
            </div>

            {/* HOI4システム説明 */}
            <div className="bg-gray-800 border border-yellow-600 rounded p-4 mb-6">
                <h2 className="text-lg font-bold text-yellow-100 mb-3">HOI4 航空機設計システム</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                        <h3 className="font-bold text-yellow-200 mb-2">🔧 フレーム選択</h3>
                        <p className="leading-relaxed">
                            まず <strong>機体サイズ</strong>（軽戦・中・大型）と <strong>技術世代</strong>（初期・基本・改良・先進）を選択します。
                            これにより基本性能とモジュールスロットが決定されます。
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-yellow-200 mb-2">⚔️ 役割決定</h3>
                        <p className="leading-relaxed">
                            <strong>主兵装の選択</strong>により最終的な機体役割が決まります。
                            例：中型機 + 機関銃 = 重戦闘機、中型機 + 爆弾 = 戦術爆撃機
                        </p>
                    </div>
                </div>
            </div>

            {/* 機体サイズ選択 */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-yellow-100 mb-4">1. 機体サイズを選択</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.values(airframeSizes).map((size) => (
                        <div
                            key={size.id}
                            onClick={() => {
                                setSelectedSize(size.id);
                                setSelectedGeneration(null);
                            }}
                            className={`p-6 rounded border cursor-pointer transition-all duration-200 ${
                                selectedSize === size.id
                                    ? 'bg-yellow-600 border-yellow-500 text-gray-900'
                                    : 'bg-gray-800 border-yellow-600 hover:bg-gray-700 hover:border-yellow-500'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <span className="text-3xl">{size.icon}</span>
                                <div>
                                    <h3 className="text-lg font-bold">{size.name}</h3>
                                    <div className="text-sm opacity-80">
                                        エンジン×{size.engineSlots} | 基本重量: {size.baseWeight}t
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-sm leading-relaxed mb-4 opacity-90">
                                {size.description}
                            </p>

                            {/* 可能な役割 */}
                            <div className="border-t pt-3 opacity-90" style={{
                                borderColor: selectedSize === size.id ? 'rgba(0,0,0,0.2)' : 'rgba(156,163,175,0.3)'
                            }}>
                                <div className="text-xs mb-2">可能な役割:</div>
                                <div className="flex flex-wrap gap-1">
                                    {Object.values(size.roles).map((role, index) => (
                                        <span
                                            key={index}
                                            className={`px-2 py-1 rounded text-xs ${
                                                selectedSize === size.id
                                                    ? 'bg-gray-800 text-yellow-400'
                                                    : 'bg-gray-700 text-gray-300'
                                            }`}
                                        >
                                            {role.icon} {role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 技術世代選択 */}
            {selectedSize && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-yellow-100 mb-4">2. 技術世代を選択</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.values(airframeGenerations).map((generation) => (
                            <div
                                key={generation.id}
                                onClick={() => setSelectedGeneration(generation.id)}
                                className={`p-4 rounded border cursor-pointer transition-all duration-200 ${
                                    selectedGeneration === generation.id
                                        ? 'bg-blue-600 border-blue-500 text-white'
                                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="text-2xl">{generation.icon}</span>
                                    <div>
                                        <h3 className="font-bold">{generation.name}</h3>
                                        <div className="text-xs opacity-80 flex items-center space-x-2">
                                            <Calendar size={12} />
                                            <span>{generation.year}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-xs leading-relaxed mb-3 opacity-90">
                                    {generation.description}
                                </p>

                                {/* 世代による修正値 */}
                                <div className="border-t pt-2 opacity-90" style={{
                                    borderColor: selectedGeneration === generation.id ? 'rgba(255,255,255,0.2)' : 'rgba(156,163,175,0.3)'
                                }}>
                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                        <div className="flex justify-between">
                                            <span>速度:</span>
                                            <span className={generation.modifiers.speed > 1 ? 'text-green-400' : generation.modifiers.speed < 1 ? 'text-red-400' : 'text-gray-300'}>
                                                {(generation.modifiers.speed * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>機動:</span>
                                            <span className={generation.modifiers.agility > 1 ? 'text-green-400' : generation.modifiers.agility < 1 ? 'text-red-400' : 'text-gray-300'}>
                                                {(generation.modifiers.agility * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>信頼性:</span>
                                            <span className={generation.modifiers.reliability > 1 ? 'text-green-400' : generation.modifiers.reliability < 1 ? 'text-red-400' : 'text-gray-300'}>
                                                {(generation.modifiers.reliability * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>コスト:</span>
                                            <span className={generation.modifiers.cost > 1 ? 'text-red-400' : generation.modifiers.cost < 1 ? 'text-green-400' : 'text-gray-300'}>
                                                {(generation.modifiers.cost * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 技術レベル表示 */}
                                <div className="mt-2 flex justify-center">
                                    {renderStars(generation.id)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 確定ボタン */}
            {selectedSize && selectedGeneration && (
                <div className="bg-gray-800 border border-yellow-600 rounded p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-yellow-100 mb-2">選択内容の確認</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">{airframeSizes[selectedSize].icon}</span>
                                    <span>{airframeSizes[selectedSize].name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">{airframeGenerations[selectedGeneration].icon}</span>
                                    <span>{airframeGenerations[selectedGeneration].name}</span>
                                    <span className="text-xs opacity-60">({airframeGenerations[selectedGeneration].year})</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                最終的な機体役割は主兵装の選択により決定されます
                            </p>
                        </div>
                        
                        <button
                            onClick={() => {
                                const selectedAirframe = airframes.find(af => 
                                    af.size === selectedSize && af.generation === selectedGeneration
                                );
                                onAirframeSelect(selectedAirframe);
                            }}
                            className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded font-bold text-white transition-colors flex items-center space-x-2"
                        >
                            <Cog size={20} />
                            <span>設計開始</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* フッター情報 */}
            <div className="mt-8 text-center text-gray-500 text-xs">
                <p>Hearts of Iron IV準拠の航空機設計システム</p>
                <p className="mt-1">機体サイズと技術世代を組み合わせて、あなたの戦略に最適な航空機を設計しましょう</p>
            </div>
        </div>
    );
};

export default AirframeSelectionScreen;
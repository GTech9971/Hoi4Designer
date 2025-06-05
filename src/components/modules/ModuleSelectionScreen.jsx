import React from 'react';
import { X, Check, Star } from 'lucide-react';
import { moduleData } from '../../data/module';

const ModuleSelectionScreen = ({
    selectedModuleSlot,
    selectedModuleForPreview,
    equippedModules,
    moduleSlots,
    totalThrust,
    totalWeight,
    isValidDesign,
    onBack,
    onModulePreview,
    onModuleConfirm,
    onModuleRemove,
    setSelectedModuleForPreview
}) => {
    const renderStars = (count) => {
        return (
            <div className="flex">
                {[...Array(count)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-current" />
                ))}
            </div>
        );
    };

    if (!selectedModuleSlot || !moduleData[selectedModuleSlot]) {
        return null;
    }

    return (
        <div className="bg-gray-900 text-yellow-100 font-mono text-sm min-h-screen p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-yellow-800 to-yellow-700 p-3 rounded border border-yellow-600">
                <h1 className="text-xl font-bold text-yellow-100">
                    モジュール選択 - {moduleSlots.find(s => s.id === selectedModuleSlot)?.name}
                </h1>
                <button
                    onClick={onBack}
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
                            onClick={onModuleRemove}
                            className="bg-red-800 border border-red-600 rounded p-4 hover:bg-red-700 cursor-pointer transition-colors mb-4"
                        >
                            <div className="flex items-center space-x-3">
                                <X size={20} className="text-red-300" />
                                <span className="text-red-100 font-bold">モジュールを取り外す</span>
                            </div>
                            <p className="text-xs text-red-300 mt-1">現在装備中のモジュールを取り外します</p>
                        </div>
                    )}

                    {/* Module List */}
                    {moduleData[selectedModuleSlot].map((module) => (
                        <div
                            key={module.id}
                            onClick={() => onModulePreview(module.id)}
                            className={`border rounded p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
                                selectedModuleForPreview === module.id
                                    ? 'bg-blue-800 border-blue-600'
                                    : equippedModules[selectedModuleSlot] === module.id
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
                                        {selectedModuleForPreview === module.id && (
                                            <span className="text-xs bg-blue-600 px-2 py-1 rounded">プレビュー中</span>
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

                {/* Right Panel - Module Details and Confirmation */}
                <div className="space-y-4">
                    {/* Thrust vs Weight Balance Display */}
                    <div className={`border rounded p-4 ${
                        isValidDesign 
                            ? 'bg-gradient-to-b from-green-800 to-green-900 border-green-600' 
                            : 'bg-gradient-to-b from-red-800 to-red-900 border-red-600'
                    }`}>
                        <h3 className="text-yellow-100 font-bold mb-3">推力バランス (プレビュー)</h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-200">総推力:</span>
                                <span className={`font-mono ${
                                    isValidDesign ? 'text-green-300' : 'text-white'
                                }`}>
                                    {totalThrust.toFixed(1)} kN
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-200">総重量:</span>
                                <span className={`font-mono ${
                                    isValidDesign ? 'text-white' : 'text-red-300'
                                }`}>
                                    {totalWeight.toFixed(1)} t
                                </span>
                            </div>
                            <div className={`flex justify-between items-center text-xs border-t pt-2 ${
                                isValidDesign ? 'border-green-600' : 'border-red-600'
                            } border-opacity-40`}>
                                <span className="text-yellow-200">設計状態:</span>
                                <span className={`font-bold ${
                                    isValidDesign ? 'text-green-300' : 'text-red-300'
                                }`}>
                                    {isValidDesign ? '有効' : '無効'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Module Details */}
                    <div className="bg-gray-800 border border-yellow-600 rounded p-4">
                        <h3 className="text-yellow-100 font-bold mb-4">詳細</h3>
                    {selectedModuleForPreview && moduleData[selectedModuleSlot] && (
                        <div className="space-y-4">
                            {(() => {
                                const module = moduleData[selectedModuleSlot].find(m => m.id === selectedModuleForPreview);
                                return (
                                    <>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl">{module.icon}</div>
                                            <div>
                                                <div className="text-lg font-bold text-yellow-100">
                                                    {module.name}
                                                </div>
                                                {renderStars(module.stars)}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {module.description}
                                        </p>

                                        <div className="space-y-2">
                                            <h4 className="text-yellow-100 font-bold border-b border-gray-600 pb-1">ステータス効果</h4>
                                            {Object.entries(module.stats).map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-sm">
                                                    <span className="text-gray-300 capitalize">{key}:</span>
                                                    <span className="text-green-400 font-mono">+{value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-600">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">生産コスト:</span>
                                                <span className="text-yellow-400 font-mono">+{module.stats.cost || 1.00}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">開発コスト:</span>
                                                <span className="text-red-400 font-mono">1</span>
                                            </div>
                                        </div>

                                        {/* Confirmation Buttons */}
                                        <div className="mt-6 pt-4 border-t border-gray-600">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={onModuleConfirm}
                                                    className={`flex-1 px-4 py-2 rounded text-sm font-bold transition-colors flex items-center justify-center space-x-2 ${
                                                        isValidDesign
                                                            ? 'bg-green-700 hover:bg-green-600 text-white'
                                                            : 'bg-gray-600 cursor-not-allowed text-gray-400'
                                                    }`}
                                                    disabled={!isValidDesign}
                                                    title={!isValidDesign ? '推力不足のため使用できません' : ''}
                                                >
                                                    <Check size={16} />
                                                    <span>決定</span>
                                                </button>
                                                <button
                                                    onClick={() => setSelectedModuleForPreview(null)}
                                                    className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm text-white transition-colors"
                                                >
                                                    キャンセル
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {!selectedModuleForPreview && (
                        <div className="text-center text-gray-500 py-8">
                            <p>モジュールを選択して詳細を確認してください</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleSelectionScreen;
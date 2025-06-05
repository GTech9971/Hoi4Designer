import React from 'react';
import { ArrowLeft } from 'lucide-react';

const WeaponTypeSelectionScreen = ({
    selectedSlot,
    moduleSlots,
    isWeaponTypeAllowed,
    onBack,
    onWeaponTypeSelect
}) => {
    const weaponTypes = [
        {
            id: 'cannon',
            name: '機関銃',
            icon: '🔫',
            description: '対空戦闘に特化した兵装。軽量で連射性能に優れ、敵戦闘機との空中戦に有効です。',
            advantages: ['軽量', '高連射率', '対空特化'],
            disadvantages: ['対艦攻撃力低']
        },
        {
            id: 'torpedo',
            name: '魚雷',
            icon: '🚀',
            description: '対艦攻撃に特化した兵装。重量はありますが、艦船に対して強力な攻撃力を発揮します。',
            advantages: ['高対艦攻撃力', '艦船撃沈能力'],
            disadvantages: ['重量増加', '機動性低下']
        },
        {
            id: 'bomb',
            name: '爆弾',
            icon: '💣',
            description: '対地攻撃に特化した兵装。CAS（近接航空支援）任務に最適で、地上目標に大きな损害を与えます。',
            advantages: ['高対地攻撃力', 'CAS特化', '幅広い破壊力'],
            disadvantages: ['重量増加', '機動性低下', '対空能力低']
        },
        {
            id: 'defense',
            name: '防衛砲塔',
            icon: '🛡️',
            description: '後方防衛に特化した砲塔。敵戦闘機からの攻撃に対して自衛能力を提供し、生存性を向上させます。',
            advantages: ['防御力向上', '後方防衛', '生存性向上'],
            disadvantages: ['重量増加', '機動性低下', '攻撃力無し']
        }
    ];

    return (
        <div className="bg-gray-900 text-yellow-100 font-mono text-sm min-h-screen p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-yellow-800 to-yellow-700 p-3 rounded border border-yellow-600">
                <h1 className="text-xl font-bold text-yellow-100">
                    兵装タイプ選択 - {moduleSlots.find(s => s.id === selectedSlot)?.name}
                </h1>
                <button
                    onClick={onBack}
                    className="text-yellow-100 hover:text-white bg-gray-700 px-3 py-1 rounded flex items-center space-x-2"
                >
                    <ArrowLeft size={16} />
                    <span>戻る</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {weaponTypes.map((weaponType) => {
                    const isAllowed = isWeaponTypeAllowed ? isWeaponTypeAllowed(selectedSlot, weaponType.id) : true;
                    return (
                        <div
                            key={weaponType.id}
                            onClick={() => isAllowed && onWeaponTypeSelect(weaponType.id)}
                            className={`border rounded p-6 transition-colors ${
                                isAllowed 
                                    ? 'bg-gray-800 border-yellow-600 hover:bg-gray-700 cursor-pointer' 
                                    : 'bg-gray-800 border-red-600 opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {!isAllowed && (
                                <div className="mb-4 p-2 bg-red-900 bg-opacity-50 border border-red-600 rounded">
                                    <div className="text-red-300 text-sm font-bold">⚠️ このエアフレームでは使用不可</div>
                                </div>
                            )}
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="text-4xl">{weaponType.icon}</div>
                            <div>
                                <h2 className="text-2xl font-bold text-yellow-100">{weaponType.name}</h2>
                                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                                    {weaponType.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* 利点 */}
                            <div>
                                <h3 className="text-green-400 font-bold mb-2 border-b border-green-600 pb-1">
                                    利点
                                </h3>
                                <ul className="space-y-1">
                                    {weaponType.advantages.map((advantage, index) => (
                                        <li key={index} className="text-sm text-green-300 flex items-center">
                                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                            {advantage}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 欠点 */}
                            <div>
                                <h3 className="text-red-400 font-bold mb-2 border-b border-red-600 pb-1">
                                    欠点
                                </h3>
                                <ul className="space-y-1">
                                    {weaponType.disadvantages.map((disadvantage, index) => (
                                        <li key={index} className="text-sm text-red-300 flex items-center">
                                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                            {disadvantage}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-600">
                            <div className="flex justify-center">
                                <button 
                                    className={`px-6 py-2 rounded font-bold transition-colors ${
                                        isAllowed
                                            ? 'bg-yellow-600 hover:bg-yellow-500 text-gray-900'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!isAllowed}
                                >
                                    {weaponType.name}を選択
                                </button>
                            </div>
                        </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeaponTypeSelectionScreen;
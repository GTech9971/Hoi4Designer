import React, { useState } from 'react';
import { moduleData } from '../data/module';
import MainDesignScreen from './MainDesignScreen';
import ModuleSelectionScreen from './modules/ModuleSelectionScreen';
import WeaponTypeSelectionScreen from './modules/WeaponTypeSelectionScreen';

const AircraftDesigner = () => {
    const [selectedModuleSlot, setSelectedModuleSlot] = useState(null);
    const [selectedModuleForPreview, setSelectedModuleForPreview] = useState(null);
    const [selectedWeaponType, setSelectedWeaponType] = useState(null);
    const [showWeaponTypeSelection, setShowWeaponTypeSelection] = useState(false);
    const [equippedModules, setEquippedModules] = useState({
        engine: 'engine_1',
        primary_weapon: 'cannon_1x1'
    });
    const [previousStats, setPreviousStats] = useState(null);
    const [presetName, setPresetName] = useState('FF「ワイフィ」');

    const moduleSlots = [
        { id: 'engine', name: 'エンジン', locked: false, required: true },
        { id: 'primary_weapon', name: '主兵装', locked: false, required: true },
        { id: 'secondary_weapon', name: '副兵装', locked: false, required: false },
        { id: 'armor', name: '装甲', locked: true },
        { id: 'fuel_tank', name: '燃料タンク', locked: true },
        { id: 'radio', name: '無線機', locked: true },
        { id: 'elec', name: '電装系', locked: false },
        { id: 'special', name: '特殊装備', locked: false }
    ];

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

    const calculateStats = (previewModuleId = null) => {
        let modifiedStats = JSON.parse(JSON.stringify(baseStats));
        let modifiedCombatStats = JSON.parse(JSON.stringify(baseCombatStats));

        // 現在装備中のモジュールを適用
        Object.entries(equippedModules).forEach(([slotId, moduleId]) => {
            let moduleCategory = moduleData[slotId];
            
            // 武器スロットの場合、モジュールIDから武器タイプを推定
            if ((slotId === 'primary_weapon' || slotId === 'secondary_weapon') && !moduleCategory) {
                // 機関銃から検索
                let module = moduleData[`${slotId}_cannon`]?.find(m => m.id === moduleId);
                if (module && module.stats) {
                    applyModuleStats(module.stats, modifiedStats, modifiedCombatStats);
                    return;
                }
                // 魚雷から検索
                module = moduleData[`${slotId}_torpedo`]?.find(m => m.id === moduleId);
                if (module && module.stats) {
                    applyModuleStats(module.stats, modifiedStats, modifiedCombatStats);
                    return;
                }
            }
            
            if (moduleCategory) {
                const module = moduleCategory.find(m => m.id === moduleId);
                if (module && module.stats) {
                    applyModuleStats(module.stats, modifiedStats, modifiedCombatStats);
                }
            }
        });

        // プレビュー用のモジュールがある場合は適用
        if (previewModuleId && selectedModuleSlot) {
            const effectiveSlotKey = selectedWeaponType ? `${selectedModuleSlot}_${selectedWeaponType}` : selectedModuleSlot;
            
            if (moduleData[effectiveSlotKey]) {
                const previewModule = moduleData[effectiveSlotKey].find(m => m.id === previewModuleId);
                if (previewModule && previewModule.stats) {
                    // 現在のスロットに装備されているモジュールがある場合は、その効果を先に除去
                    if (equippedModules[selectedModuleSlot]) {
                        // 武器スロットの場合、正しいモジュールを探して除去
                        if (selectedModuleSlot === 'primary_weapon' || selectedModuleSlot === 'secondary_weapon') {
                            const moduleId = equippedModules[selectedModuleSlot];
                            let currentModule = moduleData[`${selectedModuleSlot}_cannon`]?.find(m => m.id === moduleId);
                            if (!currentModule) {
                                currentModule = moduleData[`${selectedModuleSlot}_torpedo`]?.find(m => m.id === moduleId);
                            }
                            if (currentModule && currentModule.stats) {
                                applyModuleStats(currentModule.stats, modifiedStats, modifiedCombatStats, true);
                            }
                        } else {
                            const currentModule = moduleData[selectedModuleSlot]?.find(m => m.id === equippedModules[selectedModuleSlot]);
                            if (currentModule && currentModule.stats) {
                                applyModuleStats(currentModule.stats, modifiedStats, modifiedCombatStats, true);
                            }
                        }
                    }
                    applyModuleStats(previewModule.stats, modifiedStats, modifiedCombatStats);
                }
            }
        }

        return { modifiedStats, modifiedCombatStats };
    };

    const applyModuleStats = (stats, modifiedStats, modifiedCombatStats, remove = false) => {
        const multiplier = remove ? -1 : 1;

        // エンジン系ステータス
        if (stats.maxSpeed) {
            modifiedStats.maxSpeed.value += stats.maxSpeed * multiplier;
        }
        if (stats.fuelUsage) {
            modifiedStats.fuelUsage.value += stats.fuelUsage * multiplier;
        }

        // 戦闘系ステータス
        if (stats.airAttack) {
            modifiedCombatStats.airAttack.value += stats.airAttack * multiplier;
        }
        if (stats.airDefense) {
            modifiedCombatStats.airDefense.value += stats.airDefense * multiplier;
        }
        if (stats.surfaceAttack) {
            modifiedCombatStats.surfaceAttack.value += stats.surfaceAttack * multiplier;
        }
        if (stats.navalAttack) {
            modifiedCombatStats.navalAttack.value += stats.navalAttack * multiplier;
        }

        // 一般的なステータス
        if (stats.weight) {
            modifiedStats.weight.value += stats.weight * multiplier;
        }
        if (stats.range) {
            modifiedStats.range.value += stats.range * multiplier;
        }
        if (stats.agility) {
            modifiedStats.agility.value += stats.agility * multiplier;
        }
        if (stats.reliability) {
            modifiedStats.reliability.value += stats.reliability * multiplier;
        }
        if (stats.altitude) {
            modifiedStats.altitude.value += stats.altitude * multiplier;
        }
        if (stats.nightPenalty) {
            modifiedCombatStats.nightPenalty.value += stats.nightPenalty * multiplier;
        }
    };

    const { modifiedStats, modifiedCombatStats } = calculateStats(selectedModuleForPreview);

    const handleModuleSlotClick = (slotId) => {
        if (moduleSlots.find(s => s.id === slotId)?.locked) return;
        
        // 主兵装の場合、武器タイプ選択画面を表示
        if (slotId === 'primary_weapon' || slotId === 'secondary_weapon') {
            setPreviousStats({
                stats: JSON.parse(JSON.stringify(modifiedStats)),
                combatStats: JSON.parse(JSON.stringify(modifiedCombatStats))
            });
            setSelectedModuleSlot(slotId);
            setShowWeaponTypeSelection(true);
            return;
        }
        
        if (!moduleData[slotId]) return;

        // 現在のステータスを保存
        setPreviousStats({
            stats: JSON.parse(JSON.stringify(modifiedStats)),
            combatStats: JSON.parse(JSON.stringify(modifiedCombatStats))
        });
        setSelectedModuleSlot(slotId);
        setSelectedModuleForPreview(null);
    };

    const handleModulePreview = (moduleId) => {
        setSelectedModuleForPreview(moduleId);
    };

    const handleModuleConfirm = () => {
        if (selectedModuleForPreview && selectedModuleSlot) {
            setEquippedModules(prev => ({
                ...prev,
                [selectedModuleSlot]: selectedModuleForPreview
            }));
        }
        setSelectedModuleSlot(null);
        setSelectedModuleForPreview(null);
        setSelectedWeaponType(null);
        setPreviousStats(null);
    };

    const handleModuleRemove = () => {
        if (selectedModuleSlot) {
            setEquippedModules(prev => {
                const newModules = { ...prev };
                delete newModules[selectedModuleSlot];
                return newModules;
            });
        }
        setSelectedModuleSlot(null);
        setSelectedModuleForPreview(null);
        setSelectedWeaponType(null);
        setPreviousStats(null);
    };

    const handleWeaponTypeSelect = (weaponType) => {
        const slotKey = `${selectedModuleSlot}_${weaponType}`;
        setSelectedWeaponType(weaponType);
        setShowWeaponTypeSelection(false);
        // 選択された武器タイプに応じてモジュール選択画面へ
        // ここでselectedModuleSlotはそのまま保持し、weaponType情報を追加
    };
    
    const handleBack = () => {
        if (showWeaponTypeSelection) {
            setShowWeaponTypeSelection(false);
            setSelectedModuleSlot(null);
            setSelectedWeaponType(null);
            setPreviousStats(null);
        } else {
            setSelectedModuleSlot(null);
            setSelectedModuleForPreview(null);
            setSelectedWeaponType(null);
            setPreviousStats(null);
        }
    };

    // 武器タイプ選択画面を表示
    if (showWeaponTypeSelection && selectedModuleSlot) {
        return (
            <WeaponTypeSelectionScreen
                selectedSlot={selectedModuleSlot}
                moduleSlots={moduleSlots}
                onBack={handleBack}
                onWeaponTypeSelect={handleWeaponTypeSelect}
            />
        );
    }
    
    // モジュール選択画面を表示するかどうかの判定
    const effectiveSlotKey = selectedWeaponType ? `${selectedModuleSlot}_${selectedWeaponType}` : selectedModuleSlot;
    if (selectedModuleSlot && !showWeaponTypeSelection && selectedWeaponType && moduleData[effectiveSlotKey]) {
        return (
            <ModuleSelectionScreen
                selectedModuleSlot={effectiveSlotKey}
                selectedModuleForPreview={selectedModuleForPreview}
                equippedModules={equippedModules}
                moduleSlots={moduleSlots}
                onBack={handleBack}
                onModulePreview={handleModulePreview}
                onModuleConfirm={handleModuleConfirm}
                onModuleRemove={handleModuleRemove}
                setSelectedModuleForPreview={setSelectedModuleForPreview}
            />
        );
    }
    
    // 従来のモジュール選択（武器以外）
    if (selectedModuleSlot && !showWeaponTypeSelection && !selectedWeaponType && moduleData[selectedModuleSlot]) {
        return (
            <ModuleSelectionScreen
                selectedModuleSlot={selectedModuleSlot}
                selectedModuleForPreview={selectedModuleForPreview}
                equippedModules={equippedModules}
                moduleSlots={moduleSlots}
                onBack={handleBack}
                onModulePreview={handleModulePreview}
                onModuleConfirm={handleModuleConfirm}
                onModuleRemove={handleModuleRemove}
                setSelectedModuleForPreview={setSelectedModuleForPreview}
            />
        );
    }

    // メイン設計画面を表示
    return (
        <MainDesignScreen
            presetName={presetName}
            setPresetName={setPresetName}
            moduleSlots={moduleSlots}
            equippedModules={equippedModules}
            modifiedStats={modifiedStats}
            modifiedCombatStats={modifiedCombatStats}
            previousStats={previousStats}
            onModuleSlotClick={handleModuleSlotClick}
        />
    );
};

export default AircraftDesigner;
import React from 'react';
import { moduleData } from '../data/module';
import { getAircraftRole } from '../data/airframes/airframeTypes';
import { getWeaponTypeFromModuleId, isWeaponTypeAllowed } from '../utils/moduleHelpers';
import { useAircraftState } from '../hooks/useAircraftState';
import { useAircraftDesignCalculations } from '../hooks/useAircraftDesignCalculations';
import AirframeSelectionScreen from './AirframeSelectionScreen';
import MainDesignScreen from './MainDesignScreen';
import ModuleSelectionScreen from './modules/ModuleSelectionScreen';
import WeaponTypeSelectionScreen from './modules/WeaponTypeSelectionScreen';

const AircraftDesigner = () => {
    // 状態管理フックを使用
    const {
        selectedAirframe,
        equippedModules,
        selectedModuleSlot,
        selectedModuleForPreview,
        selectedWeaponType,
        showWeaponTypeSelection,
        previousStats,
        presetName,
        setPresetName,
        setPreviousStats,
        setSelectedModuleSlot,
        setSelectedModuleForPreview,
        setSelectedWeaponType,
        setShowWeaponTypeSelection,
        handleAirframeChange,
        updateEquippedModule,
        removeEquippedModule,
        resetSelection
    } = useAircraftState();

    // エアフレームに基づくモジュールスロットとベースステータスを取得
    const getAirframeConfig = () => {
        if (!selectedAirframe) {
            // デフォルトの戦闘機設定
            return {
                moduleSlots: [
                    { id: 'engine', name: 'エンジン', locked: false, required: true, maxCount: 1 },
                    { id: 'primary_weapon', name: '主兵装', locked: false, required: true, allowedTypes: ['cannon'], maxCount: 1 },
                    { id: 'secondary_weapon', name: '副兵装', locked: false, required: false, allowedTypes: ['cannon'], maxCount: 1 },
                    { id: 'armor', name: '装甲', locked: true },
                    { id: 'fuel_tank', name: '燃料タンク', locked: true },
                    { id: 'radio', name: '無線機', locked: true },
                    { id: 'elec', name: '電装系', locked: false, maxCount: 1 },
                    { id: 'special', name: '特殊装備', locked: false, maxCount: 2 }
                ],
                baseWeight: 4.0,
                baseStats: {
                    maxSpeed: { label: '最高速度:', value: 280.0, unit: 'km/h' },
                    altitude: { label: '高度:', value: 400, unit: 'km' },
                    agility: { label: '機動性:', value: 0.24 },
                    weight: { label: '重量:', value: 4.0 },
                    reliability: { label: '信頼性:', value: 11.0 },
                    range: { label: '航続距離:', value: 1.00 },
                    fuelUsage: { label: '燃料使用量:', value: 0.0 }
                },
                baseCombatStats: {
                    airAttack: { label: '対空攻撃力:', value: 7.0 },
                    airDefense: { label: '対空防御力:', value: 0.0 },
                    surfaceAttack: { label: '対地攻撃力:', value: 36.8 },
                    surfaceDefense: { label: '対地防御力:', value: 1.00 },
                    navalAttack: { label: '対艦攻撃力:', value: 1.00 },
                    navalDefense: { label: '対艦防御力:', value: 1.00 },
                    strategicBombing: { label: '戦略爆撃:', value: 1.00 },
                    casualtyRate: { label: '損耗率:', value: 0.0 },
                    nightPenalty: { label: '夜間ペナルティ:', value: 0.00 }
                }
            };
        }

        // 選択されたエアフレームの設定を使用
        const airframe = selectedAirframe;
        return {
            moduleSlots: airframe.moduleSlots,
            baseWeight: airframe.baseWeight,
            baseStats: {
                maxSpeed: { label: '最高速度:', value: airframe.baseStats.maxSpeed, unit: 'km/h' },
                altitude: { label: '高度:', value: airframe.baseStats.altitude, unit: 'km' },
                agility: { label: '機動性:', value: airframe.baseStats.agility },
                weight: { label: '重量:', value: airframe.baseWeight },
                reliability: { label: '信頼性:', value: airframe.baseStats.reliability },
                range: { label: '航続距離:', value: airframe.baseStats.range },
                fuelUsage: { label: '燃料使用量:', value: airframe.baseStats.fuelUsage }
            },
            baseCombatStats: {
                airAttack: { label: '対空攻撃力:', value: airframe.baseCombatStats.airAttack },
                airDefense: { label: '対空防御力:', value: airframe.baseCombatStats.airDefense },
                surfaceAttack: { label: '対地攻撃力:', value: airframe.baseCombatStats.surfaceAttack },
                surfaceDefense: { label: '対地防御力:', value: airframe.baseCombatStats.surfaceDefense },
                navalAttack: { label: '対艦攻撃力:', value: airframe.baseCombatStats.navalAttack },
                navalDefense: { label: '対艦防御力:', value: airframe.baseCombatStats.navalDefense },
                strategicBombing: { label: '戦略爆撃:', value: airframe.baseCombatStats.strategicBombing },
                casualtyRate: { label: '損耗率:', value: airframe.baseCombatStats.casualtyRate },
                nightPenalty: { label: '夜間ペナルティ:', value: airframe.baseCombatStats.nightPenalty }
            }
        };
    };

    const airframeConfig = getAirframeConfig();
    const { moduleSlots } = airframeConfig;
    
    // 計算ロジックフックを使用
    const {
        totalThrust,
        totalWeight,
        isValidDesign,
        modifiedStats,
        modifiedCombatStats
    } = useAircraftDesignCalculations(
        airframeConfig,
        equippedModules,
        selectedModuleForPreview,
        selectedModuleSlot,
        selectedWeaponType
    );

    // 現在の主兵装に基づく機体役割を取得
    const getCurrentAircraftRole = () => {
        if (!selectedAirframe || !equippedModules.primary_weapon) {
            return null;
        }
        
        // 主兵装のタイプを特定
        const weaponId = equippedModules.primary_weapon;
        const weaponType = getWeaponTypeFromModuleId(weaponId, 'primary_weapon');
        
        return getAircraftRole(selectedAirframe, weaponType);
    };

    const currentRole = getCurrentAircraftRole();

    // エアフレーム選択ハンドラー（useAircraftStateフックの関数を使用）
    const handleAirframeSelect = handleAirframeChange;

    // 武器タイプの制限チェック（utils/moduleHelpers.jsの関数を使用）
    const checkWeaponTypeAllowed = (slotId, weaponType) => {
        return isWeaponTypeAllowed(slotId, weaponType, moduleSlots);
    };

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
            updateEquippedModule(selectedModuleSlot, selectedModuleForPreview);
        }
        resetSelection();
    };

    const handleModuleRemove = () => {
        if (selectedModuleSlot) {
            removeEquippedModule(selectedModuleSlot);
        }
        resetSelection();
    };

    const handleWeaponTypeSelect = (weaponType) => {
        setSelectedWeaponType(weaponType);
        setShowWeaponTypeSelection(false);
    };
    
    const handleBack = () => {
        if (showWeaponTypeSelection) {
            setShowWeaponTypeSelection(false);
            setSelectedModuleSlot(null);
            setSelectedWeaponType(null);
            setPreviousStats(null);
        } else {
            resetSelection();
        }
    };

    // エアフレームが選択されていない場合はエアフレーム選択画面を表示
    if (!selectedAirframe) {
        return (
            <AirframeSelectionScreen
                onAirframeSelect={handleAirframeSelect}
            />
        );
    }

    // 武器タイプ選択画面を表示
    if (showWeaponTypeSelection && selectedModuleSlot) {
        return (
            <WeaponTypeSelectionScreen
                selectedSlot={selectedModuleSlot}
                moduleSlots={moduleSlots}
                isWeaponTypeAllowed={checkWeaponTypeAllowed}
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
                totalThrust={totalThrust}
                totalWeight={totalWeight}
                isValidDesign={isValidDesign}
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
                totalThrust={totalThrust}
                totalWeight={totalWeight}
                isValidDesign={isValidDesign}
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
            selectedAirframe={selectedAirframe}
            currentRole={currentRole}
            presetName={presetName}
            setPresetName={setPresetName}
            moduleSlots={moduleSlots}
            equippedModules={equippedModules}
            modifiedStats={modifiedStats}
            modifiedCombatStats={modifiedCombatStats}
            previousStats={previousStats}
            totalThrust={totalThrust}
            totalWeight={totalWeight}
            isValidDesign={isValidDesign}
            onModuleSlotClick={handleModuleSlotClick}
            onAirframeChange={() => handleAirframeChange(null)}
        />
    );
};

export default AircraftDesigner;

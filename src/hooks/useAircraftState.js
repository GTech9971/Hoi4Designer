import { useState } from 'react';

/**
 * 航空機の状態管理を行うカスタムフック
 * @returns {Object} 状態と更新関数
 */
export const useAircraftState = () => {
  // エアフレーム関連の状態
  const [selectedAirframe, setSelectedAirframe] = useState(null);
  
  // モジュール関連の状態
  const [equippedModules, setEquippedModules] = useState({
    engine: 'engine_1',
    primary_weapon: 'cannon_1x1'
  });
  
  // 選択・プレビュー関連の状態
  const [selectedModuleSlot, setSelectedModuleSlot] = useState(null);
  const [selectedModuleForPreview, setSelectedModuleForPreview] = useState(null);
  const [selectedWeaponType, setSelectedWeaponType] = useState(null);
  const [showWeaponTypeSelection, setShowWeaponTypeSelection] = useState(false);
  
  // ステータス関連の状態
  const [previousStats, setPreviousStats] = useState(null);
  
  // プリセット関連の状態
  const [presetName, setPresetName] = useState('FF「ワイフィ」');

  /**
   * エアフレーム変更ハンドラー
   * @param {Object} airframe - 選択されたエアフレーム
   */
  const handleAirframeChange = (airframe) => {
    setSelectedAirframe(airframe);
    // エアフレーム変更時に装備をリセット
    setEquippedModules({
      engine: 'engine_1'
    });
    setPresetName(`${airframe.displayName}「ワイフィ」`);
  };

  /**
   * モジュール装備の更新
   * @param {string} slotId - スロットID
   * @param {string} moduleId - モジュールID
   */
  const updateEquippedModule = (slotId, moduleId) => {
    setEquippedModules(prev => ({
      ...prev,
      [slotId]: moduleId
    }));
  };

  /**
   * モジュール装備の削除
   * @param {string} slotId - スロットID
   */
  const removeEquippedModule = (slotId) => {
    setEquippedModules(prev => {
      const newModules = { ...prev };
      delete newModules[slotId];
      return newModules;
    });
  };

  /**
   * 選択状態のリセット
   */
  const resetSelection = () => {
    setSelectedModuleSlot(null);
    setSelectedModuleForPreview(null);
    setSelectedWeaponType(null);
    setShowWeaponTypeSelection(false);
    setPreviousStats(null);
  };

  return {
    // 状態
    selectedAirframe,
    equippedModules,
    selectedModuleSlot,
    selectedModuleForPreview,
    selectedWeaponType,
    showWeaponTypeSelection,
    previousStats,
    presetName,
    
    // セッター
    setSelectedAirframe,
    setEquippedModules,
    setSelectedModuleSlot,
    setSelectedModuleForPreview,
    setSelectedWeaponType,
    setShowWeaponTypeSelection,
    setPreviousStats,
    setPresetName,
    
    // ヘルパー関数
    handleAirframeChange,
    updateEquippedModule,
    removeEquippedModule,
    resetSelection
  };
};

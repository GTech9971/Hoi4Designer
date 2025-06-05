import { useCallback } from 'react';
import { applyModuleStats } from '../utils/statsCalculator';
import { findModuleInAllCategories, getEffectiveSlotKey } from '../utils/moduleHelpers';

/**
 * 航空機のステータス計算を管理するカスタムフック
 * @param {Object} baseStats - 基本ステータス
 * @param {Object} baseCombatStats - 基本戦闘ステータス
 * @returns {Object} 計算関数
 */
export const useStatsCalculations = (baseStats, baseCombatStats) => {
  
  /**
   * 装備されたモジュールに基づいてステータスを計算
   * @param {Object} equippedModules - 装備中のモジュール
   * @param {string|null} previewModuleId - プレビュー中のモジュールID
   * @param {string|null} selectedModuleSlot - 選択中のモジュールスロット
   * @param {string|null} selectedWeaponType - 選択中の武器タイプ
   * @returns {Object} { modifiedStats, modifiedCombatStats }
   */
  const calculateStats = useCallback((
    equippedModules, 
    previewModuleId = null, 
    selectedModuleSlot = null, 
    selectedWeaponType = null
  ) => {
    let modifiedStats = JSON.parse(JSON.stringify(baseStats));
    let modifiedCombatStats = JSON.parse(JSON.stringify(baseCombatStats));

    // 現在装備中のモジュールを適用
    Object.entries(equippedModules).forEach(([slotId, moduleId]) => {
      const module = findModuleInAllCategories(moduleId, slotId);
      
      if (module && module.stats) {
        applyModuleStats(module.stats, modifiedStats, modifiedCombatStats);
      }
    });

    // プレビュー用のモジュールがある場合は適用
    if (previewModuleId && selectedModuleSlot) {
      const effectiveSlotKey = getEffectiveSlotKey(selectedModuleSlot, selectedWeaponType);
      
      const previewModule = findModuleInAllCategories(previewModuleId, effectiveSlotKey);
      if (previewModule && previewModule.stats) {
        // 現在のスロットに装備されているモジュールがある場合は、その効果を先に除去
        if (equippedModules[selectedModuleSlot]) {
          const currentModule = findModuleInAllCategories(
            equippedModules[selectedModuleSlot], 
            selectedModuleSlot
          );
          
          if (currentModule && currentModule.stats) {
            applyModuleStats(currentModule.stats, modifiedStats, modifiedCombatStats, true);
          }
        }
        
        // プレビューモジュールの効果を適用
        applyModuleStats(previewModule.stats, modifiedStats, modifiedCombatStats);
      }
    }

    return { modifiedStats, modifiedCombatStats };
  }, [baseStats, baseCombatStats]);

  return {
    calculateStats
  };
};

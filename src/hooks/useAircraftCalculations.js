import { useCallback } from 'react';
import { 
  findModuleInAllCategories, 
  getModuleThrust, 
  getModuleWeight, 
  getEffectiveSlotKey 
} from '../utils/moduleHelpers';
import { isDesignValid } from '../utils/statsCalculator';

/**
 * 航空機の推力・重量計算を管理するカスタムフック
 * @param {number} baseWeight - 機体の基本重量
 * @returns {Object} 計算関数と結果
 */
export const useAircraftCalculations = (baseWeight) => {
  
  /**
   * 推力と重量を計算
   * @param {Object} equippedModules - 装備中のモジュール
   * @param {string|null} previewModuleId - プレビュー中のモジュールID
   * @param {string|null} selectedModuleSlot - 選択中のモジュールスロット
   * @param {string|null} selectedWeaponType - 選択中の武器タイプ
   * @returns {Object} { totalThrust, totalWeight, isValidDesign }
   */
  const calculateThrustAndWeight = useCallback((
    equippedModules, 
    previewModuleId = null, 
    selectedModuleSlot = null, 
    selectedWeaponType = null
  ) => {
    let totalThrust = 0;
    let totalWeight = baseWeight; // エアフレームの基本機体重量

    // 現在装備中のモジュールから推力と重量を計算
    Object.entries(equippedModules).forEach(([slotId, moduleId]) => {
      const module = findModuleInAllCategories(moduleId, slotId);
      
      if (module) {
        totalThrust += getModuleThrust(module);
        totalWeight += getModuleWeight(module);
      }
    });

    // プレビュー用のモジュールがある場合は適用
    if (previewModuleId && selectedModuleSlot) {
      const effectiveSlotKey = getEffectiveSlotKey(selectedModuleSlot, selectedWeaponType);
      
      const previewModule = findModuleInAllCategories(previewModuleId, effectiveSlotKey);
      if (previewModule) {
        // 現在のスロットに装備されているモジュールがある場合は、その効果を先に除去
        if (equippedModules[selectedModuleSlot]) {
          const currentModule = findModuleInAllCategories(
            equippedModules[selectedModuleSlot], 
            selectedModuleSlot
          );
          
          if (currentModule) {
            totalThrust -= getModuleThrust(currentModule);
            totalWeight -= getModuleWeight(currentModule);
          }
        }
        
        // プレビューモジュールの効果を追加
        totalThrust += getModuleThrust(previewModule);
        totalWeight += getModuleWeight(previewModule);
      }
    }

    return { 
      totalThrust, 
      totalWeight, 
      isValidDesign: isDesignValid(totalThrust, totalWeight) 
    };
  }, [baseWeight]);

  return {
    calculateThrustAndWeight
  };
};

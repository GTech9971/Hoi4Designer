import { useMemo } from 'react';
import { useAircraftCalculations } from './useAircraftCalculations';
import { useStatsCalculations } from './useStatsCalculations';

/**
 * 航空機のすべての計算ロジックを統合するメインフック
 * @param {Object} airframeConfig - エアフレーム設定
 * @param {Object} equippedModules - 装備中のモジュール
 * @param {string|null} selectedModuleForPreview - プレビュー中のモジュールID
 * @param {string|null} selectedModuleSlot - 選択中のモジュールスロット
 * @param {string|null} selectedWeaponType - 選択中の武器タイプ
 * @returns {Object} 計算結果
 */
export const useAircraftDesignCalculations = (
  airframeConfig, 
  equippedModules, 
  selectedModuleForPreview = null, 
  selectedModuleSlot = null, 
  selectedWeaponType = null
) => {
  const { baseWeight, baseStats, baseCombatStats } = airframeConfig;
  
  // 推力・重量計算フック
  const { calculateThrustAndWeight } = useAircraftCalculations(baseWeight);
  
  // ステータス計算フック
  const { calculateStats } = useStatsCalculations(baseStats, baseCombatStats);
  
  // メモ化された計算結果
  const thrustWeightData = useMemo(() => {
    return calculateThrustAndWeight(
      equippedModules, 
      selectedModuleForPreview, 
      selectedModuleSlot, 
      selectedWeaponType
    );
  }, [
    calculateThrustAndWeight, 
    equippedModules, 
    selectedModuleForPreview, 
    selectedModuleSlot, 
    selectedWeaponType
  ]);
  
  const statsData = useMemo(() => {
    return calculateStats(
      equippedModules, 
      selectedModuleForPreview, 
      selectedModuleSlot, 
      selectedWeaponType
    );
  }, [
    calculateStats, 
    equippedModules, 
    selectedModuleForPreview, 
    selectedModuleSlot, 
    selectedWeaponType
  ]);
  
  return {
    // 推力・重量データ
    totalThrust: thrustWeightData.totalThrust,
    totalWeight: thrustWeightData.totalWeight,
    isValidDesign: thrustWeightData.isValidDesign,
    
    // ステータスデータ
    modifiedStats: statsData.modifiedStats,
    modifiedCombatStats: statsData.modifiedCombatStats,
    
    // 計算関数（必要に応じて外部から呼び出し可能）
    calculateThrustAndWeight,
    calculateStats
  };
};

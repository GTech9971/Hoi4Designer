import { moduleData } from '../data/module';

/**
 * モジュール検索とヘルパー関数
 * モジュールの検索、検証、分類に関する処理を管理
 */

/**
 * すべてのモジュールカテゴリーから指定されたモジュールIDを検索
 * @param {string} moduleId - 検索するモジュールID
 * @param {string} slotType - スロットタイプ（'primary_weapon', 'secondary_weapon' など）
 * @returns {Object|null} 見つかったモジュール、またはnull
 */
export const findModuleInAllCategories = (moduleId, slotType) => {
  // エンジンスロットの場合
  if (slotType === 'engine') {
    return moduleData[slotType]?.find(m => m.id === moduleId) || null;
  }
  
  // 武器スロットの場合
  if (slotType === 'primary_weapon' || slotType === 'secondary_weapon') {
    // 各武器タイプから検索
    const categories = [`${slotType}_cannon`, `${slotType}_torpedo`, `${slotType}_bomb`, `${slotType}_defense`];
    
    for (const category of categories) {
      const module = moduleData[category]?.find(m => m.id === moduleId);
      if (module) return module;
    }
    return null;
  }
  
  // その他のスロット
  return moduleData[slotType]?.find(m => m.id === moduleId) || null;
};

/**
 * 指定されたスロットで武器タイプが許可されているかチェック
 * @param {string} slotId - スロットID
 * @param {string} weaponType - 武器タイプ
 * @param {Array} moduleSlots - モジュールスロット設定配列
 * @returns {boolean} 許可されている場合true
 */
export const isWeaponTypeAllowed = (slotId, weaponType, moduleSlots) => {
  const slot = moduleSlots.find(s => s.id === slotId);
  if (!slot || !slot.allowedTypes) return true;
  return slot.allowedTypes.includes(weaponType);
};

/**
 * 指定されたスロットIDに対応するモジュール一覧を取得
 * @param {string} slotId - スロットID
 * @returns {Array} モジュール配列
 */
export const getModulesBySlot = (slotId) => {
  return moduleData[slotId] || [];
};

/**
 * モジュールIDから武器タイプを推定
 * @param {string} moduleId - モジュールID
 * @param {string} slotType - スロットタイプ
 * @returns {string|null} 武器タイプ（'cannon', 'bomb', 'torpedo', 'defense'）またはnull
 */
export const getWeaponTypeFromModuleId = (moduleId, slotType) => {
  if (slotType !== 'primary_weapon' && slotType !== 'secondary_weapon') {
    return null;
  }

  const weaponTypes = ['cannon', 'torpedo', 'bomb', 'defense'];
  
  for (const weaponType of weaponTypes) {
    const categoryKey = `${slotType}_${weaponType}`;
    if (moduleData[categoryKey]?.find(m => m.id === moduleId)) {
      return weaponType;
    }
  }
  
  return null;
};

/**
 * モジュールから推力値を取得
 * @param {Object} module - モジュールオブジェクト
 * @returns {number} 推力値（推力がない場合は0）
 */
export const getModuleThrust = (module) => {
  return module?.thrust || 0;
};

/**
 * モジュールから重量値を取得（モジュール重量 + ステータス重量）
 * @param {Object} module - モジュールオブジェクト
 * @returns {number} 総重量値
 */
export const getModuleWeight = (module) => {
  let weight = 0;
  
  if (module?.weight) {
    weight += module.weight;
  }
  
  if (module?.stats?.weight) {
    weight += module.stats.weight;
  }
  
  return weight;
};

/**
 * 武器スロット用の効果的なスロットキーを生成
 * @param {string} slotId - スロットID
 * @param {string|null} weaponType - 武器タイプ
 * @returns {string} 効果的なスロットキー
 */
export const getEffectiveSlotKey = (slotId, weaponType) => {
  return weaponType ? `${slotId}_${weaponType}` : slotId;
};

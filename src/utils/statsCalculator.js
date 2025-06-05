/**
 * 統計計算ユーティリティ関数
 * モジュールの効果をステータスに適用する処理を管理
 */

/**
 * モジュールの効果をステータスに適用または除去する
 * @param {Object} stats - 適用するモジュールのステータス
 * @param {Object} modifiedStats - 変更対象の基本ステータス
 * @param {Object} modifiedCombatStats - 変更対象の戦闘ステータス
 * @param {boolean} remove - true: 効果を除去, false: 効果を適用
 */
export const applyModuleStats = (stats, modifiedStats, modifiedCombatStats, remove = false) => {
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

/**
 * 推力と重量の比率を計算
 * @param {number} thrust - 総推力
 * @param {number} weight - 総重量
 * @returns {number} 推力重量比（推力/重量）
 */
export const getThrustWeightRatio = (thrust, weight) => {
  if (weight === 0) return 0;
  return thrust / weight;
};

/**
 * 設計が有効かどうかを判定
 * @param {number} thrust - 総推力
 * @param {number} weight - 総重量
 * @returns {boolean} 推力 >= 重量の場合true
 */
export const isDesignValid = (thrust, weight) => {
  return thrust >= weight;
};

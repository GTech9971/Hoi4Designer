// モジュールデータのインポート
import { engineModules } from './modules/engines';
import { cannonModules } from './modules/cannons';
import { armorModules } from './modules/armor';
import { fuelTankModules } from './modules/fuelTanks';
import { specialModules } from './modules/special';

// 設定データのインポート
export { moduleSlots, baseStats, baseCombatStats } from './config';

// モジュールデータを結合
export const moduleData = {
    engine: engineModules,
    cannon: cannonModules,
    armor: armorModules,
    fuel_tank: fuelTankModules,
    special: specialModules
};

// 個別のモジュールタイプもエクスポート（必要に応じて）
export {
    engineModules,
    cannonModules,
    armorModules,
    fuelTankModules,
    specialModules
};
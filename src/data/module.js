// モジュールデータのインポート
import { engineModules } from './modules/engines';
import { cannonModules } from './modules/cannons';
import { torpedoModules } from './modules/torpedos';
import { bombModules } from './modules/bombs';
import { armorModules } from './modules/armor';
import { fuelTankModules } from './modules/fuelTanks';
import { elecModules } from './modules/elec';
import { specialModules } from './modules/special';

// 設定データのインポート
export { moduleSlots, baseStats, baseCombatStats } from './config';

// モジュールデータを結合
export const moduleData = {
    engine: engineModules,
    primary_weapon_cannon: cannonModules,
    primary_weapon_torpedo: torpedoModules,
    primary_weapon_bomb: bombModules,
    secondary_weapon_cannon: cannonModules,
    secondary_weapon_torpedo: torpedoModules,
    secondary_weapon_bomb: bombModules,
    armor: armorModules,
    fuel_tank: fuelTankModules,
    elec: elecModules,
    special: specialModules
};

// 個別のモジュールタイプもエクスポート（必要に応じて）
export {
    engineModules,
    cannonModules,
    torpedoModules,
    bombModules,
    armorModules,
    fuelTankModules,
    elecModules,
    specialModules
};
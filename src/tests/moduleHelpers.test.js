/**
 * モジュールヘルパー関数のテスト
 */

import { 
  getWeaponTypeFromModuleId, 
  isWeaponTypeAllowed, 
  getModuleThrust, 
  getModuleWeight,
  getEffectiveSlotKey 
} from '../utils/moduleHelpers';

describe('moduleHelpers', () => {
  describe('getWeaponTypeFromModuleId', () => {
    // 実際のテストには moduleData のモックが必要
    // ここでは基本的な構造テストのみ
    test('should return null for non-weapon slots', () => {
      const result = getWeaponTypeFromModuleId('engine_1', 'engine');
      expect(result).toBeNull();
    });
  });

  describe('isWeaponTypeAllowed', () => {
    const mockModuleSlots = [
      { id: 'primary_weapon', allowedTypes: ['cannon', 'bomb'] },
      { id: 'secondary_weapon', allowedTypes: ['cannon'] },
      { id: 'engine' } // allowedTypesなし
    ];

    test('should return true when weapon type is allowed', () => {
      expect(isWeaponTypeAllowed('primary_weapon', 'cannon', mockModuleSlots)).toBe(true);
      expect(isWeaponTypeAllowed('primary_weapon', 'bomb', mockModuleSlots)).toBe(true);
    });

    test('should return false when weapon type is not allowed', () => {
      expect(isWeaponTypeAllowed('secondary_weapon', 'bomb', mockModuleSlots)).toBe(false);
      expect(isWeaponTypeAllowed('primary_weapon', 'torpedo', mockModuleSlots)).toBe(false);
    });

    test('should return true when slot has no allowedTypes restriction', () => {
      expect(isWeaponTypeAllowed('engine', 'any_type', mockModuleSlots)).toBe(true);
    });

    test('should return true when slot is not found', () => {
      expect(isWeaponTypeAllowed('unknown_slot', 'any_type', mockModuleSlots)).toBe(true);
    });
  });

  describe('getModuleThrust', () => {
    test('should return thrust value when module has thrust', () => {
      const module = { thrust: 30 };
      expect(getModuleThrust(module)).toBe(30);
    });

    test('should return 0 when module has no thrust', () => {
      const module = { weight: 5 };
      expect(getModuleThrust(module)).toBe(0);
    });

    test('should return 0 when module is null', () => {
      expect(getModuleThrust(null)).toBe(0);
    });
  });

  describe('getModuleWeight', () => {
    test('should return total weight including module weight and stats weight', () => {
      const module = { 
        weight: 2.0, 
        stats: { weight: 1.5 } 
      };
      expect(getModuleWeight(module)).toBe(3.5);
    });

    test('should return only module weight when no stats weight', () => {
      const module = { weight: 2.0 };
      expect(getModuleWeight(module)).toBe(2.0);
    });

    test('should return only stats weight when no module weight', () => {
      const module = { stats: { weight: 1.5 } };
      expect(getModuleWeight(module)).toBe(1.5);
    });

    test('should return 0 when no weight information', () => {
      const module = { name: 'test' };
      expect(getModuleWeight(module)).toBe(0);
    });
  });

  describe('getEffectiveSlotKey', () => {
    test('should return combined key when weaponType is provided', () => {
      expect(getEffectiveSlotKey('primary_weapon', 'cannon')).toBe('primary_weapon_cannon');
      expect(getEffectiveSlotKey('secondary_weapon', 'bomb')).toBe('secondary_weapon_bomb');
    });

    test('should return original slotId when weaponType is null', () => {
      expect(getEffectiveSlotKey('engine', null)).toBe('engine');
      expect(getEffectiveSlotKey('armor', null)).toBe('armor');
    });
  });
});

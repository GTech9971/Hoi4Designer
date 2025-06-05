/**
 * 統計計算ユーティリティのテスト
 */

import { applyModuleStats, getThrustWeightRatio, isDesignValid } from '../utils/statsCalculator';

describe('statsCalculator', () => {
  describe('applyModuleStats', () => {
    let modifiedStats, modifiedCombatStats;

    beforeEach(() => {
      modifiedStats = {
        maxSpeed: { value: 280.0 },
        weight: { value: 4.0 },
        range: { value: 1.0 },
        agility: { value: 0.24 },
        reliability: { value: 11.0 },
        altitude: { value: 400 },
        fuelUsage: { value: 0.0 }
      };

      modifiedCombatStats = {
        airAttack: { value: 7.0 },
        airDefense: { value: 0.0 },
        surfaceAttack: { value: 36.8 },
        navalAttack: { value: 1.0 },
        nightPenalty: { value: 0.0 }
      };
    });

    test('should apply engine stats correctly', () => {
      const engineStats = {
        maxSpeed: 50,
        fuelUsage: 2.5
      };

      applyModuleStats(engineStats, modifiedStats, modifiedCombatStats);

      expect(modifiedStats.maxSpeed.value).toBe(330.0);
      expect(modifiedStats.fuelUsage.value).toBe(2.5);
    });

    test('should apply weapon stats correctly', () => {
      const weaponStats = {
        airAttack: 15.0,
        surfaceAttack: 20.0,
        weight: 1.5
      };

      applyModuleStats(weaponStats, modifiedStats, modifiedCombatStats);

      expect(modifiedCombatStats.airAttack.value).toBe(22.0);
      expect(modifiedCombatStats.surfaceAttack.value).toBe(56.8);
      expect(modifiedStats.weight.value).toBe(5.5);
    });

    test('should remove stats when remove flag is true', () => {
      const stats = {
        maxSpeed: 50,
        airAttack: 15.0
      };

      // 適用
      applyModuleStats(stats, modifiedStats, modifiedCombatStats);
      expect(modifiedStats.maxSpeed.value).toBe(330.0);
      expect(modifiedCombatStats.airAttack.value).toBe(22.0);

      // 除去
      applyModuleStats(stats, modifiedStats, modifiedCombatStats, true);
      expect(modifiedStats.maxSpeed.value).toBe(280.0);
      expect(modifiedCombatStats.airAttack.value).toBe(7.0);
    });
  });

  describe('getThrustWeightRatio', () => {
    test('should calculate thrust to weight ratio correctly', () => {
      expect(getThrustWeightRatio(30, 15)).toBe(2.0);
      expect(getThrustWeightRatio(40, 20)).toBe(2.0);
      expect(getThrustWeightRatio(50, 25)).toBe(2.0);
    });

    test('should return 0 when weight is 0', () => {
      expect(getThrustWeightRatio(30, 0)).toBe(0);
    });
  });

  describe('isDesignValid', () => {
    test('should return true when thrust >= weight', () => {
      expect(isDesignValid(30, 25)).toBe(true);
      expect(isDesignValid(30, 30)).toBe(true);
    });

    test('should return false when thrust < weight', () => {
      expect(isDesignValid(25, 30)).toBe(false);
    });
  });
});

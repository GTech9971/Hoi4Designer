/**
 * React フック用のテストサンプル
 */

import { renderHook, act } from '@testing-library/react';
import { useAircraftState } from '../hooks/useAircraftState';

describe('useAircraftState', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useAircraftState());

    expect(result.current.selectedAirframe).toBeNull();
    expect(result.current.equippedModules).toEqual({
      engine: 'engine_1',
      primary_weapon: 'cannon_1x1'
    });
    expect(result.current.presetName).toBe('FF「ワイフィ」');
  });

  test('should update equipped module', () => {
    const { result } = renderHook(() => useAircraftState());

    act(() => {
      result.current.updateEquippedModule('engine', 'engine_2');
    });

    expect(result.current.equippedModules.engine).toBe('engine_2');
  });

  test('should remove equipped module', () => {
    const { result } = renderHook(() => useAircraftState());

    // まずモジュールを設定
    act(() => {
      result.current.updateEquippedModule('armor', 'armor_basic');
    });

    expect(result.current.equippedModules.armor).toBe('armor_basic');

    // 削除
    act(() => {
      result.current.removeEquippedModule('armor');
    });

    expect(result.current.equippedModules.armor).toBeUndefined();
  });

  test('should reset selection', () => {
    const { result } = renderHook(() => useAircraftState());

    // 選択状態を設定
    act(() => {
      result.current.setSelectedModuleSlot('engine');
      result.current.setSelectedModuleForPreview('engine_2');
      result.current.setSelectedWeaponType('cannon');
    });

    expect(result.current.selectedModuleSlot).toBe('engine');
    expect(result.current.selectedModuleForPreview).toBe('engine_2');
    expect(result.current.selectedWeaponType).toBe('cannon');

    // リセット
    act(() => {
      result.current.resetSelection();
    });

    expect(result.current.selectedModuleSlot).toBeNull();
    expect(result.current.selectedModuleForPreview).toBeNull();
    expect(result.current.selectedWeaponType).toBeNull();
  });
});

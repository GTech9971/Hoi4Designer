# HOI4 航空機設計アプリケーション - リファクタリングロードマップ

## 🎯 目的
現在のモジュール構造は以下の問題を抱えている：
- `AircraftDesigner.jsx` (24KB) - 巨大な親コンポーネント、複雑な状態管理
- `MainDesignScreen.jsx` (24KB) - 巨大なUI/レンダリングロジック、多数の責務
- テスタビリティの低下、保守性の問題
- 機能単位での開発・デバッグの困難

## 📊 現在のコンポーネント分析

### 現在の構造
```
AircraftDesigner.jsx (24KB) ← 🔴 分割対象
├── 状態管理 (selectedAirframe, equippedModules, etc.)
├── 計算ロジック (calculateStats, calculateThrustAndWeight)
├── イベントハンドラー (handleModuleSlotClick, etc.)
└── 画面切り替えロジック

MainDesignScreen.jsx (24KB) ← 🔴 分割対象
├── レンダリング全体
├── ステータス表示
├── モジュールスロット UI
├── 推力バランス計算表示
└── 統計表示

ModuleSelectionScreen.jsx (13KB) ← 🟡 軽微な分割
WeaponTypeSelectionScreen.jsx (小) ← ✅ 適切なサイズ
```

## 🔥 緊急リファクタリング計画

### 🎆 **スプリント0 (最優先): TypeScript移行** 🔥🔥🔥
**目的**: JavaScriptからTypeScriptへの全面移行で型安全性と開発効率を大幅向上

**現在の問題**:
- 型エラーのランタイム発見
- IDEサポートの不十分（自動補完、リファクタリング）
- インターフェースの明文化不足
- モジュール間の結合度が曖昧
- バグの発見が遅い

#### 0.1 TypeScript環境セットアップ
```bash
# TypeScript関連パッケージのインストール
npm install --save-dev typescript @types/react @types/react-dom
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser

# tsconfig.json作成
npx tsc --init
```

#### 0.2 コア型定義
```typescript
// types/aircraft.ts - エアフレームとモジュールの型
interface Airframe {
  id: string;
  displayName: string;
  size: 'light' | 'medium' | 'heavy';
  generation: 'interwar' | 'basic' | 'improved' | 'advanced';
  moduleSlots: ModuleSlot[];
  baseWeight: number;
  baseStats: BaseStats;
  baseCombatStats: BaseCombatStats;
}

interface Module {
  id: string;
  name: string;
  description: string;
  weight?: number;
  thrust?: number;
  stats?: Partial<BaseStats>;
  combatStats?: Partial<BaseCombatStats>;
}

interface ModuleSlot {
  id: string;
  name: string;
  locked: boolean;
  required?: boolean;
  maxCount?: number;
  allowedTypes?: WeaponType[];
}

type WeaponType = 'cannon' | 'bomb' | 'torpedo' | 'defense';
type SlotType = 'engine' | 'primary_weapon' | 'secondary_weapon' | 'armor' | 'fuel_tank' | 'radio' | 'elec' | 'special';
```

#### 0.3 フックとユーティリティの型化
```typescript
// hooks/useAircraftCalculations.ts
interface ThrustWeightResult {
  totalThrust: number;
  totalWeight: number;
  isValidDesign: boolean;
}

interface CalculationHookReturn {
  calculateThrustAndWeight: (
    equippedModules: EquippedModules,
    previewModuleId?: string | null,
    selectedModuleSlot?: string | null,
    selectedWeaponType?: WeaponType | null
  ) => ThrustWeightResult;
}

// utils/statsCalculator.ts
export const applyModuleStats = (
  stats: Partial<BaseStats & BaseCombatStats>,
  modifiedStats: BaseStats,
  modifiedCombatStats: BaseCombatStats,
  remove: boolean = false
): void => {/*...*/}
```

#### 0.4 コンポーネントの型化
```typescript
// components/AircraftDesigner.tsx
interface AircraftDesignerProps {}

const AircraftDesigner: React.FC<AircraftDesignerProps> = () => {
  // 型安全な状態管理
};

// components/MainDesignScreen.tsx
interface MainDesignScreenProps {
  selectedAirframe: Airframe;
  currentRole: string | null;
  presetName: string;
  setPresetName: (name: string) => void;
  moduleSlots: ModuleSlot[];
  equippedModules: EquippedModules;
  modifiedStats: BaseStats;
  modifiedCombatStats: BaseCombatStats;
  previousStats: PreviousStats | null;
  totalThrust: number;
  totalWeight: number;
  isValidDesign: boolean;
  onModuleSlotClick: (slotId: string) => void;
  onAirframeChange: () => void;
}
```

### 実装スケジュール
- [ ] **Day 1**: TypeScript環境セットアップ、コア型定義
- [ ] **Day 2**: ユーティリティ関数の型化 (utils/)
- [ ] **Day 3**: カスタムフックの型化 (hooks/)
- [ ] **Day 4**: メインコンポーネントの型化
- [ ] **Day 5**: データファイルの型化、テストの型化
- [ ] **テスト作成**: TypeScript対応のテスト更新

**期待効果**:
- ✅ コンパイル時の型チェックでバグの早期発見
- ✅ IDEの強力な自動補完、リファクタリングサポート
- ✅ インターフェースの自動文書化
- ✅ モジュール間の結合度の明確化
- ✅ 新人開発者のオンボーディング高速化

---

## 🎯 リファクタリング戦略

### フェーズ1: 計算・状態管理の分離 (最高優先度)
**対象**: `AircraftDesigner.jsx`の巨大な計算ロジック

#### 1.1 カスタムフック分離
```javascript
// hooks/useAircraftCalculations.js
export const useAircraftCalculations = (equippedModules, selectedAirframe, baseWeight) => {
  const calculateThrustAndWeight = useCallback(/*...*/);
  const calculateStats = useCallback(/*...*/);
  return { calculateThrustAndWeight, calculateStats, /*...*/ };
}

// hooks/useAircraftState.js  
export const useAircraftState = () => {
  const [selectedAirframe, setSelectedAirframe] = useState(null);
  const [equippedModules, setEquippedModules] = useState({/*...*/});
  // 関連する状態をグループ化
}
```

#### 1.2 ユーティリティ関数分離
```javascript
// utils/statsCalculator.js
export const applyModuleStats = (stats, modifiedStats, modifiedCombatStats, remove = false) => {/*...*/}
export const getThrustWeightRatio = (thrust, weight) => {/*...*/}

// utils/moduleHelpers.js  
export const findModuleInAllCategories = (moduleId, slotType) => {/*...*/}
export const isWeaponTypeAllowed = (slotId, weaponType, moduleSlots) => {/*...*/}
```

### フェーズ2: UI コンポーネントの細分化 (高優先度)
**対象**: `MainDesignScreen.jsx`の巨大なレンダリング部分

#### 2.1 ヘッダー部分の分離
```javascript
// components/ui/AircraftHeader.jsx
const AircraftHeader = ({ 
  selectedAirframe, 
  currentRole, 
  presetName, 
  setPresetName, 
  onAirframeChange 
}) => {/*...*/}
```

#### 2.2 統計表示の分離
```javascript
// components/stats/BasicStatsPanel.jsx
const BasicStatsPanel = ({ modifiedStats, previousStats }) => {/*...*/}

// components/stats/ThrustBalancePanel.jsx
const ThrustBalancePanel = ({ 
  totalThrust, 
  totalWeight, 
  isValidDesign 
}) => {/*...*/}

// components/stats/CombatStatsPanel.jsx
const CombatStatsPanel = ({ modifiedCombatStats, previousStats }) => {/*...*/}
```

#### 2.3 モジュールスロット部分の分離
```javascript
// components/modules/ModuleSlotsList.jsx
const ModuleSlotsList = ({ 
  moduleSlots, 
  equippedModules, 
  onModuleSlotClick 
}) => {/*...*/}

// components/modules/ModuleSlotItem.jsx
const ModuleSlotItem = ({ 
  slot, 
  equippedModule, 
  onClick, 
  isClickable 
}) => {/*...*/}
```

#### 2.4 機体図面の分離
```javascript
// components/ui/AircraftBlueprint.jsx
const AircraftBlueprint = ({ equippedModules }) => {/*...*/}
```

### フェーズ3: ビジネスロジックの分離 (中優先度)
**対象**: ドメイン固有のロジック

#### 3.1 エアフレーム管理
```javascript
// services/AirframeService.js
export class AirframeService {
  static getModuleSlots(airframe) {/*...*/}
  static getBaseStats(airframe) {/*...*/}
  static getCurrentRole(airframe, weaponType) {/*...*/}
}
```

#### 3.2 モジュール管理
```javascript
// services/ModuleService.js
export class ModuleService {
  static findModule(moduleId, slotType) {/*...*/}
  static validateModuleEquipping(module, slot, airframe) {/*...*/}
  static getModulesBySlot(slotId) {/*...*/}
}
```

### フェーズ4: 共通UI部品の分離 (低優先度)
**対象**: 再利用可能なUI要素

#### 4.1 共通コンポーネント
```javascript
// components/ui/StatDisplay.jsx
const StatDisplay = ({ label, value, unit, previousValue, showChange }) => {/*...*/}

// components/ui/ProgressBar.jsx  
const ProgressBar = ({ value, max, color, showThreshold }) => {/*...*/}

// components/ui/StatusIndicator.jsx
const StatusIndicator = ({ isValid, message }) => {/*...*/}
```

## 📋 実装ロードマップ

### ✅ スプリント1 (完了): 計算ロジック分離
- [x] `hooks/useAircraftCalculations.js`作成
- [x] `utils/statsCalculator.js`作成
- [x] `utils/moduleHelpers.js`作成
- [x] `hooks/useStatsCalculations.js`作成
- [x] `hooks/useAircraftState.js`作成
- [x] `hooks/useAircraftDesignCalculations.js`作成（統合フック）
- [x] `AircraftDesigner.jsx`からロジック移行
- [x] **テスト作成**: 計算ロジックの単体テスト

**実装詳細**:
- 推力・重量計算ロジックを`useAircraftCalculations`フックに分離
- ステータス計算ロジックを`useStatsCalculations`フックに分離
- 状態管理を`useAircraftState`フックに分離
- モジュール検索・検証ヘルパー関数を`utils/moduleHelpers.js`に分離
- 統計適用ロジックを`utils/statsCalculator.js`に分離
- `AircraftDesigner.jsx`のサイズを大幅削減（約250行削除）
- 基本的な単体テスト作成

### 🚀 スプリント2 (2-3日): 統計表示コンポーネント分離  
- [ ] `components/stats/BasicStatsPanel.jsx`作成
- [ ] `components/stats/ThrustBalancePanel.jsx`作成
- [ ] `components/stats/CombatStatsPanel.jsx`作成
- [ ] `MainDesignScreen.jsx`から移行
- [ ] **テスト作成**: 各統計パネルの表示テスト

### 🚀 スプリント3 (2-3日): モジュールUI分離
- [ ] `components/modules/ModuleSlotsList.jsx`作成
- [ ] `components/modules/ModuleSlotItem.jsx`作成
- [ ] `components/ui/AircraftHeader.jsx`作成
- [ ] `components/ui/AircraftBlueprint.jsx`作成
- [ ] **テスト作成**: ユーザーインタラクションテスト

### 🚀 スプリント4 (1-2日): 状態管理統合
- [ ] `hooks/useAircraftState.js`作成
- [ ] Context API導入検討（必要に応じて）
- [ ] 状態の一元化・整理
- [ ] **テスト作成**: 状態変更のフローテスト

### 🚀 スプリント5 (1-2日): サービス層構築
- [ ] `services/AirframeService.js`作成
- [ ] `services/ModuleService.js`作成
- [ ] ビジネスロジックの移行
- [ ] **テスト作成**: サービス層の単体テスト

### 🚀 スプリント6 (1日): 共通UI・最終統合
- [ ] 共通UIコンポーネント作成
- [ ] 全体の整合性確認
- [ ] パフォーマンス最適化
- [ ] **統合テスト**: 全体フローのE2Eテスト

## 🧪 テスト戦略

### 単体テスト対象
```javascript
// 計算ロジック
describe('statsCalculator', () => {
  test('should calculate thrust correctly', () => {/*...*/});
  test('should apply module stats correctly', () => {/*...*/});
});

// サービス層
describe('ModuleService', () => {
  test('should find correct module', () => {/*...*/});
  test('should validate module compatibility', () => {/*...*/});
});
```

### 統合テスト対象
```javascript
// ユーザーフロー
describe('Aircraft Design Flow', () => {
  test('should complete full design process', () => {/*...*/});
  test('should handle module equipping correctly', () => {/*...*/});
});
```

## 📐 設計原則

### 1. 単一責任原則 (SRP)
- 各コンポーネントは1つの明確な責務のみ
- 計算ロジック ≠ 表示ロジック ≠ 状態管理

### 2. 依存性の逆転 (DIP)
- UIコンポーネントはサービス層に依存
- サービス層はデータ層のみに依存

### 3. テスタビリティ
- 純粋関数での計算ロジック
- モックしやすいサービス層
- 独立性の高いコンポーネント

## 🎯 期待される効果

### 開発効率の向上
- **機能別開発**: 統計表示だけ、モジュール選択だけに集中可能
- **並行開発**: 複数人での同時開発が可能
- **デバッグ容易性**: 問題箇所の特定が高速化

### 品質向上
- **テストカバレッジ**: 各小さな部品の完全テスト
- **バグ局所化**: 問題の影響範囲を限定
- **リグレッション防止**: 変更による意図しない影響を回避

### 保守性向上
- **コード理解**: 新しい開発者のオンボーディング高速化  
- **機能追加**: 新機能の追加ポイントが明確
- **リファクタリング**: 部分的な改善が安全に実行可能

## 📝 補足事項

### 移行時の注意点
- **段階的移行**: 一度に全て変更せず、機能別に段階実行
- **後方互換性**: 既存機能を破壊しない
- **テストファースト**: 移行前に既存機能のテストを作成

### パフォーマンス考慮点
- **React.memo**: 不要な再レンダリングを防止
- **useMemo/useCallback**: 重い計算の最適化
- **コンポーネント分割**: 仮想DOM差分の効率化

---

**最終目標**: 保守しやすく、テストしやすく、拡張しやすいモジュラー設計の実現

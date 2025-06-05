// モジュールデータのモック
export const moduleData = {
  engine: [
    { id: 'engine_1', thrust: 30, weight: 4, stats: {} },
    { id: 'engine_2', thrust: 50, weight: 6, stats: { maxSpeed: 50 } }
  ],
  primary_weapon_cannon: [
    { id: 'cannon_1x1', weight: 1, stats: { airAttack: 10 } },
    { id: 'cannon_2x1', weight: 2, stats: { airAttack: 20 } }
  ],
  primary_weapon_bomb: [
    { id: 'bomb_small', weight: 5, stats: { surfaceAttack: 30 } }
  ],
  primary_weapon_torpedo: [
    { id: 'torpedo_light', weight: 3, stats: { navalAttack: 25 } }
  ],
  armor: [
    { id: 'armor_basic', weight: 1.5, stats: { weight: 1.5 } }
  ]
};

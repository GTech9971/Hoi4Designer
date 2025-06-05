export const engineModules = [
    {
        id: 'engine_1',
        name: 'エンジンI×1',
        icon: '⚙️',
        stars: 1,
        description: '標準的なエンジンです。基本的な性能を提供しますが、すべてで劣りがちです。',
        stats: {
            maxSpeed: 20.0,
            reliability: 1.0,
            fuelUsage: 0.1,
            cost: 2.00
        },
        thrust: 30,
        weight: 5
    },
    {
        id: 'engine_2',
        name: 'エンジンII×1',
        icon: '⚙️',
        stars: 2,
        description: 'より強力なエンジンです。速度と機動性が向上しますが、燃料消費量が増加します。',
        stats: {
            maxSpeed: 80.0,
            reliability: 1.0,
            agility: 2.0,
            fuelUsage: 0.1,
            cost: 12.00
        },
        thrust: 50,
        weight: 8
    },
    {
        id: 'engine_3',
        name: 'エンジンIII×1',
        icon: '⚙️',
        stars: 3,
        description: 'メタノール供給により手動エンジン外の要素を無視することで、このエンジンは他のエンジン以上の対応率を実現します。',
        stats: {
            maxSpeed: 120.0,
            agility: 5.0,
            fuelUsage: 0.1,
            cost: 16.00
        },
        thrust: 75,
        weight: 12
    },
    {
        id: 'engine_4',
        name: 'エンジンIV×1',
        icon: '⚙️',
        stars: 4,
        description: 'より内らつ軽量を重ねた武力で、工場技師を常に的確にして、それが強化者にとって最高出力によってエンジンをバランスし直したもので実現する。',
        stats: {
            maxSpeed: 180.0,
            agility: 10.0,
            fuelUsage: 0.1,
            cost: 18.00
        },
        thrust: 100,
        weight: 15
    }
];
import { LocationCardDefinition } from './LocationCard';

export const LOCATION_CARDS: LocationCardDefinition[] = [
  {
    id: '1',
    name: 'Power Plant',
    barriers: {
      enemyCount: 1,
      lockCount: 2,
      hazardCount: 3,
    },
    resources: {
      circuitCount: 1,
      dataCount: 2,
      batteryCount: 3,
    },
    quantity: 1,
  },
];

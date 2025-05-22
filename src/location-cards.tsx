import { LocationCardDefinition } from './LocationCard';

export const LOCATION_CARDS: LocationCardDefinition[] = [
  {
    id: '1',
    name: 'Power Plant',
    barriers: {
      enemyCount: 0,
      lockCount: 0,
      hazardCount: 0,
    },
    resources: {
      circuitCount: 1,
      dataCount: 0,
      batteryCount: 0,
    },
    quantity: 1,
  },
];

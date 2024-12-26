import { LocationCardDefinition } from './LocationCard';

export const LOCATION_CARDS: LocationCardDefinition[] = [
  {
    name: 'Underground Bunker',
    imageId: '001',
    barriers: ['DOOR', 'DOOR', 'DOOR', 'HAZARD', 'ENEMY', 'ENEMY'],
    energyCount: 2,
    upgradeCount: 1,
    resourceCount: 1,
  },
];

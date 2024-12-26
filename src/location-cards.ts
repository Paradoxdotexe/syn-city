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
  {
    name: 'Power Plant',
    imageId: '002',
    barriers: ['HAZARD', 'HAZARD', 'DOOR', 'DOOR', 'HAZARD'],
    energyCount: 5,
    upgradeCount: 0,
    resourceCount: 0,
  },
];

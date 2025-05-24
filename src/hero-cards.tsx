import { HeroCardDefinition } from './HeroCard';

export const HERO_CARDS: HeroCardDefinition[] = [
  {
    id: '1',
    name: 'Freighter Frank',
    description: {
      front: 'Conquer a location in the **Outer Limits**.',
      back: 'Conquer two locations in the **Outer Limits**.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 2,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Rhett Rover',
    description: {
      front: 'Scout a location in **Lowline Commons**.',
      back: 'Scout a location in **Silicon Heights**.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 3,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Recon Riley',
    description: {
      front: 'Scout a location in **Silicon Heights** or closer.',
      back: 'Scout a location in the **Blacklight District** or closer.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 4,
    quantity: 1,
  },
  {
    id: '4',
    name: 'Remington Ranger',
    description: {
      front: 'Scout a location in the **Blacklight District** or closer.',
      back: 'Peek at the next four locations in the **Blacklight District** or closer. Scout one and replace the locations in any order.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 5,
    quantity: 1,
  },
  {
    id: '5',
    name: 'Valor Victoria',
    description: {
      front: 'Kill 3 ENEMY at a location.',
      back: 'Kill all ENEMY at a location.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 6,
    quantity: 1,
  },
  {
    id: '6',
    name: 'Coding Clyde',
    description: {
      front: 'Hack 3 LOCK at a location.',
      back: 'Hack all LOCK at a location.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 4,
    quantity: 1,
  },
  {
    id: '7',
    name: 'Hazmat Hank',
    description: {
      front: 'Clear 3 HAZARD at a location.',
      back: 'Clear all HAZARD at a location.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 5,
    quantity: 1,
  },
  {
    id: '8',
    name: 'Boomer Bot',
    description: {
      front: 'Kill all ENEMY at a location. Burnout.',
      back: 'Kill all ENEMY at a location.',
    },
    resources: {
      circuitCount: 1,
      dataCount: 1,
      batteryCount: 1,
      gearCount: 1,
    },
    activationNumber: 6,
    quantity: 1,
  },
];

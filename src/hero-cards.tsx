import { HeroCardDefinition } from './HeroCard';

export const HERO_CARDS: HeroCardDefinition[] = [
  {
    id: '1',
    name: 'Freighter Frank',
    description: {
      front: (
        <>
          Conquer a location in the <br />
          <strong>Outer Limits</strong>.
        </>
      ),
      back: (
        <>
          Conquer two locations in the <br />
          <strong>Outer Limits</strong>.
        </>
      ),
    },
    activationNumber: 3,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Rhett Rover',
    description: {
      front: (
        <>
          Scout a location in <br />
          <strong>Lowline Commons</strong>.
        </>
      ),
      back: (
        <>
          Scout a location in <br />
          <strong>Silicon Heights</strong>.
        </>
      ),
    },
    activationNumber: 4,
    quantity: 1,
  },
];

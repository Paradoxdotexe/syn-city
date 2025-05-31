const fs = require('fs');

const input = `Name	Description	Repair Cost	Energy Cost	Quantity
Boom Bot	Kill 3 ENEMY. Burnout.	4	1	1
Sentry Drone	Kill 1 ENEMY.	2	1	4
Valor Victoria	Kill 2 ENEMY.	5	2	4
The Centurion	Kill 3 ENEMY.	8	3	1
Breacher Bot	Hack 3 LOCK. Burnout.	4	1	1
Network Drone	Hack 1 LOCK.	2	1	4
Coding Clyde	Hack 2 LOCK.	5	2	4
The Infiltrator	Hack 3 LOCK.	8	3	1
Extinguisher Bot	Clear 3 HAZARD. Burnout.	4	1	1
Containment Drone	Clear 1 HAZARD.	2	1	4
Hazmat Hank	Clear 2 HAZARD.	5	2	4
The Dozer	Clear 3 HAZARD.	8	3	1
Recon Riley	Move two spaces.	3	1	2
Robbie Recharge	Gain 1 ENERGY.	3		2
Junker	Scavenge a robot for scrap.		1	2`;

function parseHeroes(input) {
  const lines = input.trim().split('\n');
  const headers = lines[0].split('\t');
  let heroes = [];
  let idx = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const [name, description, scrapCost, energyCost, quantity] = cols;

    heroes.push({
      id: (++idx).toString(),
      name,
      description,
      scrapCost: scrapCost ? parseInt(scrapCost, 10) : 0,
      energyCost: energyCost ? parseInt(energyCost, 10) : 0,
      quantity: quantity ? parseInt(quantity, 10) : 0,
    });
  }

  return heroes;
}

const heroes = parseHeroes(input);
const outputPath = __dirname + '/../src/hero-cards.tsx';
const output = `import { HeroCardDefinition } from './HeroCard';

export const HERO_CARDS: HeroCardDefinition[] = ${JSON.stringify(heroes, null, 2)};\n`;
fs.writeFileSync(outputPath, output, 'utf8');

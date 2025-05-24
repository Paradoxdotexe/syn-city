const fs = require('fs');

const input = `Name	Front	Back	Circuits	Data	Batteries	Gears	Quantity	Activation Number
Boomer Bot	Kill all ENEMY at a location. Burnout.	Kill all ENEMY at two locations. Burnout.		1		1	1	2
Defense Drone	Kill 1 ENEMY.	Kill 2 ENEMY.		2		2	1	3
Sentry Unit	Kill 2 ENEMY.	Kill 3 ENEMY.		3		3	1	4
Valor Victoria	Kill 3 ENEMY.	Kill 5 ENEMY.	1	4		4	1	5
Centurion	Kill 4 ENEMY.	Kill 6 ENEMY.	2	5		5	1	6
Basher Bot	Hack all LOCK at a location. Burnout.	Hack all LOCK at two locations. Burnout.	1	1			1	2
Breach Drone	Hack 1 LOCK.	Hack 2 LOCK.	2	2			1	3
Keyjack Unit	Hack 2 LOCK.	Hack 3 LOCK.	3	3			1	4
Coding Clyde	Hack 3 LOCK.	Hack 5 LOCK.	4	4	1		1	5
Infiltrator	Hack 4 LOCK.	Hack 6 LOCK.	5	5	2		1	6
Extinguisher Bot	Clear all HAZARD at a location. Burnout.	Clear all HAZARD at two locations. Burnout.			1	1	1	2
Containment Drone	Clear 1 HAZARD.	Clear 2 HAZARD.			2	2	1	3
Sanitation Unit	Clear 2 HAZARD.	Clear 3 HAZARD.			3	3	1	4
Hazmat Hank	Clear 3 HAZARD.	Clear 5 HAZARD.		1	4	4	1	5
Dozer	Clear 4 HAZARD.	Clear 6 HAZARD.		2	5	5	1	6
Spotter Bot	Scout a location. Burnout.	Scout two locations. Burnout.		1	1		1	2
Survey Drone	Scout a location in the **Outer Limits**.	Scout a location in **Lowline Commons** or closer.		2	2		1	3
Scanner Unit	Scout a location in **Lowline Commons** or closer.	Scout a location in **Silicon Heights** or closer.		3	3		1	4
Recon Riley	Scout a location in **Silicon Heights** or closer.	Scout a location in the **Blacklight District** or closer.		4	4	1	1	5
Ranger	Scout a location.	Scout two locations.		5	5	2	1	6
Scavenger Drone	Find 1 additional resource at a location.	Find 2 additional resources at a location.	1			1	1	3
Extraction Unit	Find 2 additional resources at a location.	Find 3 additional resources at a location.	1	1	1	1	1	4
Salvage Sam	Find 3 additional resources at a location.	Find 5 additional resources at a location.	2	2	2	2	1	5
Harvester	Find 4 additional resources at a location.	Find 6 additional resources at a location.	3	3	3	3	1	6
Overload Bot	Burnout another player's uncharged syn. Burnout.	Burnout another player's charged syn. Burnout.		1	4		1	2
Reactor Unit	Charge an uncharged syn.	Charge a syn.			5		1	4
Robbie Recharge	Charge a syn.	Supercharge a syn.			6		1	5
Energizer	Supercharge a syn.	Charge two syns.			7		1	6
Junker	Conquer a location in the **Outer Limits**.	Conquer two locations in the **Outer Limits**.					4	1`;

function parseHeroes(input) {
  const lines = input.trim().split('\n');
  const headers = lines[0].split('\t');
  let heroes = [];
  let idx = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const [name, front, back, circuits, data, batteries, gears, quantity, activationNumber] = cols;
    const qty = Number(quantity) || 1;

    for (let q = 0; q < qty; q++) {
      heroes.push({
        id: (++idx).toString(),
        name: name,
        description: {
          front: front,
          back: back,
        },
        resources: {
          circuitCount: Number(circuits) || 0,
          dataCount: Number(data) || 0,
          batteryCount: Number(batteries) || 0,
          gearCount: Number(gears) || 0,
        },
        activationNumber: Number(activationNumber) || 0,
      });
    }
  }
  return heroes;
}

const heroes = parseHeroes(input);
const outputPath = __dirname + '/../src/hero-cards.tsx';
const output = `import { HeroCardDefinition } from './HeroCard';

export const HERO_CARDS: HeroCardDefinition[] = ${JSON.stringify(heroes, null, 2)};\n`;
fs.writeFileSync(outputPath, output, 'utf8');

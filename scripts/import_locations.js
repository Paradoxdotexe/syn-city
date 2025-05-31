const fs = require('fs');

const input = `Area	Name	Enemies	Locks	Hazards	Scrap	Quantum Cores	Quantity
Blacklight District	Apartment Complex	1			2		4
Blacklight District	Parking Garage	1			3		4
Blacklight District	Office Building	2			5		2
Blacklight District	Storage Center	2			6		2
Blacklight District	Marketplace	3			8		2
Blacklight District	Skyscraper	3			9		2
Lost Labs	Makerspace		1		2		4
Lost Labs	Robot Workshop		1		3		4
Lost Labs	Science Lab		2		5		2
Lost Labs	Research Facility		2		6		2
Lost Labs	R&D Complex		3		8		2
Lost Labs	Underground Bunker		3		9		2
Quarantine Zone	Collapsed Building			1	2		4
Quarantine Zone	Crash Site			1	3		4
Quarantine Zone	Electrical Overload			2	5		2
Quarantine Zone	Radioactive Area			2	6		2
Quarantine Zone	Reactor Meltdown			3	8		2
Quarantine Zone	Quantum Anomaly			3	9		2
City Center	Command Vault	2	2	2		8	2
City Center	Command Spire	3	3	3		12	1
City Center	Orbital Relay	2	2			4	2
City Center	Orbital Control Room	3	3			8	1
City Center	Energy Warehouse		2	2		4	2
City Center	Energy Nexus		3	3		8	1
City Center	Executive Office	2		2		4	2
City Center	Executive Suite	3		3		8	1`;

function parseLocations(input) {
  const lines = input.trim().split('\n');
  const headers = lines[0].split('\t');
  let locations = [];
  let idx = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const [area, name, enemies, locks, hazards, scrap, quantumCores, quantity] = cols;

    locations.push({
      id: (++idx).toString(),
      area,
      name,
      barriers: {
        enemyCount: Number(enemies) || 0,
        lockCount: Number(locks) || 0,
        hazardCount: Number(hazards) || 0,
      },
      scrapCount: Number(scrap) || 0,
      quantumCoreCount: Number(quantumCores) || 0,
      quantity: Number(quantity) || 0,
    });
  }
  return locations;
}

const locations = parseLocations(input);
const outputPath = __dirname + '/../src/location-cards.tsx';
const output = `import { LocationCardDefinition } from './LocationCard';

export const LOCATION_CARDS: LocationCardDefinition[] = ${JSON.stringify(locations, null, 2)};\n`;
fs.writeFileSync(outputPath, output, 'utf8');

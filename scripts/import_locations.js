const fs = require('fs');

const input = `Name	Circuits	Data	Batteries	Gears	Enemies	Locks	Hazards	Quantum Cores
Utility Shed	1							
Remote Terminal	1							
Vending Machine		1						
Ad Billboard		1						
Wrecked Car			1					
Personal Generator			1					
Wrecked Truck				1				
Scrap Pile				1				
Computer Lab	2							
Library		2						
Commerical Generator			2					
Bus Depot				2				
Repair Bay	1	1						
Scrapyard		1	1					
Service Garage			1	1				
Data Bank	1			1				
Community Center	2	1			1			
Water Treatment Plant		2	1		1			
Industrial Generator			2	1		1		
Transit Control Hub	1			2			1	
Marketplace	1	1	1		1			
Union Bank		1	1	1	1			
Battery Exchange	1		1	1		1		
Subway Platform	1	1		1			1	
Construction Site	2	2			1		1	
Cooling Site		2	2			1	1	
Parking Garage			2	2	1	1		
Records Office	2			2	1	1		
Fire Station	3	1					2	
Courthouse		3	1			2		
Mall Mezzanine			3	1	2			
Maintenance Tunnel	1			3	2			
Signal Relay Tower	2	3			2	1		
Data Center		2	3		2	1		
Office Highrise			2	3		2	1	
Drone Center	3			2	1		2	
Fiber Hub	1	2	2		2	1		
Tool Depot		1	2	2	2	1		
Auto Clinic	2		1	2		2	1	
University	2	2		1	1		2	
Broadcast Spire	3	3			1		3	
Traffic Grid		3	3			3	1	
Assembly Line			3	3	3	1		
Loading Bay	3			3	3	1		
Drone Repair Shop	2	2	2		2		2	
Orbital Dock		2	2	2		2	2	
Recycling Center	2		2	2	2	2		
Private Vault	2	2		2	2	2		
Quantum Relay					3	2		3
Command Spire					3	2		3
Energy Nexus						3	2	3
Arbitration Court					2		3	3
Orbital Control Room					4	1		3
Executive Housing					4	1		3
Broadcast Relay						4	1	3
Overwatch Hub					1		4	3
Deep Archive					2	2	2	5
Cryo Facility					2	2	2	5
Energy Vault					2	2	2	5
Defense Grid					2	2	2	5
Executive Bunker					3	3		5
Fusion Lab					3	3		5
Grid Node Tower						3	3	5
Quantum Reactor					3		3	5`;

function parseLocations(input) {
  const lines = input.trim().split('\n');
  const headers = lines[0].split('\t');
  let locations = [];
  let idx = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const [name, circuits, data, batteries, gears, enemies, locks, hazards, quantumCores] = cols;

    locations.push({
      id: (++idx).toString(),
      name: name,
      barriers: {
        enemyCount: Number(enemies) || 0,
        lockCount: Number(locks) || 0,
        hazardCount: Number(hazards) || 0,
      },
      resources: {
        circuitCount: Number(circuits) || 0,
        dataCount: Number(data) || 0,
        batteryCount: Number(batteries) || 0,
        gearCount: Number(gears) || 0,
      },
      quantumCoreCount: Number(quantumCores) || 0,
      quantity: 1,
    });
  }
  return locations;
}

const locations = parseLocations(input);
const outputPath = __dirname + '/../src/location-cards.tsx';
const output = `import { LocationCardDefinition } from './LocationCard';

export const LOCATION_CARDS: LocationCardDefinition[] = ${JSON.stringify(locations, null, 2)};\n`;
fs.writeFileSync(outputPath, output, 'utf8');

import { SynCityCard } from "./Card";

export const SYN_CITY_CARDS: SynCityCard[] = [
  {
    actionType: "reaction",
    actionCost: 1,
    attributeKey: "power",
    attributeCost: 2,
    name: "Auxiliary Power",
    description:
      "When you are reduced to 0 **HEALTH**, heal **50%** of your max **HEALTH** instead of shutting down.",
  },
  {
    actionType: "reaction",
    actionCost: 1,
    attributeKey: "precision",
    attributeCost: 4,
    name: "Auxiliary Power",
    description:
      "When you are reduced to 0 **HEALTH**, heal **50%** of your max **HEALTH** instead of shutting down.",
  },
  {
    actionType: "reaction",
    actionCost: 2,
    attributeKey: "protocol",
    attributeCost: 6,
    name: "Honeypot",
    description: "When you are targeted by a hack, negate all damage.",
  },
  {
    actionType: "reaction",
    actionCost: 2,
    attributeKey: "persona",
    attributeCost: 8,
    name: "Uncanny Dodge",
    description: "When you are targeted by a ranged attack, negate all damage.",
  },
  {
    actionType: "reaction",
    actionCost: 3,
    attributeKey: "plating",
    attributeCost: 10,
    name: "Uncanny Dodge",
    description: "When you are targeted by a ranged attack, negate all damage.",
  },
  {
    actionType: "reaction",
    actionCost: 3,
    attributeKey: "perception",
    attributeCost: 12,
    name: "Uncanny Dodge",
    description: "When you are targeted by a ranged attack, negate all damage.",
  },

];

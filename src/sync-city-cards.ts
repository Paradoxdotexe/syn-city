import { SynCityCard } from "@/PlayingCard";

export const SYN_CITY_CARDS: SynCityCard[] = [
  {
    actionType: "reaction",
    actionCost: 3,
    attributeKey: "preservation",
    attributeCost: 9,
    name: "Auxiliary Power",
    description:
      "When you are reduced to 0 **HEALTH**, heal **50%** of your max **HEALTH** instead of shutting down.",
  },
];

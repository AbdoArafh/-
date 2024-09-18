import { Rawi } from "./types";

export function generateCombinations(list: Rawi[]) {
  const combinations: string[][] = [];

  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[i].alone) {
        combinations.push([list[i].name]);
      } else if (list[j].alone) {
        continue;
      } else {
        combinations.push([list[i].name, list[j].name]);
      }
    }
  }

  // clear duplicates
  const uniqueCombinations = [
    ...new Set(combinations.map(JSON.stringify as any)),
  ].map(JSON.parse as any) as string[][];

  return uniqueCombinations;
}

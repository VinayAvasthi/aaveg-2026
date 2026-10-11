export const HOUSE_POINTS = {
  'house-1': 1420,
  'house-2': 1350,
  'house-3': 1290,
  'house-4': 1180,
  'house-5': 1140,
  'house-6': 1060,
  'house-7': 980,
  'house-8': 920,
};

export function getSortedLeaderboard(housesList = []) {
  return housesList
    .map((house) => ({
      ...house,
      points: HOUSE_POINTS[house.id] ?? house.points ?? 0,
    }))
    .sort((a, b) => b.points - a.points);
}

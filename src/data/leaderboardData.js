export const HOUSE_POINTS = {
  'house-1': 0,
  'house-2': 0,
  'house-3': 0,
  'house-4': 0,
  'house-5': 0,
  'house-6': 0,
  'house-7': 0,
  'house-8': 0,
};

export function getSortedLeaderboard(housesList = []) {
  return housesList
    .map((house) => ({
      ...house,
      points: HOUSE_POINTS[house.id] ?? house.points ?? 0,
    }))
    .sort((a, b) => b.points - a.points);
}

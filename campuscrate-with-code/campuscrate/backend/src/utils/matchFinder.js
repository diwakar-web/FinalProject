// naive matcher: checks category, location similarity and overlapping tags
export const scoreMatch = (lost, found) => {
  let score = 0;
  if (lost.category === found.category) score += 3;
  if (lost.location.toLowerCase() === found.location.toLowerCase()) score += 2;
  const lostTags = new Set((lost.tags||[]).map(t=>t.toLowerCase()));
  const foundTags = new Set((found.tags||[]).map(t=>t.toLowerCase()));
  for (const t of lostTags) if (foundTags.has(t)) score += 1;
  return score;
};

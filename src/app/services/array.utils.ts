/**
 * Fisher-Yates (Knuth) shuffle algorithm
 * Randomly shuffles an array in O(n) time with uniform distribution
 * @param array - The array to shuffle
 * @returns A new shuffled copy of the array (non-mutating)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

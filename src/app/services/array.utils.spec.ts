import { describe, expect, it } from 'vitest';
import { shuffleArray } from './array.utils';

describe('shuffleArray', () => {
  it('should return a new array without mutating the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    const result = shuffleArray(original);

    expect(result).not.toBe(original);
    expect(original).toEqual(copy);
  });

  it('should preserve the length and elements of the input array', () => {
    const original = ['a', 'b', 'c', 'd', 'e', 'f'];
    const result = shuffleArray(original);

    expect(result.length).toBe(original.length);
    expect([...result].sort()).toEqual([...original].sort());
  });

  it('should handle empty and single-element arrays', () => {
    expect(shuffleArray([])).toEqual([]);
    expect(shuffleArray([42])).toEqual([42]);
  });
});

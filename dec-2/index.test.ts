import {describe, expect, test} from "bun:test"

import { parseInput, isGameValid } from './index.ts';

describe('parseInput', () => {
  test('should parse input correctly', () => {
    const input = 'Game 1: 1 green, 2 blue, 3 red;\nGame 2: 4 green, 5 blue, 6 red';
    const result = parseInput(input);

    expect(result).toEqual([
        { rounds: [{ green: 1, blue: 2, red: 3 }] },
        { rounds: [{ green: 4, blue: 5, red: 6 }] },
      ],
    );
  });
});

describe('isGameValid', () => {
  test('should return true for a valid game', () => {
    const validGame = {  rounds: [{ green: 1, blue: 2, red: 3 }], gameID: 2 };
    const result = isGameValid(validGame);

    expect(result).toBe(true);
  });

  test('should return false for an invalid game', () => {
    const invalidGame = { rounds: [{ green: 15, blue: 2, red: 3 }], gameID: 2 };
    const result = isGameValid(invalidGame);

    expect(result).toBe(false);
  });
});

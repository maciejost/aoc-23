import { input as puzzleInput, testInput } from './input';
type Round = {
  green: number;
  blue: number;
  red: number;
};

type Game = {
  rounds: Round[];
	gameID: number;
};

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;


const parseRound = (round: string): Round => {
  const colors = round.split(",").map((color) => color.trim());

  let green = 0;
  let blue = 0;
  let red = 0;

  colors.forEach((color) => {
    const [number, colorName] = color.split(" ");
		console.log(color)
    if (colorName === "green") {
      green += Number(number);
    } else if (colorName === "blue") {
      blue += Number(number);
    } else if (colorName === "red") {
      red += Number(number);
    }
  });

  return { green, blue, red };
};

const parseGame = (line: string): Game => {
	const gameID = Number(line.replace(/Game /, "").replace(/:.*/, ""));
	const removedGameID = line.replace(/Game \d+: /, "");

  const rounds = removedGameID.split(";").map((round) =>
	parseRound(round.replace(/Game \d: /, ""))
  );

  return { rounds, gameID };
};

export const parseInput = (input: string) => {
  const games = input.split("\n").map((line) => parseGame(line));

  return games;
};

const parsedInput = parseInput(puzzleInput);

export const isGameValid = (game: Game) => {
	const { rounds } = game;

	const results = rounds.map((round) => {
		const { green, blue, red } = round;

		if (green > MAX_GREEN || blue > MAX_BLUE || red > MAX_RED) {
			return false;
		}

		return true;
	})


	return results.every((result) => result);
}


const validGameIndexes = parsedInput.map((game, index) => {

	if (isGameValid(game)) {
		return game.gameID;
	}

	return 0;
})

const validGameSum = validGameIndexes.reduce((acc, curr) => acc + curr, 0);

console.log(validGameSum);

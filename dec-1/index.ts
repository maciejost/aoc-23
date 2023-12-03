import { input as puzzleInput } from './input';

export const getCodeFromString = (str: string): number | null => {
	const characters = str.split("");

	const numbers = characters.filter(char => !isNaN(Number(char))).map(Number);

	if (numbers.length > 0) {
		const firstNumber = numbers[0];
		const lastNumber = numbers[numbers.length - 1];

		return Number(`${firstNumber}${lastNumber}`);
	}

	return null;
};



export const getNumbers =  (input: string): number[] => {
	const inputAsLines = input.split("\n");

	const numbers = inputAsLines.map(line => getCodeFromString(line)).filter(Boolean);

	return numbers as number[];

};

export const getSum = (numbers: number[]): number => {
	return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log("RESULT", getSum(getNumbers(puzzleInput)));
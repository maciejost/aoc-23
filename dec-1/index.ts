import { input as puzzleInput } from './input';

const digitsAsStrings = [
	{
		digit: "one",
		index: 1,
	},
	{
		digit: "two",
		index: 2,
	},
	{
		digit: "three",
		index: 3,
	},
	{
		digit: "four",
		index: 4,
	},
	{
		digit: "five",
		index: 5,
	},
	{
		digit: "six",
		index: 6,
	},
	{
		digit: "seven",
		index: 7,
	},
	{
		digit: "eight",
		index: 8,
	},
	{
		digit: "nine",
		index: 9,
	},
];

type CodeEntry = {
	digit: number;
	index: number;
}

export const getCodeFromString = (str: string): number | null => {
	const entries = [] as CodeEntry[];
	str.split("").forEach((char, index) => {
		const digit = Number(char);
		if (!isNaN(digit)) {
			entries.push({
				digit,
				index,
			});
		}
	});

	const hasStringDigits = digitsAsStrings.some(({ digit }) => str.includes(digit));

	if ( hasStringDigits ) {
		digitsAsStrings.forEach(({ digit, index }) => {
			let regexMatch;

			const regex = new RegExp(digit, "g");


			while (regexMatch = regex.exec(str)) {
				entries.push({
					digit: index,
					index: regexMatch.index,
				});
			}
		});
	}

	if (entries.length === 0) {
		return null;
	}


	const sortedEntries = entries.sort((a, b) => a.index - b.index);

	const numbers = sortedEntries.map(({ digit }) => digit);

	const firstNumber = numbers[0];
	const lastNumber = numbers[numbers.length - 1];


	return Number(`${firstNumber}${lastNumber}`);
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

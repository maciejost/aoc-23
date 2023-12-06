import { input as input } from './input';

/* const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
 */
const lines = input.split("\n");

const IGNROED_CHARS = [
	'.',
	'.',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'0'
]

const symbols = [] as {
	char: string,
	lineIndex: number,
	charIndex: number
}[]

for(let i = 0; i < lines.length; i++) {
	const line = lines[i];
	for(let j = 0; j < line.length; j++) {
		const char = line[j];

		if (IGNROED_CHARS.includes(char)) continue;
		symbols.push({char, lineIndex: i, charIndex: j});

	}
}


const numbers = [] as {
	number: number,
	lineIndex: number,
	charIndex: number
	originalChar: typeof symbols[0]
}[]


for (let i =0; i < symbols.length; i++) {
	const symbol = symbols[i];
	const {lineIndex, charIndex} = symbol;
	const prevLine = lines[lineIndex - 1];
	const currentLine = lines[lineIndex];
	const nextLine = lines[lineIndex + 1];

	function findWholeNumber(index: number, line: string): {wholeNumber: string, startIndex: number} {
    let startIndex = index;
    let endIndex = index;

    while (endIndex < line.length && /\d/.test(line[endIndex])) {
        endIndex++;
    }

    while (startIndex >= 0 && /\d/.test(line[startIndex])) {
        startIndex--;
    }

    const wholeNumber = line.slice(startIndex + 1, endIndex);

    return {wholeNumber, startIndex};
}



	const positions = {
		prevLinePrevChar: {char: prevLine[charIndex - 1],
			charIndex: charIndex - 1,
			lineIndex: lineIndex - 1,
		},
		prevLineChar: {char: prevLine[charIndex],
			charIndex: charIndex,
			lineIndex: lineIndex - 1,
		},
		prevLineNextChar: {char: prevLine[charIndex + 1],
			charIndex: charIndex + 1,
			lineIndex: lineIndex - 1,
		},
		currentLinePrevChar: {char: currentLine[charIndex - 1],
			charIndex: charIndex - 1,
			lineIndex: lineIndex,
		},
		currentLineNextChar: {char: currentLine[charIndex + 1],
			charIndex: charIndex + 1,
			lineIndex: lineIndex,
		},
		nextLinePrevChar: {char: nextLine[charIndex - 1],
			charIndex: charIndex - 1,
			lineIndex: lineIndex + 1,
		},
		nextLineChar: {char: nextLine[charIndex],
			charIndex: charIndex,
			lineIndex: lineIndex + 1,
		},
		nextLineNextChar: {char: nextLine[charIndex + 1],
			charIndex: charIndex + 1,
			lineIndex: lineIndex + 1,
		},

	}

	Object.keys(positions).forEach((key) => {

		if (isNaN(positions[key].char)) return;


		const {lineIndex, charIndex} = positions[key];
		const number = findWholeNumber(charIndex, lines[lineIndex]);

		numbers.push({number: Number(number.wholeNumber), lineIndex, charIndex: number.startIndex, originalChar: symbol});
	})
}

function removeDuplicates(arr: typeof numbers): typeof numbers {
	const uniqueIndexes = new Set<string>();

	const result = arr.filter((obj) => {
			const indexKey = `${obj.lineIndex}-${obj.charIndex}`;
			if (uniqueIndexes.has(indexKey)) {
					return false;
			} else {
					uniqueIndexes.add(indexKey);
					return true;
			}
	});

	return result;
}

const filteredNumbers = removeDuplicates(numbers);
/* console.log('filteredNumbers', filteredNumbers) */

const sum = filteredNumbers.reduce((acc, curr) => acc + curr.number, 0);
/* console.log('sum', sum); */

function findObjectsWithSameOriginalChar(arr: typeof filteredNumbers): typeof filteredNumbers[] {
	const result: typeof filteredNumbers = [];

	// Create a Map to store objects based on originalChar
	const originalCharMap = new Map<string, typeof filteredNumbers>();

	// Iterate through the array and group objects by originalChar
	arr.forEach((obj) => {
		if (obj.originalChar.char === "*") {
			const key = `${obj.originalChar.char}-${obj.originalChar.lineIndex}`;
			if (!originalCharMap.has(key)) {
					originalCharMap.set(key, []);
			}
			originalCharMap.get(key)?.push(obj);
	}
	});

	// Iterate through the Map and add groups with more than one object to the result
	originalCharMap.forEach((group) => {
			if (group.length > 1) {
					result.push(...group);
			}
	});

	const groupedBySameChar = new Map<string, typeof filteredNumbers>();

	result.forEach((obj) => {
		const key = `${obj.originalChar.char}-${obj.originalChar.lineIndex}`;
		if (!groupedBySameChar.has(key)) {
				groupedBySameChar.set(key, []);
		}
		groupedBySameChar.get(key)?.push(obj);
	});

	const groupedResult: typeof filteredNumbers[] = [];

	groupedBySameChar.forEach((group) => {
			if (group.length > 1) {
				groupedResult.push(group);
			}
	});


	return groupedResult;
}
const sameOriginator = findObjectsWithSameOriginalChar(filteredNumbers);

console.log('sameOriginator', sameOriginator);

let ratioSum = 0;

const calculateRatio = sameOriginator.map((group) => {
	if(group.length !== 2) return;

	const {number: firstNumber} = group[0];
	const {number: secondNumber} = group[1];

	console.log(firstNumber, secondNumber);

	const ratio = firstNumber * secondNumber;


	ratioSum += ratio;

	return ratio;
});

console.log('ratioSum', ratioSum);
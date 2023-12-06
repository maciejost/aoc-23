import { input as input } from './input';

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

		numbers.push({number: Number(number.wholeNumber), lineIndex, charIndex: number.startIndex});
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
console.log('filteredNumbers', filteredNumbers)

const sum = filteredNumbers.reduce((acc, curr) => acc + curr.number, 0);
console.log('sum', sum);
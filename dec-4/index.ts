import { input } from './input';

const lines = input.split('\n');

const cards = lines.map(line => {
	const [id, ...values] = line.split(':');
	const split = values.map(v => v.split('|')).map(v => v.map(v => v.split(" ")))

	const flat = split.flat()

	const winningNumbers = flat[0].filter(v => v !== '');
	const gameNumbers = flat[1].filter(v => v !== '');

	return { id, winningNumbers, gameNumbers };
});

const score = cards.map(card => {
	const { winningNumbers, gameNumbers } = card;
	const matches = winningNumbers.filter(v => gameNumbers.includes(v));

	if (matches.length <= 0) return
	let cardScore = 1;

	for (let i = 0; i < matches.length; i++) {
		cardScore *= 2
	}

	console.log(matches.length)
	return cardScore / 2;
});


const removeUndefined = score.filter(v => v !== undefined);
const summedScore = removeUndefined.reduce((acc, curr) => acc + curr, 0);

console.log(score);
console.log(summedScore);


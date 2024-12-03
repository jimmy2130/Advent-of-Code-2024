import * as fs from 'fs';

function day3() {
	const input = fs.readFileSync('./day3.txt').toString();
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function part1(input: string) {
	const reg = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
	const foundedPatterns = [...input.matchAll(reg)].map(element => element[0]);
	return getAns(foundedPatterns);
}

function getAns(patterns: string[]) {
	const numbers = patterns.map(str =>
		str
			.split(/mul\(|,|\)/)
			.slice(1, -1)
			.map(element => Number(element)),
	);
	return numbers.reduce((acc, cur) => acc + cur[0] * cur[1], 0);
}

function part2(input: string) {
	const reg = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g;
	const foundedPatterns = [...input.matchAll(reg)].map(element => element[0]);
	let shouldDo = true;
	const validPatterns: string[] = [];
	for (let i = 0; i < foundedPatterns.length; i++) {
		const pattern = foundedPatterns[i];
		if (pattern === 'do()') {
			shouldDo = true;
			continue;
		}
		if (pattern === "don't()") {
			shouldDo = false;
			continue;
		}
		if (!shouldDo) {
			continue;
		}
		validPatterns.push(pattern);
	}
	return getAns(validPatterns);
}

day3();

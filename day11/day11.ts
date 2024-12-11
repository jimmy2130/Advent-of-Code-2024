import * as fs from 'fs';

function day11() {
	const input = fs
		.readFileSync('./day11.txt')
		.toString()
		.split(' ')
		.map(el => Number(el));
	console.log('part 1');
	console.log(getAns(input, 25));
	console.log('part 2');
	console.log(getAns(input, 75));
}

function getDigits(input: number) {
	return Math.floor(Math.log10(input)) + 1;
}

function getAns(input: number[], times: number) {
	let map = new Map<number, number>();
	for (let i = 0; i < input.length; i++) {
		map.set(input[i], 1);
	}
	for (let i = 0; i < times; i++) {
		const nextMap = new Map<number, number>();
		map.forEach((value, key) => {
			if (key === 0) {
				nextMap.set(1, (nextMap.get(1) ?? 0) + value);
			} else if (getDigits(key) % 2 === 0) {
				const stringLength = getDigits(key) / 2;
				const leftHalfValue = Math.floor(key / Math.pow(10, stringLength));
				const rightHalfValue = key % Math.pow(10, stringLength);
				nextMap.set(leftHalfValue, (nextMap.get(leftHalfValue) ?? 0) + value);
				nextMap.set(rightHalfValue, (nextMap.get(rightHalfValue) ?? 0) + value);
			} else {
				nextMap.set(key * 2024, (nextMap.get(key * 2024) ?? 0) + value);
			}
		});
		map = nextMap;
	}
	let ans = 0;
	map.forEach(value => (ans += value));
	return ans;
}

day11();

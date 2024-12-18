import * as fs from 'fs';

function day18() {
	const input = fs
		.readFileSync('./day18.txt')
		.toString()
		.split('\n')
		.map(line => line.split(',').map(el => Number(el)));
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

const MAP_SIZE = 71;
const BYTE_LENGTH = 1024;

const DIR = [
	[-1, 0],
	[1, 0],
	[0, 1],
	[0, -1],
];

function outOfBound(r: number, c: number, size: number) {
	return r < 0 || r >= size || c < 0 || c >= size;
}

function getMap(input: number[][]): string[][] {
	const map = Array(MAP_SIZE)
		.fill(null)
		.map(_ => Array(MAP_SIZE).fill('.'));
	for (let i = 0; i < input.length; i++) {
		const [c, r] = input[i];
		map[r][c] = '#';
	}
	return map;
}

function part1(input: number[][]) {
	const map = getMap(input.slice(0, BYTE_LENGTH));
	return simulate(map);
}

function part2(input: number[][]) {
	for (let i = 0; i < input.length; i++) {
		const map = getMap(input.slice(0, i));
		const result = simulate(map);
		if (result === Infinity) {
			return input[i - 1].join(',');
		}
	}
}

function simulate(map: string[][]) {
	const record = Array(map.length)
		.fill(null)
		.map(_ => Array(map[0].length).fill(Infinity));
	record[0][0] = 0;
	let step = 0;
	const queue = [[0, 0]];
	let queueLength = queue.length;
	while (queue.length > 0) {
		const item = queue.shift();
		queueLength -= 1;
		if (item === undefined) {
			throw new Error('impossible!');
		}
		const [r, c] = item;
		for (let i = 0; i < DIR.length; i++) {
			const [dr, dc] = DIR[i];
			const [exploreR, exploreC] = [r + dr, c + dc];
			if (outOfBound(exploreR, exploreC, map.length)) {
				continue;
			}
			if (map[exploreR][exploreC] === '#') {
				continue;
			}
			if (record[exploreR][exploreC] !== Infinity) {
				continue;
			}
			record[exploreR][exploreC] = step + 1;
			queue.push([exploreR, exploreC]);
		}
		if (queueLength === 0) {
			step += 1;
			queueLength = queue.length;
		}
	}
	return record[record.length - 1][record.length - 1];
}

day18();

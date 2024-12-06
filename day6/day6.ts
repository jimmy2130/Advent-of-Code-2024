import * as fs from 'fs';

function day6() {
	const input = fs
		.readFileSync('./day6.txt')
		.toString()
		.split('\n')
		.map(line => line.split(''));
	console.log('part 1');
	const result = part1(input);
	console.log(countPositions(result));
	console.log('part 2');
	console.log(part2(input, result));
}

const DIR = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

function part1(map: string[][]) {
	const record: boolean[][] = Array(map.length)
		.fill(null)
		.map(_ => Array(map[0].length).fill(false));
	let [r, c] = getStartingPoint(map);
	record[r][c] = true;
	let directionIndex = 0;
	while (true) {
		const [dr, dc] = DIR[directionIndex];
		const [exploreR, exploreC] = [r + dr, c + dc];
		if (
			exploreR < 0 ||
			exploreR >= map.length ||
			exploreC < 0 ||
			exploreC >= map[0].length
		) {
			break;
		}
		if (map[exploreR][exploreC] === '#') {
			directionIndex += 1;
			directionIndex %= DIR.length;
			continue;
		}
		record[exploreR][exploreC] = true;
		r = exploreR;
		c = exploreC;
	}
	return record;
}

function getStartingPoint(map: string[][]) {
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '^') {
				return [r, c];
			}
		}
	}
	return [0, 0];
}

function countPositions(record: boolean[][]) {
	let ans = 0;
	for (let r = 0; r < record.length; r++) {
		for (let c = 0; c < record[r].length; c++) {
			if (record[r][c] === true) {
				ans += 1;
			}
		}
	}
	return ans;
}

function part2(map: string[][], possiblePositions: boolean[][]) {
	let ans = 0;
	const [startingR, startingC] = getStartingPoint(map);
	possiblePositions[startingR][startingC] = false;
	for (let r = 0; r < possiblePositions.length; r++) {
		for (let c = 0; c < possiblePositions[r].length; c++) {
			if (possiblePositions[r][c] === false) {
				continue;
			}
			// modify map
			map[r][c] = '#';
			// simulate
			if (simulate(map)) {
				ans += 1;
			}
			// modify map back
			map[r][c] = '.';
		}
	}
	return ans;
}

function simulate(map: string[][]) {
	const record: number[][] = Array(map.length)
		.fill(null)
		.map(_ => Array(map[0].length).fill(9999));
	let [r, c] = getStartingPoint(map);
	record[r][c] = 0;
	let directionIndex = 0;
	while (true) {
		const [dr, dc] = DIR[directionIndex];
		const [exploreR, exploreC] = [r + dr, c + dc];
		if (
			exploreR < 0 ||
			exploreR >= map.length ||
			exploreC < 0 ||
			exploreC >= map[0].length
		) {
			break;
		}
		if (map[exploreR][exploreC] === '#') {
			directionIndex += 1;
			directionIndex %= DIR.length;
			continue;
		}
		if (record[exploreR][exploreC] === directionIndex) {
			return true;
		}
		record[exploreR][exploreC] = directionIndex;
		r = exploreR;
		c = exploreC;
	}
	return false;
}

day6();

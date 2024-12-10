import * as fs from 'fs';

function day10() {
	const input = fs
		.readFileSync('./day10.txt')
		.toString()
		.split('\n')
		.map(line => line.split('').map(el => Number(el)));
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

const DIR = [
	[-1, 0],
	[1, 0],
	[0, 1],
	[0, -1],
];

function outOfBound(r: number, c: number, size: number) {
	return r < 0 || r >= size || c < 0 || c >= size;
}

function part1(map: number[][]) {
	let ans = 0;
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			const record = new Set<number>();
			if (map[r][c] === 0) {
				explore(map, [r, c], 0, record);
				ans += record.size;
			}
		}
	}
	return ans;
}

function explore(
	map: number[][],
	[r, c]: [number, number],
	currentLevel: number,
	record: Set<number>,
) {
	if (currentLevel === 9) {
		record.add(r * map.length + c);
		return;
	}
	for (let i = 0; i < DIR.length; i++) {
		const [dr, dc] = DIR[i];
		const [exploreR, exploreC] = [r + dr, c + dc];
		if (outOfBound(exploreR, exploreC, map.length)) {
			continue;
		}
		if (map[exploreR][exploreC] !== currentLevel + 1) {
			continue;
		}
		explore(map, [exploreR, exploreC], currentLevel + 1, record);
	}
}

function part2(map: number[][]) {
	let ans = 0;
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === 0) {
				ans += explore2(map, [r, c], 0);
			}
		}
	}
	return ans;
}

function explore2(
	map: number[][],
	[r, c]: [number, number],
	currentLevel: number,
) {
	if (currentLevel === 9) {
		return 1;
	}
	let ans = 0;
	for (let i = 0; i < DIR.length; i++) {
		const [dr, dc] = DIR[i];
		const [exploreR, exploreC] = [r + dr, c + dc];
		if (outOfBound(exploreR, exploreC, map.length)) {
			continue;
		}
		if (map[exploreR][exploreC] !== currentLevel + 1) {
			continue;
		}
		ans += explore2(map, [exploreR, exploreC], currentLevel + 1);
	}
	return ans;
}

day10();

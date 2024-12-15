import * as fs from 'fs';

function day15() {
	const input = fs.readFileSync('./day15.txt').toString().split('\n\n');
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function getMap(input: string): [string[][], number, number] {
	const map = input.split('\n').map(x => x.split(''));
	let startR = 0;
	let startC = 0;
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '@') {
				startR = r;
				startC = c;
				map[r][c] = '.';
			}
		}
	}
	return [map, startR, startC];
}

const DIR = {
	'^': [-1, 0],
	v: [1, 0],
	'>': [0, 1],
	'<': [0, -1],
};

function part1(input: string[]) {
	const [map, startR, startC] = getMap(input[0]);
	const instructions = input[1].split('\n').join('');
	let r = startR;
	let c = startC;
	for (let i = 0; i < instructions.length; i++) {
		const instruction = instructions[i];
		if (!isKey(instruction, DIR)) {
			throw new Error('unknown key');
		}
		const [dr, dc] = DIR[instruction];
		const [exploreR, exploreC] = [r + dr, c + dc];
		if (map[exploreR][exploreC] === '#') {
			continue;
		}
		if (map[exploreR][exploreC] === '.') {
			r = exploreR;
			c = exploreC;
			continue;
		}
		let [exploreR2, exploreC2] = [r + dr + dr, c + dc + dc];
		while (map[exploreR2][exploreC2] === 'O') {
			exploreR2 += dr;
			exploreC2 += dc;
		}
		if (map[exploreR2][exploreC2] === '#') {
			continue;
		}
		map[exploreR][exploreC] = '.';
		map[exploreR2][exploreC2] = 'O';
		r = exploreR;
		c = exploreC;
	}
	return getAns(map, 'O');
}

function getAns(map: string[][], element: string) {
	let sum = 0;
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === element) {
				sum += r * 100 + c;
			}
		}
	}
	return sum;
}

function part2(input: string[]) {
	const [map, startR, startC] = getMap2(input[0]);
	const instructions = input[1].split('\n').join('');
	let r = startR;
	let c = startC;
	for (let i = 0; i < instructions.length; i++) {
		const instruction = instructions[i];
		if (!isKey(instruction, DIR)) {
			throw new Error('unknown key');
		}
		const [dr, dc] = DIR[instruction];
		const [exploreR, exploreC] = [r + dr, c + dc];
		if (map[exploreR][exploreC] === '#') {
			continue;
		}
		if (map[exploreR][exploreC] === '.') {
			r = exploreR;
			c = exploreC;
			continue;
		}
		if (instruction === '<' || instruction === '>') {
			if (exploreHorizontal(map, [exploreR, exploreC], dc)) {
				r = exploreR;
				c = exploreC;
			}
		} else {
			const explorePoints: [number, number][] = [
				[exploreR, exploreC],
				[exploreR, exploreC + (map[exploreR][exploreC] === '[' ? 1 : -1)],
			];
			if (exploreVertical(map, explorePoints, dr)) {
				r = exploreR;
				c = exploreC;
			}
		}
	}
	return getAns(map, '[');
}

function isKey<T extends object, K extends PropertyKey>(
	key: K,
	obj: T,
): key is K & keyof T {
	return key in obj;
}

function getMap2(input: string): [string[][], number, number] {
	const map = input.split('\n').map(line => {
		let newLine = '';
		for (let i = 0; i < line.length; i++) {
			const tile = line[i];
			switch (tile) {
				case '#':
					newLine += '##';
					break;
				case 'O':
					newLine += '[]';
					break;
				case '.':
					newLine += '..';
					break;
				case '@':
					newLine += '@.';
					break;
			}
		}
		return newLine.split('');
	});
	let startR = 0;
	let startC = 0;
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '@') {
				startR = r;
				startC = c;
				map[r][c] = '.';
			}
		}
	}
	return [map, startR, startC];
}

function exploreHorizontal(
	map: string[][],
	[exploreR, exploreC]: [number, number],
	dc: number,
): boolean {
	if (map[exploreR][exploreC + dc + dc] === '#') {
		return false;
	}
	if (map[exploreR][exploreC + dc + dc] === '.') {
		map[exploreR][exploreC + dc + dc] = dc === 1 ? ']' : '[';
		map[exploreR][exploreC + dc] = dc === 1 ? '[' : ']';
		map[exploreR][exploreC] = '.';
		return true;
	}
	const result = exploreHorizontal(map, [exploreR, exploreC + dc + dc], dc);
	if (result === true) {
		map[exploreR][exploreC + dc + dc] = dc === 1 ? ']' : '[';
		map[exploreR][exploreC + dc] = dc === 1 ? '[' : ']';
		map[exploreR][exploreC] = '.';
	}
	return result;
}

function exploreVertical(
	map: string[][],
	explorePoints: [number, number][],
	dr: number,
): boolean {
	if (
		explorePoints.some(
			([exploreR, exploreC]) => map[exploreR + dr][exploreC] === '#',
		)
	) {
		return false;
	}
	if (
		explorePoints.every(
			([exploreR, exploreC]) => map[exploreR + dr][exploreC] === '.',
		)
	) {
		explorePoints.forEach(([exploreR, exploreC]) => {
			map[exploreR + dr][exploreC] = map[exploreR][exploreC];
			map[exploreR][exploreC] = '.';
		});
		return true;
	}
	const newExploreSet = new Set<number>();
	for (let i = 0; i < explorePoints.length; i++) {
		const [r, c] = explorePoints[i];
		if (map[r + dr][c] === '[') {
			newExploreSet.add(100 * (r + dr) + c);
			newExploreSet.add(100 * (r + dr) + c + 1);
		} else if (map[r + dr][c] === ']') {
			newExploreSet.add(100 * (r + dr) + c);
			newExploreSet.add(100 * (r + dr) + c - 1);
		}
	}
	const newExplorePoints: [number, number][] = Array.from(newExploreSet).map(
		el => [(el - (el % 100)) / 100, el % 100],
	);
	const result = exploreVertical(map, newExplorePoints, dr);
	if (result === true) {
		explorePoints.forEach(([exploreR, exploreC]) => {
			map[exploreR + dr][exploreC] = map[exploreR][exploreC];
			map[exploreR][exploreC] = '.';
		});
	}
	return result;
}

day15();

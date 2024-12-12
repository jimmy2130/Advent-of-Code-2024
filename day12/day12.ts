import * as fs from 'fs';

function day12() {
	const input = fs.readFileSync('./day12.txt').toString().split('\n');
	console.log('part 1');
	console.log(getAns(input, 'part 1'));
	console.log('part 2');
	console.log(getAns(input, 'part 2'));
}

function getAns(map: string[], whichPart: 'part 1' | 'part 2') {
	const record: boolean[][] = Array(map.length)
		.fill(null)
		.map(_ => Array(map.length).fill(false));
	let ans = 0;
	const func = whichPart === 'part 1' ? getPrice : getPrice2;
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map.length; c++) {
			if (!record[r][c]) {
				ans += func(map, record, [r, c]);
			}
		}
	}
	return ans;
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

function getPrice(
	map: string[],
	record: boolean[][],
	[startR, startC]: [number, number],
) {
	record[startR][startC] = true;
	const ownRecord: boolean[][] = Array(map.length)
		.fill(null)
		.map(_ => Array(map.length).fill(false));
	ownRecord[startR][startC] = true;
	let area = 0;
	let parameter = 0;
	const queue: [number, number][] = [[startR, startC]];
	while (queue.length > 0) {
		const item = queue.shift();
		if (item === undefined) {
			break;
		}
		const [r, c] = item;
		area += 1;
		for (let i = 0; i < DIR.length; i++) {
			const [dr, dc] = DIR[i];
			const [exploreR, exploreC] = [r + dr, c + dc];
			if (outOfBound(exploreR, exploreC, map.length)) {
				parameter += 1;
				continue;
			}
			if (ownRecord[exploreR][exploreC] === true) {
				continue;
			}
			if (map[exploreR][exploreC] !== map[startR][startC]) {
				parameter += 1;
				continue;
			}
			record[exploreR][exploreC] = true;
			ownRecord[exploreR][exploreC] = true;
			queue.push([exploreR, exploreC]);
		}
	}
	return area * parameter;
}

function getPrice2(
	map: string[],
	record: boolean[][],
	[startR, startC]: [number, number],
) {
	record[startR][startC] = true;
	const ownRecord: boolean[][] = Array(map.length)
		.fill(null)
		.map(_ => Array(map.length).fill(false));
	ownRecord[startR][startC] = true;
	let area = 0;
	const hMap = Array(map.length + 1)
		.fill(null)
		.map(_ => Array(map.length + 1).fill(0));
	const vMap = Array(map.length + 1)
		.fill(null)
		.map(_ => Array(map.length + 1).fill(0));
	const queue: [number, number][] = [[startR, startC]];
	while (queue.length > 0) {
		const item = queue.shift();
		if (item === undefined) {
			break;
		}
		const [r, c] = item;
		area += 1;
		for (let i = 0; i < DIR.length; i++) {
			const [dr, dc] = DIR[i];
			const [exploreR, exploreC] = [r + dr, c + dc];
			if (outOfBound(exploreR, exploreC, map.length)) {
				switch (i) {
					case 0:
						hMap[r][c] = 1;
						break;
					case 1:
						hMap[r + 1][c] = 2;
						break;
					case 2:
						vMap[r][c + 1] = 1;
						break;
					case 3:
						vMap[r][c] = 2;
						break;
				}
				continue;
			}
			if (ownRecord[exploreR][exploreC] === true) {
				continue;
			}
			if (map[exploreR][exploreC] !== map[startR][startC]) {
				switch (i) {
					case 0:
						hMap[r][c] = 1;
						break;
					case 1:
						hMap[r + 1][c] = 2;
						break;
					case 2:
						vMap[r][c + 1] = 1;
						break;
					case 3:
						vMap[r][c] = 2;
						break;
				}
				continue;
			}
			record[exploreR][exploreC] = true;
			ownRecord[exploreR][exploreC] = true;
			queue.push([exploreR, exploreC]);
		}
	}
	let hSide = 0;
	let flag = 0;
	for (let r = 0; r < hMap.length; r++) {
		for (let c = 0; c < hMap.length; c++) {
			if (flag !== hMap[r][c] && hMap[r][c] !== 0) {
				hSide += 1;
			}
			flag = hMap[r][c];
		}
	}
	let vSide = 0;
	flag = 0;
	for (let c = 0; c < vMap.length; c++) {
		for (let r = 0; r < vMap.length; r++) {
			if (flag !== vMap[r][c] && vMap[r][c] !== 0) {
				vSide += 1;
			}
			flag = vMap[r][c];
		}
	}
	return area * (hSide + vSide);
}

day12();

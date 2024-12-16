import * as fs from 'fs';

function day16() {
	const input = fs.readFileSync('./day16.txt').toString().split('\n');
	const [part1Ans, part2Ans] = getAns(input);
	console.log('part 1');
	console.log(part1Ans);
	console.log('part 2');
	console.log(part2Ans);
}

function getInfo(input: string[]): [[number, number], [number, number]] {
	let [startR, startC] = [0, 0];
	let [endR, endC] = [0, 0];
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (input[r][c] === 'S') {
				startR = r;
				startC = c;
			} else if (input[r][c] === 'E') {
				endR = r;
				endC = c;
			}
		}
	}
	return [
		[startR, startC],
		[endR, endC],
	];
}

function getAns(map: string[]) {
	const [[startR, startC], [endR, endC]] = getInfo(map);
	const scoreMap = Array(map.length)
		.fill(null)
		.map(_ =>
			Array(map[0].length)
				.fill(null)
				.map(_ => Array(4).fill(Infinity)),
		);
	const pathMap = new Map<number, Set<number>>();
	dfs(map, [startR, startC], [endR, endC], 0, 0, new Set(), scoreMap, pathMap);
	const part1Ans = Math.min(...scoreMap[endR][endC]);
	const part2Ans = (pathMap.get(part1Ans) ?? new Set()).size + 1;
	return [part1Ans, part2Ans];
}

const DIR = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];

const CHOICES = [0, -1, 1];

function dfs(
	map: string[],
	[r, c]: [number, number],
	[endR, endC]: [number, number],
	direction: number,
	score: number,
	record: Set<number>,
	scoreMap: number[][][],
	pathMap: Map<number, Set<number>>,
) {
	if (scoreMap[r][c][direction] < score) {
		return;
	}
	scoreMap[r][c][direction] = score;

	if (r === endR && c === endC) {
		const combinedPath = [
			...Array.from(record),
			...Array.from(pathMap.get(score) ?? new Set<number>()),
		];
		pathMap.set(score, new Set(combinedPath));
		return;
	}

	for (let i = 0; i < CHOICES.length; i++) {
		const choice = CHOICES[i];
		const newDirection = (direction + choice + DIR.length) % DIR.length;
		const [dr, dc] = DIR[newDirection];
		if (map[r + dr][c + dc] === '#') {
			continue;
		}
		if (record.has((r + dr) * 100 + c + dc)) {
			continue;
		}
		record.add((r + dr) * 100 + c + dc);
		dfs(
			map,
			[r + dr, c + dc],
			[endR, endC],
			newDirection,
			score + (choice === 0 ? 1 : 1001),
			record,
			scoreMap,
			pathMap,
		);
		record.delete((r + dr) * 100 + c + dc);
	}
}

day16();

import * as fs from 'fs';

const NUMERIC_KEYPAD = [
	['7', '8', '9'],
	['4', '5', '6'],
	['1', '2', '3'],
	['X', '0', 'A'],
];

const DIRECTIONAL_KEYPAD = [
	['X', '^', 'A'],
	['<', 'v', '>'],
];

type Keypad = Record<string, Record<string, string[]>>;

function day21() {
	const input = fs.readFileSync('./day21.txt').toString().split('\n');
	console.log('part 1');
	console.log(getAns(input, 2));
	console.log('part 2');
	console.log(getAns(input, 25));
}

function getAns(codes: string[], maxDepth: number) {
	const numericMap = getMap(NUMERIC_KEYPAD);
	const directionalMap = getMap(DIRECTIONAL_KEYPAD);
	let ans = 0;
	for (let i = 0; i < codes.length; i++) {
		const lengthOfShortestSequence = getStepsFromNumericMap(
			codes[i],
			numericMap,
			directionalMap,
			maxDepth,
		);
		const numericPart = Number(codes[i].slice(0, -1));
		ans += lengthOfShortestSequence * numericPart;
	}
	return ans;
}

function getStepsFromNumericMap(
	code: string,
	numericMap: Keypad,
	directionalMap: Keypad,
	maxDepth: number,
) {
	let currentPosition = 'A';
	let step = 0;
	const memory = new Map();
	for (let i = 0; i < code.length; i++) {
		let minStep = Infinity;
		const targetPosition = code[i];
		const options = numericMap?.[currentPosition]?.[targetPosition] ?? [];
		for (let j = 0; j < options.length; j++) {
			minStep = Math.min(
				minStep,
				getStepsFromDirectionalMap(
					options[j],
					directionalMap,
					0,
					memory,
					maxDepth,
				),
			);
		}
		step += minStep;
		currentPosition = targetPosition;
	}
	return step;
}

function getStepsFromDirectionalMap(
	path: string,
	directionalMap: Keypad,
	depth: number,
	memory: Map<string, number[]>,
	maxDepth: number,
) {
	if (depth === maxDepth) {
		return path.length;
	}
	if (memory.get(path) && memory.get(path)?.[depth]) {
		return memory.get(path)?.[depth] ?? 0;
	}
	let currentPosition = 'A';
	let step = 0;
	for (let i = 0; i < path.length; i++) {
		let minStep = Infinity;
		const targetPosition = path[i];
		const options = directionalMap?.[currentPosition]?.[targetPosition] ?? [];
		for (let j = 0; j < options.length; j++) {
			minStep = Math.min(
				minStep,
				getStepsFromDirectionalMap(
					options[j],
					directionalMap,
					depth + 1,
					memory,
					maxDepth,
				),
			);
		}
		step += minStep;
		currentPosition = targetPosition;
	}
	const m = memory.get(path) ?? [];
	m[depth] = step;
	memory.set(path, m);
	return step;
}

function getMap(keypad: string[][]) {
	const keys = keypad.flat().filter(key => key !== 'X');
	const object: Keypad = {};
	for (let i = 0; i < keys.length; i++) {
		const start = keys[i];
		object[start] = {};
		for (let j = 0; j < keys.length; j++) {
			const end = keys[j];
			const paths: string[] = [];
			getPaths(
				getPosition(start, keypad),
				getPosition(end, keypad),
				getPosition('X', keypad),
				'',
				paths,
			);
			object[start][end] = paths;
		}
	}
	return object;
}

function getPaths(
	[startR, startC]: [number, number],
	[endR, endC]: [number, number],
	[banR, banC]: [number, number],
	path: string,
	paths: string[],
) {
	if (startR === endR && startC === endC) {
		paths.push(`${path}A`);
		return;
	}
	if (startR === banR && startC === banC) {
		return;
	}
	if (startR === endR) {
		getPaths(
			[startR, startC + (startC < endC ? 1 : -1)],
			[endR, endC],
			[banR, banC],
			`${path}${startC < endC ? '>' : '<'}`,
			paths,
		);
		return;
	}
	if (startC === endC) {
		getPaths(
			[startR + (startR < endR ? 1 : -1), startC],
			[endR, endC],
			[banR, banC],
			`${path}${startR < endR ? 'v' : '^'}`,
			paths,
		);
		return;
	}
	getPaths(
		[startR + (startR < endR ? 1 : -1), startC],
		[endR, endC],
		[banR, banC],
		`${path}${startR < endR ? 'v' : '^'}`,
		paths,
	);
	getPaths(
		[startR, startC + (startC < endC ? 1 : -1)],
		[endR, endC],
		[banR, banC],
		`${path}${startC < endC ? '>' : '<'}`,
		paths,
	);
}

function getPosition(key: string, panel: string[][]): [number, number] {
	for (let r = 0; r < panel.length; r++) {
		for (let c = 0; c < panel[r].length; c++) {
			if (panel[r][c] === key) {
				return [r, c];
			}
		}
	}
	return [0, 0];
}

day21();

import * as fs from 'fs';

function day20() {
	const input = fs.readFileSync('./day20.txt').toString().split('\n');
	console.log('part 1');
	console.log(getAns(input, 2));
	console.log('part 2');
	console.log(getAns(input, 20));
}

const DIR = [
	[-1, 0],
	[1, 0],
	[0, 1],
	[0, -1],
];

function createMap(input: string[]): [(number | string)[][], number] {
	let [startR, startC] = [0, 0];
	let [endR, endC] = [0, 0];
	const map: (string | number)[][] = input.map(line => line.split(''));
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map.length; c++) {
			if (map[r][c] === 'S') {
				[startR, startC] = [r, c];
				map[r][c] = 0;
			} else if (map[r][c] === 'E') {
				[endR, endC] = [r, c];
			}
		}
	}
	let [pointerR, pointerC] = [startR, startC];
	let currentStep = 1;
	while (pointerR !== endR || pointerC !== endC) {
		for (let i = 0; i < DIR.length; i++) {
			const [dr, dc] = DIR[i];
			const [exploreR, exploreC] = [pointerR + dr, pointerC + dc];
			if (map[exploreR][exploreC] !== '.' && map[exploreR][exploreC] !== 'E') {
				continue;
			}
			map[exploreR][exploreC] = currentStep;
			currentStep += 1;
			pointerR = exploreR;
			pointerC = exploreC;
		}
	}
	return [map, currentStep];
}

function getAns(input: string[], cheatTotalTime: number) {
	const [map, biggestMove] = createMap(input);
	const list: [number, number][] = Array(biggestMove).fill(undefined);
	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '#') {
				continue;
			}
			const distance = Number(map[r][c]);
			list[distance] = [r, c];
		}
	}
	let ans = 0;

	for (let i = 0; i < list.length; i++) {
		for (let j = i + 1; j < list.length; j++) {
			const [r1, c1] = list[i];
			const [r2, c2] = list[j];
			const distance = Math.abs(r1 - r2) + Math.abs(c1 - c2);
			if (distance > cheatTotalTime) {
				continue;
			}
			const cheatTime = j - i - distance;
			if (cheatTime >= 100) {
				ans += 1;
			}
		}
	}
	return ans;
}

day20();

import * as fs from 'fs';

const WIDTH = 101;
const HEIGHT = 103;

function day14() {
	const input = fs.readFileSync('./day14.txt').toString().split('\n');
	const robotsInfo = getRobotsInfo(input);
	console.log('part 1');
	console.log(part1(robotsInfo));
	console.log('part 2');
	console.log(part2(robotsInfo));
}

function getRobotsInfo(input: string[]) {
	return input.map(line =>
		line
			.split(/p=|,| v=/)
			.slice(1)
			.map(el => Number(el)),
	);
}

function part1(info: number[][]) {
	const regions = [0, 0, 0, 0];
	for (let i = 0; i < info.length; i++) {
		const [x, y, vx, vy] = info[i];
		const finalX = (x + 100 * vx + 100 * WIDTH) % WIDTH;
		const finalY = (y + 100 * vy + 100 * HEIGHT) % HEIGHT;
		if (finalX < Math.floor(WIDTH / 2) && finalY < Math.floor(HEIGHT / 2)) {
			regions[0] += 1;
		} else if (
			finalX >= WIDTH - Math.floor(WIDTH / 2) &&
			finalY < Math.floor(HEIGHT / 2)
		) {
			regions[1] += 1;
		} else if (
			finalX >= WIDTH - Math.floor(WIDTH / 2) &&
			finalY >= HEIGHT - Math.floor(HEIGHT / 2)
		) {
			regions[2] += 1;
		} else if (
			finalX < Math.floor(WIDTH / 2) &&
			finalY >= HEIGHT - Math.floor(HEIGHT / 2)
		) {
			regions[3] += 1;
		}
	}
	return regions[0] * regions[1] * regions[2] * regions[3];
}

function part2(info: number[][]) {
	let times = 0;
	while (times < WIDTH * HEIGHT) {
		const board = Array(HEIGHT)
			.fill(null)
			.map(_ => Array(WIDTH).fill('.'));
		for (let i = 0; i < info.length; i++) {
			const [x, y, vx, vy] = info[i];
			const finalX = (x + times * vx + times * WIDTH) % WIDTH;
			const finalY = (y + times * vy + times * HEIGHT) % HEIGHT;
			board[finalX][finalY] = '#';
		}
		for (let r = 0; r < board.length - 20; r++) {
			const line = board[r].slice(r, r + 20);
			if (line.every(el => el === '#')) {
				return times;
			}
		}
		times += 1;
	}
	return 0;
}

day14();

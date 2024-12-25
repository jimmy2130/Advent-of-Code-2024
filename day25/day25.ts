import * as fs from 'fs';

function day25() {
	const input = fs.readFileSync('./day25.txt').toString().split('\n\n');
	console.log('part 1');
	console.log(part1(input));
}

function getCols(input: string[]) {
	const cols = [0, 0, 0, 0, 0];
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (input[r][c] === '#') {
				cols[c] += 1;
			}
		}
	}
	return cols;
}

function part1(input: string[]) {
	const keys: number[][] = [];
	const locks: number[][] = [];
	for (let i = 0; i < input.length; i++) {
		const part = input[i].split('\n');
		if (part[0] === '#####') {
			locks.push(getCols(part.slice(1)));
		} else {
			keys.push(getCols(part.slice(0, -1)));
		}
	}
	let ans = 0;
	for (let i = 0; i < keys.length; i++) {
		for (let j = 0; j < locks.length; j++) {
			const key = keys[i];
			const lock = locks[j];
			const combine = key.map((k, index) => k + lock[index]);
			if (combine.every(c => c <= 5)) {
				ans += 1;
			}
		}
	}
	return ans;
}

day25();

import * as fs from 'fs';

function day4() {
	const input = fs.readFileSync('./day4.txt').toString().split('\n');
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function part1(input: string[]) {
	let ans = 0;
	// horizontal
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length - 3; c++) {
			if (
				(input[r][c] === 'X' &&
					input[r][c + 1] === 'M' &&
					input[r][c + 2] === 'A' &&
					input[r][c + 3] === 'S') ||
				(input[r][c] === 'S' &&
					input[r][c + 1] === 'A' &&
					input[r][c + 2] === 'M' &&
					input[r][c + 3] === 'X')
			) {
				ans += 1;
			}
		}
	}
	// vertical
	for (let r = 0; r < input.length - 3; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (
				(input[r][c] === 'X' &&
					input[r + 1][c] === 'M' &&
					input[r + 2][c] === 'A' &&
					input[r + 3][c] === 'S') ||
				(input[r][c] === 'S' &&
					input[r + 1][c] === 'A' &&
					input[r + 2][c] === 'M' &&
					input[r + 3][c] === 'X')
			) {
				ans += 1;
			}
		}
	}
	// diagonal \
	for (let r = 0; r < input.length - 3; r++) {
		for (let c = 0; c < input[r].length - 3; c++) {
			if (
				(input[r][c] === 'X' &&
					input[r + 1][c + 1] === 'M' &&
					input[r + 2][c + 2] === 'A' &&
					input[r + 3][c + 3] === 'S') ||
				(input[r][c] === 'S' &&
					input[r + 1][c + 1] === 'A' &&
					input[r + 2][c + 2] === 'M' &&
					input[r + 3][c + 3] === 'X')
			) {
				ans += 1;
			}
		}
	}
	// diagonal /
	for (let r = 0; r < input.length - 3; r++) {
		for (let c = 3; c < input[r].length; c++) {
			if (
				(input[r][c] === 'X' &&
					input[r + 1][c - 1] === 'M' &&
					input[r + 2][c - 2] === 'A' &&
					input[r + 3][c - 3] === 'S') ||
				(input[r][c] === 'S' &&
					input[r + 1][c - 1] === 'A' &&
					input[r + 2][c - 2] === 'M' &&
					input[r + 3][c - 3] === 'X')
			) {
				ans += 1;
			}
		}
	}
	return ans;
}

function part2(input: string[]) {
	let ans = 0;
	for (let r = 1; r < input.length - 1; r++) {
		for (let c = 1; c < input[r].length - 1; c++) {
			if (input[r][c] !== 'A') {
				continue;
			}
			if (
				!(
					(input[r - 1][c - 1] === 'M' && input[r + 1][c + 1] === 'S') ||
					(input[r - 1][c - 1] === 'S' && input[r + 1][c + 1] === 'M')
				)
			) {
				continue;
			}
			if (
				!(
					(input[r - 1][c + 1] === 'M' && input[r + 1][c - 1] === 'S') ||
					(input[r - 1][c + 1] === 'S' && input[r + 1][c - 1] === 'M')
				)
			) {
				continue;
			}
			ans += 1;
		}
	}
	return ans;
}

day4();

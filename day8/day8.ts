import * as fs from 'fs';

function day8() {
	const input = fs.readFileSync('./day8.txt').toString().split('\n');
	const positions = getAntennaPosition(input);
	console.log('part 1');
	console.log(part1(input.length, positions));
	console.log('part 2');
	console.log(part2(input.length, positions));
}

function getAntennaPosition(input: string[]) {
	const record: Record<string, [number, number][]> = {};
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (input[r][c] === '.') {
				continue;
			}
			if (!(input[r][c] in record)) {
				record[input[r][c]] = [[r, c]];
			} else {
				record[input[r][c]].push([r, c]);
			}
		}
	}
	return Object.values(record);
}

function getAns(ansMap: boolean[][]) {
	return ansMap.flat().filter(el => el === true).length;
}

function outOfBound(r: number, c: number, size: number) {
	return r < 0 || r >= size || c < 0 || c >= size;
}

function part1(size: number, positions: [number, number][][]) {
	const ansMap: boolean[][] = Array(size)
		.fill(null)
		.map(_ => Array(size).fill(false));

	for (let i = 0; i < positions.length; i++) {
		const value = positions[i];
		for (let j = 0; j < value.length; j++) {
			for (let k = 0; k < value.length; k++) {
				if (j === k) {
					continue;
				}
				const [r1, c1] = value[j];
				const [r2, c2] = value[k];
				const [targetR, targetC] = [r2 * 2 - r1, c2 * 2 - c1];
				if (outOfBound(targetR, targetC, size)) {
					continue;
				}
				ansMap[targetR][targetC] = true;
			}
		}
	}
	return getAns(ansMap);
}

function part2(size: number, positions: [number, number][][]) {
	const ansMap: boolean[][] = Array(size)
		.fill(null)
		.map(_ => Array(size).fill(false));

	for (let i = 0; i < positions.length; i++) {
		const value = positions[i];
		for (let j = 0; j < value.length; j++) {
			for (let k = 0; k < value.length; k++) {
				if (j === k) {
					continue;
				}
				const [r1, c1] = value[j];
				const [r2, c2] = value[k];
				const [dr, dc] = [r2 - r1, c2 - c1];
				let scale = 0;
				while (true) {
					const [exploreR, exploreC] = [r1 + scale * dr, c1 + scale * dc];
					if (outOfBound(exploreR, exploreC, size)) {
						break;
					}
					ansMap[exploreR][exploreC] = true;
					scale += 1;
				}
			}
		}
	}
	return getAns(ansMap);
}

day8();

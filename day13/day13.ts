import * as fs from 'fs';

function day13() {
	const input = fs.readFileSync('./day13.txt').toString().split('\n\n');
	console.log('part 1');
	console.log(getAns(getEquation(input, 'part 1'), 'part 1'));
	console.log('part 2');
	console.log(getAns(getEquation(input, 'part 2'), 'part 2'));
}

function getEquation(input: string[], whichPart: 'part 1' | 'part 2') {
	return input.map(block => {
		const lines = block.split('\n');
		const num1 = lines[0]
			.split(/Button A: X+|, Y+/)
			.slice(1)
			.map(el => Number(el));
		const num2 = lines[1]
			.split(/Button B: X+|, Y+/)
			.slice(1)
			.map(el => Number(el));
		const num3 = lines[2]
			.split(/Prize: X=|, Y=/)
			.slice(1)
			.map(el => Number(el));
		return [
			num1[0],
			num2[0],
			num1[1],
			num2[1],
			...num3.map(num => num + (whichPart === 'part 1' ? 0 : 10000000000000)),
		];
	});
}

function getAns(equations: number[][], whichPart: 'part 1' | 'part 2') {
	let ans = 0;
	for (let i = 0; i < equations.length; i++) {
		const equation = equations[i];
		const matrix = equation.slice(0, 4);
		const determinant = matrix[0] * matrix[3] - matrix[1] * matrix[2];
		if (determinant === 0) {
			throw new Error('determinant === 0');
		}
		const inverseMatrix = [
			matrix[3],
			matrix[1] * -1,
			matrix[2] * -1,
			matrix[0],
		];
		const ansX =
			(inverseMatrix[0] * equation[4] + inverseMatrix[1] * equation[5]) /
			determinant;
		const ansY =
			(inverseMatrix[2] * equation[4] + inverseMatrix[3] * equation[5]) /
			determinant;
		if (
			!Number.isInteger(ansX) ||
			!Number.isInteger(ansY) ||
			ansX < 0 ||
			ansY < 0
		) {
			continue;
		}
		if (whichPart === 'part 1' && (ansX > 100 || ansY > 100)) {
			continue;
		}
		ans += ansX * 3 + ansY;
	}
	return ans;
}

day13();

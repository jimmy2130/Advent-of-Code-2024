import * as fs from 'fs';

function day7() {
	const input = fs.readFileSync('./day7.txt').toString().split('\n');
	console.log('part 1');
	console.log(getAns(input, 'part1'));
	console.log('part 2');
	console.log(getAns(input, 'part2'));
}

function getAns(input: string[], whichPart: 'part1' | 'part2') {
	let ans = 0;
	for (let i = 0; i < input.length; i++) {
		const line = input[i];
		const target = Number(line.split(': ')[0]);
		const equation = line
			.split(': ')[1]
			.split(' ')
			.map(el => Number(el));
		if (evaluate(target, equation.slice(1), equation[0], whichPart)) {
			ans += target;
		}
	}
	return ans;
}

function evaluate(
	target: number,
	equation: number[],
	currentSum: number,
	whichPart: 'part1' | 'part2',
): boolean {
	if (equation.length === 0) {
		return currentSum === target;
	}
	if (currentSum > target) {
		return false;
	}
	const plusResult = evaluate(
		target,
		equation.slice(1),
		currentSum + equation[0],
		whichPart,
	);
	const productResult = evaluate(
		target,
		equation.slice(1),
		currentSum * equation[0],
		whichPart,
	);
	if (whichPart === 'part1') {
		return plusResult || productResult;
	}
	const concatResult = evaluate(
		target,
		equation.slice(1),
		Number(`${currentSum}${equation[0]}`),
		whichPart,
	);
	return plusResult || productResult || concatResult;
}

day7();

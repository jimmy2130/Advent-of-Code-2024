import * as fs from 'fs';

function day1() {
	const input = fs.readFileSync('./day1.txt').toString().split('\n');
	const leftList = input.map(line => Number(line.split('   ')[0])).sort();
	const rightList = input.map(line => Number(line.split('   ')[1])).sort();
	console.log('part 1');
	console.log(part1(leftList, rightList));
	console.log('part 2');
	console.log(part2(leftList, rightList));
	return input;
}

function part1(leftList: number[], rightList: number[]) {
	let ans = 0;
	for (let i = 0; i < leftList.length; i++) {
		const diff = Math.abs(leftList[i] - rightList[i]);
		ans += diff;
	}
	return ans;
}

function part2(leftList: number[], rightList: number[]) {
	let ans = 0;
	for (let i = 0; i < leftList.length; i++) {
		const target = leftList[i];
		let frequency = 0;
		for (let j = 0; j < rightList.length; j++) {
			if (rightList[j] === target) {
				frequency += 1;
			}
		}
		ans += target * frequency;
	}
	return ans;
}

day1();

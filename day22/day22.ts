import * as fs from 'fs';

function day22() {
	const input = fs
		.readFileSync('./day22.txt')
		.toString()
		.split('\n')
		.map(line => Number(line));
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function part1(input: number[]) {
	let ans = 0;
	for (let i = 0; i < input.length; i++) {
		let secretNum = input[i];
		for (let j = 0; j < 2000; j++) {
			secretNum = getAns(secretNum);
		}
		ans += secretNum;
	}
	return ans;
}

function part2(input: number[]) {
	const ansMap = new Map<number, number>();
	for (let i = 0; i < input.length; i++) {
		let secretNum = input[i];
		let price = secretNum % 10;
		const priceArr = Array(2000).fill(0);
		const diffArr = Array(2000).fill(0);
		for (let j = 0; j < 2000; j++) {
			secretNum = getAns(secretNum);
			const newPrice = secretNum % 10;
			priceArr[j] = newPrice;
			diffArr[j] = newPrice - price;
			price = newPrice;
		}
		const record = new Set<number>();
		for (let j = 0; j < diffArr.length - 4; j++) {
			const encodedNum = encode(
				diffArr[j],
				diffArr[j + 1],
				diffArr[j + 2],
				diffArr[j + 3],
			);
			if (record.has(encodedNum)) {
				continue;
			}
			record.add(encodedNum);
			ansMap.set(encodedNum, (ansMap.get(encodedNum) ?? 0) + priceArr[j + 3]);
		}
	}
	let maxValue = 0;
	ansMap.forEach(value => {
		maxValue = Math.max(maxValue, value);
	});
	return maxValue;
}

function getAns(num: number) {
	const step1 = prune(mix(num * 64, num));
	const step2 = prune(mix(Math.floor(step1 / 32), step1));
	const step3 = prune(mix(step2 * 2048, step2));
	return step3;
}

function mix(num1: number, num2: number) {
	const result = BigInt(num1) ^ BigInt(num2);
	return Number(result.toString());
}

function prune(num: number) {
	return num % 16777216;
}

function encode(num1: number, num2: number, num3: number, num4: number) {
	return (
		(num1 + 9) * Math.pow(19, 3) +
		(num2 + 9) * Math.pow(19, 2) +
		(num3 + 9) * Math.pow(19, 1) +
		(num4 + 9)
	);
}

day22();

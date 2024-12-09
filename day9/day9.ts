import * as fs from 'fs';

function day9() {
	const input = fs
		.readFileSync('./day9.txt')
		.toString()
		.split('')
		.map(x => Number(x));
	const size = input.reduce((acc, cur) => acc + cur, 0);
	const memory = getMemory(input, size);
	console.log('part 1');
	console.log(part1(memory));
	console.log('part 2');
	console.log(part2(memory));
}

function getMemory(input: number[], size: number) {
	const memory = Array(size).fill(Infinity);
	let id = 0;
	let pointer = 0;
	for (let i = 0; i < input.length; i++) {
		let length = input[i];
		if (i % 2 === 1) {
			pointer += length;
			continue;
		}
		while (length > 0) {
			memory[pointer] = id;
			pointer += 1;
			length -= 1;
		}
		id += 1;
	}
	return memory;
}

function part1(input: number[]) {
	const memory = [...input];
	let leftPointer = 0;
	let rightPointer = memory.length - 1;
	while (leftPointer < rightPointer) {
		while (memory[leftPointer] !== Infinity) {
			leftPointer += 1;
		}
		while (memory[rightPointer] === Infinity) {
			rightPointer -= 1;
		}
		if (leftPointer >= rightPointer) {
			break;
		}
		memory[leftPointer] = memory[rightPointer];
		memory[rightPointer] = Infinity;
	}
	let checkSum = 0;
	let pointer = 0;
	while (memory[pointer] !== Infinity) {
		checkSum += pointer * memory[pointer];
		pointer += 1;
	}
	return checkSum;
}

function part2(input: number[]) {
	const memory = [...input];
	let r2 = memory.length - 1;
	let r1 = r2;
	while (r1 >= 0 && r2 >= 0) {
		while (memory[r1] === memory[r2]) {
			r1 -= 1;
		}
		const fileLength = r2 - r1;
		let l1 = 0;
		while (l1 < r1) {
			if (memory[l1] !== Infinity) {
				l1 += 1;
				continue;
			}
			let pass = true;
			let l2 = l1;
			while (l2 < l1 + fileLength) {
				if (memory[l2] !== Infinity) {
					pass = false;
					break;
				}
				l2 += 1;
			}
			if (pass) {
				// exchange
				for (let i = l1; i < l2; i++) {
					memory[i] = memory[r2];
				}
				for (let i = r2; i > r1; i--) {
					memory[i] = Infinity;
				}
				break;
			}
			l1 = l2;
		}
		r2 = r1;
		while (memory[r2] === Infinity) {
			r2 -= 1;
		}
		r1 = r2;
	}

	let checkSum = 0;
	for (let i = 0; i < memory.length; i++) {
		if (memory[i] === Infinity) {
			continue;
		}
		checkSum += i * memory[i];
	}
	return checkSum;
}

day9();

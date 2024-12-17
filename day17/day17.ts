import * as fs from 'fs';

function day17() {
	const input = fs.readFileSync('./day17.txt').toString().split('\n\n');
	const registers = getRegisters(input[0]);
	const program = input[1]
		.split(': ')[1]
		.split(',')
		.map(el => Number(el));
	console.log('part 1');
	console.log(part1(registers, program));
	console.log('part 2');
	console.log(part2(program));
}

function getRegisters(input: string) {
	return input.split('\n').map(line => Number(line.split(': ')[1]));
}

function getValueByComboOperand(operand: number, registers: bigint[]) {
	switch (operand) {
		case 0:
		case 1:
		case 2:
		case 3:
			return BigInt(operand);
		case 4:
			return registers[0];
		case 5:
			return registers[1];
		case 6:
			return registers[2];
		case 7:
			throw new Error('invalid operand!');
	}
	return BigInt(0);
}

function getDivision(registers: bigint[], program: number[], pointer: number) {
	const numerator = Number(registers[0].toString());
	const denominator = Math.pow(
		2,
		Number(getValueByComboOperand(program[pointer + 1], registers).toString()),
	);
	return BigInt(Math.floor(numerator / denominator));
}

function part1(inputRegisters: number[], program: number[]) {
	const output: string[] = [];
	const registers = [...inputRegisters].map(x => BigInt(x));
	let pointer = 0;
	while (pointer < program.length) {
		const opcode = program[pointer];
		switch (opcode) {
			case 0: {
				registers[0] = getDivision(registers, program, pointer);
				break;
			}
			case 1: {
				registers[1] = registers[1] ^ BigInt(program[pointer + 1]);
				break;
			}
			case 2: {
				registers[1] =
					getValueByComboOperand(program[pointer + 1], registers) % BigInt(8);
				break;
			}
			case 3: {
				if (registers[0] !== BigInt(0)) {
					pointer = program[pointer + 1] - 2;
				}
				break;
			}
			case 4: {
				registers[1] = registers[1] ^ registers[2];
				break;
			}
			case 5: {
				output.push(
					(
						getValueByComboOperand(program[pointer + 1], registers) % BigInt(8)
					).toString(),
				);
				break;
			}
			case 6: {
				registers[1] = getDivision(registers, program, pointer);
				break;
			}
			case 7: {
				registers[2] = getDivision(registers, program, pointer);
				break;
			}
			default:
				throw new Error('unknown opcode!');
		}

		pointer += 2;
	}
	return output.join(',');
}

function part2(input: number[]) {
	const program = input.slice(0, -2);
	return dfs(program, 0, input, input.length - 1);
}

function dfs(program: number[], ans: number, input: number[], pointer: number) {
	if (pointer === -1) {
		return ans / 8;
	}
	let minAns = Infinity;
	for (let i = 0; i < 8; i++) {
		const result = part1([ans + i, 0, 0], [...program]);
		if (result === input[pointer].toString()) {
			minAns = Math.min(
				minAns,
				dfs(program, (ans + i) * 8, input, pointer - 1),
			);
		}
	}
	return minAns;
}

day17();

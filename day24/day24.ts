import * as fs from 'fs';

function day24() {
	const input = fs.readFileSync('./day24.txt').toString().split('\n\n');
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function getWires(input: string[]) {
	const wires = new Map<string, number>();
	input.forEach(line => {
		const tokens = line.split(': ');
		wires.set(tokens[0], Number(tokens[1]));
	});
	return wires;
}

function getRules(input: string[]) {
	const rules = new Set<string[]>();
	input.forEach(line => {
		const tokens = line.split(' ');
		rules.add([tokens[0], tokens[1], tokens[2], tokens[4]]);
	});
	return rules;
}

function part1(input: string[]) {
	const wires = getWires(input[0].split('\n'));
	const rules = getRules(input[1].split('\n'));
	while (rules.size > 0) {
		rules.forEach(rule => {
			const [wire1, gate, wire2, wire3] = rule;
			if (!wires.has(wire1) || !wires.has(wire2)) {
				return;
			}
			const value1 = wires.get(wire1) ?? 0;
			const value2 = wires.get(wire2) ?? 0;
			let result = 0;
			switch (gate) {
				case 'XOR': {
					result = value1 ^ value2;
					break;
				}
				case 'OR': {
					result = value1 | value2;
					break;
				}
				case 'AND': {
					result = value1 & value2;
					break;
				}
			}
			wires.set(wire3, result);
			rules.delete(rule);
		});
	}
	let ans = 0;
	wires.forEach((value, key) => {
		if (key[0] !== 'z') {
			return;
		}
		ans += value * Math.pow(2, Number(key.slice(1)));
	});
	return ans;
}

function part2(input: string[]) {
	const answers: string[] = [];

	let rules = input[1].split('\n');

	const start1 = rules
		.find(x => x.startsWith(`x01 XOR y01`) || x.startsWith(`y01 XOR x01`))
		?.slice(-3);

	const start2 = rules
		.find(x => x.startsWith(`y00 AND x00`) || x.startsWith(`x00 AND y00`))
		?.slice(-3);

	for (let error = 0; error < 4; error++) {
		let base1 = start1;
		let base2 = start2;
		const printedRules: string[] = [];
		for (let i = 1; i <= 44; i++) {
			const rule = rules.find(
				x =>
					x.startsWith(`${base1} AND ${base2}`) ||
					x.startsWith(`${base2} AND ${base1}`),
			);
			if (rule) {
				printedRules.push(rule);
			} else {
				console.log(printRules(printedRules));
				throw new Error('');
			}

			const rule2 = rules.find(
				x =>
					x.startsWith(
						`x${i.toString().padStart(2, '0')} AND y${i.toString().padStart(2, '0')}`,
					) ||
					x.startsWith(
						`y${i.toString().padStart(2, '0')} AND x${i.toString().padStart(2, '0')}`,
					),
			);
			if (rule2) {
				printedRules.push(rule2);
			} else {
				console.log(printRules(printedRules));
				throw new Error('');
			}

			const mid1 = rule.slice(-3);
			const mid2 = rule2.slice(-3);

			const rule3 = rules.find(
				x =>
					x.startsWith(`${mid1} OR ${mid2}`) ||
					x.startsWith(`${mid2} OR ${mid1}`),
			);
			if (rule3) {
				printedRules.push(rule3);
			} else {
				const supposedSub = mid1.startsWith('z') ? mid2 : mid1;
				const wrongSub = mid1.startsWith('z') ? mid1 : mid2;
				const supposedRule = rules.find(x => {
					const leftSide = x.split(' -> ')[0];
					return leftSide.includes(supposedSub) && leftSide.includes('OR');
				});
				if (!supposedRule) {
					throw new Error('');
				}
				const [corrected1, _, corrected2] = supposedRule.split(' ');
				if (corrected1 === supposedSub) {
					answers.push(wrongSub);
					answers.push(corrected2);
					rules = changeRules(rules, wrongSub, corrected2);
				} else if (corrected2 === supposedSub) {
					answers.push(wrongSub);
					answers.push(corrected1);
					rules = changeRules(rules, wrongSub, corrected1);
				}
				break;
			}

			const rule4 = rules.find(
				x =>
					x.startsWith(
						`x${(i + 1).toString().padStart(2, '0')} XOR y${(i + 1).toString().padStart(2, '0')}`,
					) ||
					x.startsWith(
						`y${(i + 1).toString().padStart(2, '0')} XOR x${(i + 1).toString().padStart(2, '0')}`,
					),
			);
			if (rule4) {
				printedRules.push(rule4);
			} else {
				console.log(printRules(printedRules));
				throw new Error('');
			}

			const mid3 = rule3.slice(-3);
			const mid4 = rule4.slice(-3);

			const rule5 = rules.find(
				x =>
					x.startsWith(`${mid3} XOR ${mid4}`) ||
					x.startsWith(`${mid4} XOR ${mid3}`),
			);
			if (rule5) {
				printedRules.push(rule5);
			} else {
				const supposedRule = rules.find(x =>
					x.endsWith(`z${(i + 1).toString().padStart(2, '0')}`),
				);
				if (!supposedRule) {
					throw new Error('');
				}
				const [corrected1, _, corrected2] = supposedRule.split(' ');
				if (mid3 === corrected1) {
					answers.push(mid4);
					answers.push(corrected2);
					rules = changeRules(rules, mid4, corrected2);
				} else if (mid3 === corrected2) {
					answers.push(mid4);
					answers.push(corrected1);
					rules = changeRules(rules, mid4, corrected1);
				} else if (mid4 === corrected1) {
					answers.push(mid3);
					answers.push(corrected2);
					rules = changeRules(rules, mid3, corrected2);
				} else if (mid4 === corrected2) {
					answers.push(mid3);
					answers.push(corrected1);
					rules = changeRules(rules, mid3, corrected1);
				}
				break;
			}

			base1 = mid3;
			base2 = mid4;
		}
	}

	return answers.sort().join(',');
}

function printRules(rules: string[]) {
	let pointer = 0;
	let result = '';
	while (pointer < rules.length) {
		result += `${rules.slice(pointer, pointer + 5).join('\n')}\n\n`;
		pointer += 5;
	}
	return result;
}

function changeRules(rules: string[], str1: string, str2: string) {
	const newRules = [...rules];
	for (let i = 0; i < newRules.length; i++) {
		const rule = newRules[i];
		if (rule.endsWith(str1)) {
			newRules[i] = `${rule.split(' -> ')[0]} -> ${str2}`;
		} else if (rule.endsWith(str2)) {
			newRules[i] = `${rule.split(' -> ')[0]} -> ${str1}`;
		}
	}
	return newRules;
}

day24();

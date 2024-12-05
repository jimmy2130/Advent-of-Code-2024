import * as fs from 'fs';

function day5() {
	const input = fs.readFileSync('./day5.txt').toString().split('\n\n');
	const rules = input[0].split('\n').map(line => line.split('|'));
	const updates = input[1].split('\n').map(line => line.split(','));
	console.log('part 1');
	console.log(part1(rules, updates));
	console.log('part 2');
	console.log(part2(rules, updates));
}

function part1(rules: string[][], updates: string[][]) {
	let ans = 0;
	for (let i = 0; i < updates.length; i++) {
		const update = updates[i];
		let isValidUpdate = true;
		for (let j = 0; j < rules.length; j++) {
			const [firstNum, secondNum] = rules[j];
			const firstNumIndex = update.indexOf(firstNum);
			const secondNumIndex = update.indexOf(secondNum);
			if (
				firstNumIndex !== -1 &&
				secondNumIndex !== -1 &&
				firstNumIndex > secondNumIndex
			) {
				isValidUpdate = false;
				break;
			}
		}
		if (isValidUpdate) {
			ans += Number(update[Math.floor(update.length / 2)]);
		}
	}
	return ans;
}

function part2(rules: string[][], updates: string[][]) {
	let ans = 0;
	const invalidUpdates: string[][] = [];
	for (let i = 0; i < updates.length; i++) {
		const update = updates[i];
		for (let j = 0; j < rules.length; j++) {
			const [firstNum, secondNum] = rules[j];
			const firstNumIndex = update.indexOf(firstNum);
			const secondNumIndex = update.indexOf(secondNum);
			if (
				firstNumIndex !== -1 &&
				secondNumIndex !== -1 &&
				firstNumIndex > secondNumIndex
			) {
				invalidUpdates.push(update);
				break;
			}
		}
	}

	for (let i = 0; i < invalidUpdates.length; i++) {
		const update = invalidUpdates[i];
		const validRules = rules.filter(([firstNum, secondNum]) => {
			const firstNumIndex = update.indexOf(firstNum);
			const secondNumIndex = update.indexOf(secondNum);
			return firstNumIndex !== -1 && secondNumIndex !== -1;
		});
		let allPass = false;
		while (!allPass) {
			let isOrderWrong = false;
			for (let j = 0; j < validRules.length; j++) {
				const [firstNum, secondNum] = validRules[j];
				const firstNumIndex = update.indexOf(firstNum);
				const secondNumIndex = update.indexOf(secondNum);
				if (
					firstNumIndex !== -1 &&
					secondNumIndex !== -1 &&
					firstNumIndex > secondNumIndex
				) {
					[update[firstNumIndex], update[secondNumIndex]] = [
						update[secondNumIndex],
						update[firstNumIndex],
					];
					isOrderWrong = true;
					break;
				}
			}
			if (!isOrderWrong) {
				allPass = true;
			}
		}
		ans += Number(update[Math.floor(update.length / 2)]);
	}
	return ans;
}

day5();

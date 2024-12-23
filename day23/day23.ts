import * as fs from 'fs';

function day23() {
	const input = fs.readFileSync('./day23.txt').toString().split('\n');
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function getComputers(input: string[]) {
	const computers: string[] = [];
	const record = new Set<string>();
	for (let i = 0; i < input.length; i++) {
		const [item1, item2] = input[i].split('-');
		if (!record.has(item1)) {
			record.add(item1);
			computers.push(item1);
		}
		if (!record.has(item2)) {
			record.add(item2);
			computers.push(item2);
		}
	}
	return computers;
}

function part1(input: string[]) {
	const computers = getComputers(input);
	let ans = 0;
	const record = new Set<string>();
	for (let i = 0; i < computers.length; i++) {
		const computer = computers[i];
		if (computer[0] !== 't') {
			continue;
		}
		const subComputers = input
			.filter(line => {
				const [item1, item2] = line.split('-');
				return item1 === computer || item2 === computer;
			})
			.map(line => {
				const [item1, item2] = line.split('-');
				return computer === item1 ? item2 : item1;
			});
		for (let j = 0; j < subComputers.length - 1; j++) {
			for (let k = j + 1; k < subComputers.length; k++) {
				if (
					input.includes(`${subComputers[j]}-${subComputers[k]}`) ||
					input.includes(`${subComputers[k]}-${subComputers[j]}`)
				) {
					const key = [computer, subComputers[j], subComputers[k]]
						.sort()
						.join('');
					if (!record.has(key)) {
						record.add(key);
						ans += 1;
					}
				}
			}
		}
	}
	return ans;
}

function part2(input: string[]) {
	const record = new Map<string, Set<string>>();
	for (let i = 0; i < input.length; i++) {
		const rule = input[i].split('-').sort();
		const value = record.get(rule[0]) ?? new Set();
		value.add(rule[1]);
		record.set(rule[0], value);
	}
	let maxLength = -1;
	let maxAns = '';
	record.forEach((value, key) => {
		const sortedMember = Array.from(value).sort();
		for (let s = 0; s < sortedMember.length; s++) {
			const newSortedMember = [
				...sortedMember.slice(0, s),
				...sortedMember.slice(s + 1),
			];
			let pass = true;
			for (let i = 0; i < newSortedMember.length - 1; i++) {
				for (let j = i + 1; j < newSortedMember.length; j++) {
					const member1 = newSortedMember[i];
					const member2 = newSortedMember[j];
					if (
						!input.includes(`${member1}-${member2}`) &&
						!input.includes(`${member2}-${member1}`)
					) {
						pass = false;
						break;
					}
				}
				if (pass === false) {
					break;
				}
			}
			if (pass) {
				const ans = `${key},${newSortedMember.join(',')}`;
				if (ans.length > maxLength) {
					maxLength = ans.length;
					maxAns = ans;
				}
			}
		}
	});
	return maxAns;
}

day23();

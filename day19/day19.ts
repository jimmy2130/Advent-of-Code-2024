import * as fs from 'fs';

function day19() {
	const input = fs.readFileSync('./day19.txt').toString().split('\n\n');
	const patterns = input[0].split(', ');
	const towels = input[1].split('\n');
	console.log('part 1');
	console.log(getAns(patterns, towels, 'part 1'));
	console.log('part 2');
	console.log(getAns(patterns, towels, 'part 2'));
}

function getAns(
	patterns: string[],
	towels: string[],
	whichPart: 'part 1' | 'part 2',
) {
	let ans = 0;
	for (let i = 0; i < towels.length; i++) {
		switch (whichPart) {
			case 'part 1': {
				if (dfs(patterns, towels[i], new Map())) {
					ans += 1;
				}
				break;
			}
			case 'part 2': {
				ans += dfs2(patterns, towels[i], new Map());
				break;
			}
		}
	}
	return ans;
}

function dfs(patterns: string[], towel: string, record: Map<string, boolean>) {
	if (towel === '') {
		return true;
	}
	if (record.has(towel)) {
		return record.get(towel) ?? false;
	}
	for (let i = 0; i < patterns.length; i++) {
		const pattern = patterns[i];
		if (
			towel.length >= pattern.length &&
			towel.slice(0, pattern.length) === pattern
		) {
			const result = dfs(patterns, towel.slice(pattern.length), record);
			if (result === true) {
				record.set(towel, true);
				return true;
			}
		}
	}
	record.set(towel, false);
	return false;
}

function dfs2(patterns: string[], towel: string, record: Map<string, number>) {
	if (towel === '') {
		return 1;
	}
	if (record.has(towel)) {
		return record.get(towel) ?? 0;
	}
	let combo = 0;
	for (let i = 0; i < patterns.length; i++) {
		const pattern = patterns[i];
		if (
			towel.length >= pattern.length &&
			towel.slice(0, pattern.length) === pattern
		) {
			combo += dfs2(patterns, towel.slice(pattern.length), record);
		}
	}
	record.set(towel, combo);
	return combo;
}

day19();

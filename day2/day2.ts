import * as fs from 'fs';

function day2() {
	const input = fs
		.readFileSync('./day2.txt')
		.toString()
		.split('\n')
		.map(line => line.split(' ').map(num => Number(num)));
	console.log('part 1');
	console.log(part1(input));
	console.log('part 2');
	console.log(part2(input));
}

function part1(reports: number[][]) {
	let ans = 0;
	for (let i = 0; i < reports.length; i++) {
		const report = reports[i];
		if (isValidReport(report)) {
			ans += 1;
		}
	}
	return ans;
}

function isValidReport(report: number[]) {
	if (report.length === 1) {
		throw new Error('impossible!');
	}
	if (report[0] === report[1]) {
		return false;
	}
	const type = report[0] < report[1] ? 'increasing' : 'decreasing';
	for (let i = 1; i < report.length; i++) {
		if (report[i - 1] <= report[i] && type === 'decreasing') {
			return false;
		}
		if (report[i - 1] >= report[i] && type === 'increasing') {
			return false;
		}
		if (Math.abs(report[i] - report[i - 1]) > 3) {
			return false;
		}
	}
	return true;
}

function part2(reports: number[][]) {
	let ans = 0;
	for (let i = 0; i < reports.length; i++) {
		const report = reports[i];
		if (isValidReport(report)) {
			ans += 1;
		} else {
			for (let j = 0; j < report.length; j++) {
				const newReport = [...report.slice(0, j), ...report.slice(j + 1)];
				if (isValidReport(newReport)) {
					ans += 1;
					break;
				}
			}
		}
	}
	return ans;
}

day2();

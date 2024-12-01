import * as fs from 'fs';

function day2() {
	const input = fs.readFileSync('./day2.txt').toString();
	return input;
}

console.log(day2());

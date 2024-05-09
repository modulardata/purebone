function replaceLastQuarterWithDash(inputString) {
	let cutOff = Math.floor(inputString.length / 1.25);
	return inputString.slice(0, cutOff) + '-'.repeat(inputString.length - cutOff);
}

// Test the function
let testString = 'python';
console.log(replaceLastQuarterWithDash(testString));

export default function scoreMultiplier (hintsLeft, currentScore) {

	let multiplier

	if(hintsLeft === 3) {
		multiplier = 30
	} else if (hintsLeft === 2) {
		multiplier = 6
	} else if (hintsLeft === 1) {
		multiplier = 2
	} else {
		multiplier = 1
	}

	return currentScore + 10 * multiplier
}
import { Box, Button } from "@mui/material"

const PreGameComponent = ({startTheGame, logUserOut}) => {

	return (
		<div id="pre-game-container">
			<Box>
				<h1>Guess the movie!</h1>
				<p>Can you guess which popular movie it is based on the hints you get? Click on the button to start.</p>

				<p>You must select the movie from among the entries in the provided list. You can search for it, but for your answer to be recorded you must select the item in the dropdown menu! Only the English names are available</p>
				<p>For each hint you ask for, your score multiplier will decrease. The genre hint is the first one and it is free! You get no extra points for blindly guessing though. You can also lose one life and give up on the current movie.</p>
				<p>You have 3 lives. If you guess wrong, one life will be taken away. You can regain one life back for guessing it correctly, but you can never have more then 3 lives. The game ends if you guess wrong and have no lives left.</p>

				<div>
					<Button variant="contained" size="medium" onClick={startTheGame}>Start the game!</Button>

					<Button variant="contained" color="error" size="small" onClick={logUserOut}>Log out</Button>
				</div>
			</Box>
		</div>
	)
}

export default PreGameComponent
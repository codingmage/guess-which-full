import { useEffect, useState } from "react"
import "./index.css"
import { LoginComponent } from "./components/LoginComponent"
import PreGameComponent from "./components/PreGameComponent"
import Leaderboards from "./components/Leaderboards"
import loginService from "./services/login"
import userService from "./services/users"
import moviesService from "./services/movies"
import { Autocomplete, Box, Button, TextField } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LoadingIcon from "./components/LoadingIcon"
import InfoModal from "./components/InfoModal"

function App() {
	const [playerScore, setPlayerScore] = useState(0)
	const [user, setUser] = useState(false)
	const [gameStart, setGameStart] = useState(false)
	const [names, setNames] = useState(["loading..."])
	const [round, setRound] = useState(0)
	const [answer, setAnswer] = useState(null)
	const [film, setFilm] = useState({
		genre: "???",
		year: "???",
		director: "???",
		rating: "???",
		firstLetter: "???",
		titleLength: "???",
	})
	const [value, setValue] = useState("")
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setIsLoading] = useState()
	const [lives, setLives] = useState(3)
	const [top10, setTop10] = useState(["Loading..."])
	const [hearts, setHearts] = useState()
	const [showInfo, setShowInfo] = useState(false)


	useEffect(() => {
		setIsLoading(true)
		moviesService.getGame().then(movie => {

			if(movie) {

				const startsWithThe = movie.primary_title.startsWith("(The)")

				const movieTitleStart = startsWithThe ? `The ${movie.primary_title.charAt(4)}` : movie.primary_title.charAt(0)

				setAnswer({
					title: movie.primary_title,
					// adds space after every ","
					genre: movie.genres.replaceAll(",", ", "),
					year: movie.premiered,
					runtime: movie.runtime_minutes,
					rating: movie.rating,
					director: movie.name,
					firstLetter: movieTitleStart,
					titleLength: movie.primary_title.length
				})

				setFilm({
					genre: "???",
					year: "???",
					director: "???",
					rating: "???",
					firstLetter: "???",
					titleLength: "???",
				})

				setValue("")

				setIsLoading(false)

			} else {
				alert("No movies left! Thank you for playing. Refresh the page if you wish to play again.")
			}

		})

	}, [round])

	useEffect(() => { 
		moviesService.getNames().then((names) => {
			const sortedNames = names.sort((a, b) => a.name > b.name)
			const uniqueNames = [...new Set(sortedNames)]
			setNames(uniqueNames)
		})
	}, [])

	useEffect(() => {
		const userIsLoggedInJSON = window.localStorage.getItem("loggedInUser")
		if (userIsLoggedInJSON) {
			const user = JSON.parse(userIsLoggedInJSON)
			userService.setToken(user.token)
			setUser(user)
		}
	}, [])

	useEffect(() => {
		userService.getTop10Users().then((users) => {
			setTop10(users)
		})
	}, [])

	useEffect(() => {
		let currentHearts= []

		for(let i = 0; i < lives; i++) {
			currentHearts.push(<FavoriteIcon color="error" key={i} fontSize="small" />)
		}
		
		setHearts(currentHearts)
	}, [lives])

	async function handleHints () {
		if (film.genre === "???") {
			setFilm({...film, genre: answer.genre})
		} else if(film.year === "???") {
			setFilm({...film, year: answer.year})
		} else if (film.director === "???") {
			setFilm({...film, director: answer.director})
		} else if (film.rating === "???") {
			setFilm({...film, rating: answer.rating})
		} else if (film.firstLetter === "???") {
			setFilm({...film, firstLetter: answer.firstLetter})
		} else if(film.titleLength === "???") {
			setFilm({...film, titleLength: answer.titleLength})
		}

	}

	function scoreCalculator () {
		if(film.year === "???") {
			const score = playerScore + 10 * 10
			setPlayerScore(score)
		} else if (film.director === "???") {
			const score = playerScore + 10 * 8
			setPlayerScore(score)
		} else if (film.rating === "???") {
			const score = playerScore + 10 * 6
			setPlayerScore(score)
		} else if(film.firstLetter === "???") {
			const score = playerScore + 10 * 4
			setPlayerScore(score)
		} else if (film.titleLength === "???") {
			const score = playerScore + 10 * 2
			setPlayerScore(score)
		} else {
			const score = playerScore + 10
			setPlayerScore(score)
		}
	}

	async function userLogin(userCredentials) {
		try {
			setIsLoading(true)
			const user = await loginService.login(userCredentials)
			userService.setToken(user.token)
			setUser(user)
			setIsLoading(false)
			window.localStorage.setItem("loggedInUser", JSON.stringify(user))
		} catch (error) {
			window.alert("Wrong username or password")
			setIsLoading(false)
			console.log(error)
		}
	}

	async function userRegister(userCredentials) {
		try {
			await userService.registerUser(userCredentials)
			window.alert("User created! Click ok and you will login shortly.")
			const user = await loginService.login(userCredentials)
			userService.setToken(user.token)
			setUser(user)
			window.localStorage.setItem("loggedInUser", JSON.stringify(user))
		} catch (error) {
			if(error.response.status === 400) {
				alert("Invalid username. Please choose another.")
			}
		}
	}

	async function lifeLoss() {
		const loseLife = lives - 1
		if(loseLife === 0) {
			alert(`You're out of lives! Your final score was ${playerScore}. Thanks for playing.`)
			await userService.updateUserScore(user.id, playerScore)
			setGameStart(false)
			setPlayerScore(0)
			setLives(3)
			setRound(0)
		} else {
			setLives(loseLife)
		}
	}

	async function handleGuess() {
		if(value === answer.title)
		{
			alert("Correct!")
			scoreCalculator()
			const nextRound = round + 1
			setRound(nextRound)
			setValue("")
			if(lives < 3) {
				const newLife = lives + 1
				setLives(newLife)
			}
		} else {
			alert("Incorrect!")
			lifeLoss()
		}
	}

	function handleGameStart() {
		setGameStart(true)
		setRound(1)
	}

	function handleRestart() {
		setRound(0)
		setPlayerScore(0)
		setLives(3)
		setGameStart(false)
	}

	function handleLogout() {
		window.localStorage.clear()
		setUser(null)
		window.location.reload()
	}

	function handleGivingUp() {
		alert(`The film was ${answer.title}!`)
		lifeLoss()
		if(lives > 0) {
			const nextRound = round + 1
			setRound(nextRound)
		}
	}

	function handleClose() {
		setShowInfo(false)
	}

	if (!user) {
		return <LoginComponent loginUser={userLogin} registerUser={userRegister} extraLoading={isLoading} />
	}
	
	if (!gameStart) {
		return <PreGameComponent startTheGame={handleGameStart} logUserOut={handleLogout} />
	}

	return (
		<div id="home-container" >
			<div id="main-container">
				<h1>Round {round}</h1>
				
				<Box>

					{isLoading? 
						<LoadingIcon />
						: 
						<div id="game-container"> 					
							
							<div>
								<span id="game-state" >Lives: {hearts}</span>
							</div>
			
							<ul id="hints">
								<li>Genre: {film.genre}</li>
								<li>Year: {film.year}</li>
								<li>Director: {film.director}</li>
								<li>Movie Rating: {film.rating}</li>
								<li>First letter: {film.firstLetter}</li>
								<li>Title length: {film.titleLength}</li>
							</ul>
							<div>
								<Autocomplete 
									options={names.sort()}
									onChange={(event, newValue) => {
										setValue(newValue)
									}}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue)
									}}
									/* fullWidth */
									disablePortal
									id="combo-box-demo"
									sx={{ width: 300 }}
									renderInput={(params) => <TextField {...params}     sx={{
										borderRadius: "0.5rem",
										"& fieldset": { borderRadius: "0.5rem" },
									}} size="small" placeholder="Movie" />}
			
								/>
							</div>
							<span className="button-container">
								<Button onClick={handleGuess} size="small" variant="contained" disabled={isLoading}>Guess</Button>
								<Button onClick={handleHints} size="small" variant="contained"  disabled={isLoading}>Hint</Button>
								<Button onClick={handleGivingUp} size="small" variant="contained"  disabled={isLoading}>Give up?</Button>
							</span>

							<div>Current guess: {value}</div>

							<div>Current score: {playerScore}</div>

							<div>
								<Button variant="contained" size="small" onClick={handleRestart} disabled={isLoading} >Restart the game</Button>
							</div>
						</div>
					}

				</Box>
				
			</div>

			<div id="extra-content">
				<Leaderboards users={top10} />

				<div className="button-container">
					<Button color="info" variant="contained" size="small" id="info-button" onClick={() => {setShowInfo(true)}}>info</Button>
					<Button color="error" variant="contained" size="small" onClick={handleLogout}>Logout</Button>
				</div>

				<InfoModal closeInfo={handleClose} info={showInfo}  />
			</div>

			
		</div>
	)
}

export default App

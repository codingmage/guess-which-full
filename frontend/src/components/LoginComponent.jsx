import { useState } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"

export function LoginComponent ({ loginUser, registerUser, extraLoading }) {

	const [open, setOpen] = useState(false)
	const [registerUsername, setRegisterUsername] = useState("")
	const [registerPassword, setRegisterPassword] = useState("")
	const [loginUsername, setLoginUsername] = useState("")
	const [loginPassword, setLoginPassword] = useState("")

	function handleOpen (event) {
		event.preventDefault()
		setOpen(true)
	}

	function handleClose (event) {
		event.preventDefault()
		setOpen(false)
	}

	async function handleLogin(event) {
		event.preventDefault()
		await loginUser({ username: loginUsername, password: loginPassword })
		setLoginUsername("")
		setLoginPassword("")
	}

	async function handleRegister(event) {
		event.preventDefault()
		await registerUser({ username: registerUsername, password: registerPassword })
		setRegisterUsername("")
		setRegisterPassword("")
	}


	return (
		<div id="login-box">
			<div id="login-content">
				<h2>Greetings!</h2>
				<h3>Please login or register to continue.</h3>
				<form id="login-form" onSubmit={handleLogin}>
					<div>
						<label>Username </label> <input onChange={({ target }) => setLoginUsername(target.value) } type="text" /> 
					</div>
					<div>
						<label>Password </label> <input onChange={({ target }) => setLoginPassword(target.value) } type="password" />
					</div>

					<div className="button-container">
						<Button variant="contained" size="small" id="login-button" disabled={extraLoading} onClick={handleLogin} type="submit">Login</Button>
						<Button id="register-button" variant="contained" size="small" color="secondary" disabled={extraLoading} onClick={handleOpen}>Register</Button>
					</div>

					
				</form>

				{extraLoading ? <h3>Loading...</h3> : ""}

				<Modal 
					open={open} 
					onClose={handleClose}         
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					sx={{display: "flex", justifyContent: "center", alignItems: "center" }}
				>
					<Box 
						sx={{
							display: "flex",
							alignItems: "center",	
							justifyContent: "center",				
							flexDirection: "column",
							gap: "1rem",
							backgroundColor: "black"
						}}
						component="form"
						onSubmit={handleRegister}

					>	<h3>Both must be at least 3 characters long!</h3>
						<div>
							<label>Username </label> <input onChange={({ target }) => setRegisterUsername(target.value) }type="text" /> 
						</div>
						<div>
							<label>Password </label> <input onChange={({ target }) => setRegisterPassword(target.value) } type="password" />
						</div>
						<Button variant="contained" id="register-button" type="submit">Register</Button>

					</Box>
				</Modal>
				<span>Note: You only need an username and a password to create an account!</span>	
			</div>
		</div>
	)
    
}
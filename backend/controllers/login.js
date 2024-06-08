const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./db/users.db');

loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body

	const user = await new Promise((resolve, reject) => {
		if(!username || !password) {
			reject("Username and password are required")
		}

		db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
  			if(err){
				reject(err)
			}
 			if(!row){
				reject(err)
			}
			resolve(row)
		})
	})

/*  	if(!user) {
		return response.status(404).json("User not found")
	} */

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.password)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password"
		})
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	}

	// for the purposes of this project, a secret will be given so others can access the application since it won't be deployed as a full site
	
	// const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

	const token = jwt.sign(userForToken, "cs50")

	response
		.status(200)
		.send({ token, username: user.username, id: user.id })
})

module.exports = loginRouter
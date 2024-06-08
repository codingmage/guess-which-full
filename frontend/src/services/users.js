import axios from "axios"
const baseUrl = "http://localhost:3001/api/users"

let token = null

function setToken (newToken) {
	token = `Bearer ${newToken}`
}

async function registerUser (credentials) {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

async function getTop10Users () {
	const request = await axios.get(baseUrl)
	return request.data
	/* return request.then((response) => response.data) */
}

async function updateUserScore (id, score) {
	const config = {
		headers: { Authorization: token },
	}
	
	const request = await axios.put(`${baseUrl}/${id}`, {highScore: score}, config)
	return request.data

}

export default { getTop10Users, setToken, registerUser, updateUserScore }

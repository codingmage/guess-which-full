import axios from "axios"
const baseUrl = "http://localhost:3001/api/movies/"

async function getGame () {
	const response = await axios.get(`${baseUrl}/game`)
	return response.data
}

async function getNames () {
	const response = await axios.get(`${baseUrl}/names`)
	return response.data
}

export default { getGame, getNames }

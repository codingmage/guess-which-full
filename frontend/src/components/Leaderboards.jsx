import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Leaderboards = ({users}) => {

	return (
		<div id="leaderboard-container">
			<h3>Top 5 scores</h3>

			<TableContainer sx={{ backgroundColor: "#215d91", border: "1px solid black"}} component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={{color: "darkseagreen"}}>User</TableCell>
							<TableCell sx={{color: "darkseagreen"}}>Score</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell sx={{color: "white"}}>{user.username}</TableCell>
								<TableCell sx={{color: "white"}}>{user.score}</TableCell> 
							</TableRow>
						))}
					</TableBody>
				</Table>

			</TableContainer>
			{/* 
			<ul>
				{users.map(user => (
					<li key={user.id}>{user.username} - {user.score}</li>
				))}
			</ul> */}
		</div>
	)
}

export default Leaderboards
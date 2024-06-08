import { Box, Modal } from "@mui/material"

export default function InfoModal({info, closeInfo}) {
	return (
		<Modal 
			open={info} 
			onClose={closeInfo}         
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
				component="div"
			>
				<p>This app was made for CS50 as the Final Project. It was made using React.js, Node.js and SQLite.</p>

				<p>Movie information courtesy of <a href="https://www.imdb.com">IMDb</a>. Used with permission.</p>

				<p>The dataset of movies was taken from IMDb on 09/10/2023. The SQL database was created using <a href="https://github.com/jojje/imdb-sqlite"> imdb-sqlite</a>.</p>

				<p> You can access the repository of this project on <a href="https://github.com/codingmage/guess-which">Github</a>.</p>
			</Box>
		</Modal>
	)
}
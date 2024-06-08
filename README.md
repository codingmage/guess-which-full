# Guess which!

#### Video Demo:

    https://www.youtube.com/watch?v=fB3Ha-FOOhE

#### Description:

    React-based guessing game app, involving IMDb's top 1000 most popular films (at the time of creation).

You can start the app by navigating to the "frontend" and to the "backend" folders and running `npm run dev` (after running `npm install`) on both!

An upgrade of my [CS50x project](https://github.com/codingmage/guess-which). It will feature the below mentioned movie guessing game, but will also feature a Pokémon guessing game using the Pokémon API.

________________________________________________________________________________________________

Inspired by the SQL week, a React app that simulates a guessing game, based on a selection of the most popular IMDB movies at the time of the database download [09/10/2023]. The data files were downloaded directly from the [IMDB site](https://datasets.imdbws.com) and the SQL database was created using jojie's [imdb-sqlite](https://github.com/jojjeimdb-sqlite) which converted the specific files I needed. I then trimmed the database with SQL queries to only use the top 1000 films (at the time).

It uses React's state management to handle the game's states as that seemed the most fitting. The app selects a random entry from the film database using an SQL query. The details that are used are the name, genre, year, director, movie rating, first letter and the title's length. Only the primary English titles are used and allowed.

As the user asks for hints, hidden details are revealed. The user gets less points for each information revealed. You can keep playing until you run out of lives (presented as hearts). If the user runs out of lives during the course of a run, they get a game over and their current score is saved if it's higher than their previous one. You lose one life by guessing incorrectly or giving up, and can regain life (up to 3) if you guess it correctly. The app checks for correct guesses by comparing the accepted answer's name with the fecthed movie's name.

There's a leaderboard to save the highest scores (and the user who got them). The user (and the scores) are saved in a separate, simple SQLite database. I considered making a separate table for scores, but since I only care about 1 score per user I decided to just have that be a column in the user table. If I ever decide to expand the project, like, say, adding a new type of guessing game that does not involve movies, I'd consider making a table for keeping the scores and refering to the user who has it.

I studied [fullstackopen](https://fullstackopen.com/en/)'s parts 4-5 in regards to the backend part, while also taking notes from parts 1-7 for React's frontend. I used its backend chapter and user handling as a basis for this app, merging what I had learned with CS50's own lessons. The middleware used is also a part of that course's exercise, as well as the way the frontend interacts with the backend. The SQLite3 interaction with NodeJS was taken from SQLite's own [tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/).

Movie information courtesy of [IMDb](https://www.imdb.com). Used with permission.

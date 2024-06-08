const moviesRouter = require("express").Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db/imdb.db', sqlite3.OPEN_READONLY, (err) => {
    if(err) {
        console.log(err)
    }
    console.log("Connected to imdb database")
})

const usedIds = []

moviesRouter.get('/game', async (request, response) => {

    let query

    if (usedIds.length === 0) {
        query = "SELECT titles.title_id, titles.primary_title, titles.premiered, titles.genres, titles.runtime_minutes, ratings.rating, people.name FROM titles JOIN ratings ON titles.title_id = ratings.title_id JOIN crew ON titles.title_id = crew.title_id JOIN people WHERE people.person_id IN (crew.person_id) AND crew.category = 'director' ORDER BY RANDOM() LIMIT 1;"
    } else {
        /* query = "SELECT * FROM titles WHERE title_id NOT IN ( " + usedIds.map(() => "?").join(',') + " ) ORDER BY RANDOM() LIMIT 1;" */
        query = "SELECT titles.title_id, titles.primary_title, titles.premiered, titles.genres, titles.runtime_minutes, ratings.rating, people.name FROM titles JOIN ratings ON titles.title_id = ratings.title_id JOIN crew ON titles.title_id = crew.title_id JOIN people WHERE people.person_id IN (crew.person_id) AND crew.category = 'director' AND titles.title_id NOT IN ( " + usedIds.map(() => "?").join(',') + " ) ORDER BY RANDOM() LIMIT 1;"
    }

    // https://stackoverflow.com/questions/34349199/node-js-sqlite3-in-operator

    const chosenMovie = await new Promise((resolve, reject) => {
        db.get(query, usedIds, (err, row) => {
            if (err) {
                reject(err);
            }
    
            return row
                ? (usedIds.push(row.title_id), resolve(row))
                : (console.log("There was a problem getting the movie."), reject(err))
        })
    })
    
    response.json(chosenMovie)
})

moviesRouter.get('/names', async (request, response) => {

    let names = []

    const query = "SELECT primary_title FROM titles"

    await new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
    
            rows.forEach((row) => {
                names.push(row.primary_title)
            })
            resolve()
        })
    })

    response.json(names)
    
})

module.exports = moviesRouter
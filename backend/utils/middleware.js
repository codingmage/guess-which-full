const jwt = require('jsonwebtoken')
const sqlite3 = require('sqlite3')

const getToken = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const getUser = async (request, response, next) => {

    if (request.method === 'PUT') {
        const verifiedToken = jwt.verify(request.token, "cs50")

        let db = new sqlite3.Database('./db/users.db');

        if (verifiedToken) {
            if (!verifiedToken.id) {
                return response.status(401).json({ error: 'token invalid' })
            }
            const thisUser = await new Promise((resolve, reject) => {
                db.get("SELECT * FROM users WHERE id = ?", verifiedToken.id, (err, row) => {
                    if(err) {
                        reject(err)
                    }
                    resolve(row)
                })
            })
            request.user = thisUser
        }

        db.close()
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    console.log(error.name)

    next(error)
}

module.exports = {
    getUser,
    getToken,
    errorHandler,
}

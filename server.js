const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db_access = require('./Db.js')
const db = db_access.db
const cookieParser = require('cookie-parser');
const server = express()
const hostname = '127.0.0.1'
const port = 5000
const secret_key = 'DdsdsdKKFDDFDdvfddvxvc4dsdvdsvdb'


server.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))


server.use(express.json())

server.use(cookieParser())

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' })
}
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token)
        return res.status(401).send('unauthorized')
    jwt.verify(token, secret_key, (err, details) => {
        if (err)
            return res.status(403).send('invalid or expired token')
        req.userDetails = details

        next()
    })
}

server.post('/user/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.get(`SELECT * FROM USER WHERE EMAIL=?  `, [email], (err, row) => {
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                return res.status(500).send('error comparing password.')
            }
            if (!isMatch) {
                return res.status(401).send('invalid credentials')
            }
            else {
                let userID = row.ID
                let isAdmin = row.ISADMIN
                const token = generateToken(row.ID, row.ISADMIN)

                res.cookie('authToken', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure:true,
                    maxAge: 3600000
                })
                return res.status(200).json({ id: row.ID, admin: row.ISADMIN, name: row.NAME})
            }
        })
    })
})

server.post(`/user/register`, (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const isadmin = 0;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('error hashing password')
        }
        db.run(`INSERT INTO USER (name,email,password,isadmin) VALUES (?,?,?,?)`, [name, email, hashedPassword, isadmin], (err) => {
            if (err) {

                return res.status(401).send(err)
            }
            else
                return res.status(200).send(`registration successfull`)
        })
    })
})


server.post(`/recipes/addrecipe`, verifyToken, (req, res) => {
    const isAdmin = req.userDetails.isAdmin;
    if (isAdmin !== 1)
        return res.status(403).send("you are not an admin")
    const title = req.body.title
    const ingredients = req.body.ingredients
    const instructions = req.body.instructions
    let query = `INSERT INTO RECIPE (TITLE,INGREDIENTS,INSTRUCTIONS) VALUES
    (?,?,?)`
    db.run(query, [title, , ingredients, instructions ], (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(`recipe added successfully`)
        }
    })

})

server.get(`/recipes`, verifyToken, (req, res) => {
    const isAdmin = req.userDetails.isAdmin;
    if (isAdmin !== 1)
        return res.status(403).send("you are not an admin")
    const query = `SELECT * FROM RECIPES`
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.json(rows)
        }
    })
})

server.get(`/recipes/search/:id`, (req, res) => {
    const query = `SELECT * FROM RECIPES WHERE ID=${req.params.id}`
    db.get(query, (err, row) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else if (!row)
            return res.send(`recipe with id ${req.params.id} not found`)
        else
            return res.send(row)
    })
})

server.put(`/recipes/edit/:id/:quantity`, verifyToken, (req, res) => {
    const isAdmin = req.userDetails.isAdmin;
    if (isAdmin !== 1)
        return res.status(403).send("you are not an admin")
    const query = `UPDATE RECIPES SET QUANTITY=${parseInt(req.params.quantity, 10)}
    WHERE ID=${req.params.id}`

    db.run(query, (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(`recipe updated successfully`)
        }
    })
})

server.get(`/recipes/search`, (req, res) => {
    let title = req.query.title
    let query = `SELECT * FROM RECIPES WHERE 1=1`
    if (title)
        query += ` AND TITLE='${title}'`

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.json(rows)
        }
    })

})

/*
server.put(`/book`, verifyToken, (req, res) => {
   const isAdmin = req.userDetails.isAdmin;
    if (isAdmin !== 1)
        return res.status(403).send("you are not an admin")
    let home = req.query.home
    let away = req.query.away
    let date = req.query.date
    let query = `SELECT * FROM FLIGHT WHERE HOME='${home}'
    AND AWAY='${away}' AND DATE='${date}'`

    db.get(query, (err, row) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {

            let flightID = row.ID
            let userID = req.body.userID
            let query2 = `INSERT INTO BOOKING (USER_ID,FLIGHT_ID) VALUES (${parseInt(userID, 10)},${flightID})`
            console.log(query2)
            db.run(query2, (err) => {
                if (err) {
                    console.log(err)
                    return res.send(err)
                }
                else {

                    let quantity = parseInt(row.QUANTITY, 10)
                    quantity = quantity - 1
                    query = `UPDATE FLIGHT SET QUANTITY=${quantity} WHERE ID=${flightID}`
                    console.log(query)
                    db.run(query, (err) => {
                        if (err) {
                            console.log(err)
                            return res.send(err)
                        }
                        else
                            res.send(`booked successfully`)
                    })
                }

            })
        }
    }
    )
})
*/

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    db.serialize(() => {
        db.run(db_access.createUserTable, (err) => {
            if (err)
                console.log("error creating user table " + err)
        });
        db.run(db_access.createRecipeTable, (err) => {
            if (err)
                console.log("error creating recipe table " + err)
        });
    })
});

setInterval (()=> {
   console.log('heartbeat: server is still running...');

}, 2500);
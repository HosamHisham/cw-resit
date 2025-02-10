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
    credentials: true
}))


server.use(express.json())

server.use(cookieParser())

const generateToken = (userID, isAdmin) => {
    return jwt.sign({ id: userID, isAdmin: isAdmin }, secret_key, { expiresIn: '1h' })
}
const verifyToken = (req, res, next) => {
    console.log("cookies recieved:", req.cookies);
    const token = req.cookies.authToken
    if (!token)
        return res.status(401).send('unauthorized: no token');

    jwt.verify(token, secret_key, (err, details) => {
        if (err)
            return res.status(403).send('invalid or expired token')
        req.userDetails = details

        next();
    });
};

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
                const token = generateToken(userID, isAdmin)

                res.cookie('authToken', token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure:false,
                    maxAge: 3600000
                })
                return res.status(200).json({ id: userID, admin: isAdmin, name: row.NAME})
            }
        })
    })
})

server.post(`/user/register`, (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const isadmin = req.body.isAdmin || 0;
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
    const description = req.body.description
    db.run(`INSERT INTO RECIPES (title, ingredients, description) VALUES
    (?,?,?)`, [title, ingredients, description ], (err) => {
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
    /*const isAdmin = req.userDetails.isAdmin;
    if (isAdmin !== 1)
        return res.status(403).send("you are not an admin")*/
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
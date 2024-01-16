const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' })
  }
  // bearer token
  const token = authorization.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded
    next()
  })
}

app.post('/jwt', (req, res) => {
  const user = req.body
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  })

  res.send({ token })
})

const usersModel = require('./model/users_information/users')
app.post('/createUsers',  usersModel.createUsers);
app.get('/getUsers',  usersModel.getUsers);


app.get('/', (req, res) => {
  res.send('Server running...')
})

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})





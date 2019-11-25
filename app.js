const express = require('express')
const helpers = require('./_helpers')

const app = express()
const port = 3000

// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

<<<<<<< HEAD
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!!!`))
=======
app.get('/', (req, res) => res.send('Hello World!!!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
>>>>>>> c03a2589d2b821d6bc9e96aa4c7ca335ed6a7a50

module.exports = app

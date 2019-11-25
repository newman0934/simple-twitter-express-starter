const express = require('express')
const helpers = require('./_helpers')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000

app.set('view engine', 'handlebars')
app.engine(
  'handlebars',
  handlebars({
    defaultLayout: 'main'
  })
)

// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('./routes')(app)

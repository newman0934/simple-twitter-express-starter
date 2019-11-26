const express = require('express')
const helpers = require('./_helpers')
const handlebars = require('express-handlebars')
const passport = require("./config/passport")
const flash = require("connect-flash")
const session = require("express-session")
const app = express()
const port = 3000

app.set('view engine', 'handlebars')
app.engine(
  'handlebars',
  handlebars({
    defaultLayout: 'main'
  })
)

app.use(session({secret:"secret", resave:"false",saveUninitialized:"false"}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success_messages")
  res.locals.error_messages = req.flash("error_messages")
  next()
})

// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('./routes')(app, passport)

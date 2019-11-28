const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const User = db.User
const Tweet = db.Tweet
const Reply = db.Reply

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, username, password, cb) => {
      User.findOne({ where: { email: username } }).then(user => {
        if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
        if (!bcrypt.compareSync(password, user.password)) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
        //include user data in session
        req.session.user = user
        return cb(null, user)
      });
    }
  )
);


passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    include: [
      { model: Tweet, include: [Reply] },
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }
    ]
  }).then(user => {
    return cb(null, user)
  })
})

module.exports = passport
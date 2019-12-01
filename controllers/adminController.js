const db = require('../models')
const Tweet = db.Tweet
const User = db.User

const adminController = {
  getTweets: (req, res) => {
    return Tweet.findAll({include: [User]}).then(tweets => {
      console.log(tweets)
      return res.render('admin/tweets', { tweets })
    })
  },

  deleteTweet: (req, res) => {
    return Tweet.findByPk(req.params.id).then(tweet => {
      tweet.destroy().then(tweet => {
        res.redirect('/admin/tweets')
      })
    })
  },

  getUsers: (req, res) => {
    return User.findAll().then(users => {
      return res.render('admin/users', { users })
    })
  }
}

module.exports = adminController

const db = require('../models')
const Tweet = db.Tweet
const Reply = db.Reply
const User = db.User

const tweetController = {
  getTweets: (req, res) => {
    return Tweet.findAll({ include: [Reply, User] }).then(tweets => {
      return res.render('tweets', { tweets })
    })
  },
  postTweets: (req, res) => {
    if (!req.body.description) {
      req.flash('error_messages', 'must input description')
      return res.redirect('/tweets')
    }
    if (req.body.description.length > 140) return 'description is > 140'
    console.log(req.user)
    return Tweet.create({
      description: req.body.description,
      UserId: req.user.id
    }).then(tweet => {
      res.redirect('/tweets')
    })
  }
}

module.exports = tweetController

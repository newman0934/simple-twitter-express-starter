const db = require('../models')
const Tweet = db.Tweet
const Reply = db.Reply
const User = db.User
const Like = db.Like
const helpers = require('../_helpers')

const tweetController = {
  getTweets: (req, res) => {
    return Tweet.findAll({ include: [Reply, User, Like] }).then(tweets => {
      tweets.map(tweet => {
        tweet.Likes.map(like => {
          if (+like.UserId === +req.user.id) return (tweet.likedByUser = true)
        })
      })
      return res.render('tweets', { tweets })
    })
  },
  postTweets: (req, res) => {
    if (!req.body.description) {
      req.flash('error_messages', 'must input description')
      return res.redirect('/tweets')
    }
    if (req.body.description.length > 140) return 'description is > 140'
    return Tweet.create({
      description: req.body.description,
      UserId: helpers.getUser(req).id
    }).then(tweet => {
      res.redirect('/tweets')
    })
  }
}

module.exports = tweetController

const db = require('../models')
const Tweet = db.Tweet

const tweetController = {
  getTweets: (req, res) => {
    return Tweet.findAll().then(tweets => {
      return res.render('tweets', { tweets })
    })
  },
  postTweets: (req, res) => {
    if (!req.body.description) {
      console.error('must input description')
      return res.redirect('/tweets')
    }
    return Tweet.create({
      description: req.body.description
    }).then(tweet => {
      res.redirect('/tweets')
    })
  }
}

module.exports = tweetController

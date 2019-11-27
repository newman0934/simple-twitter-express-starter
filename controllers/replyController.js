const db = require('../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply

const replyController = {
  getTweetReply: (req, res) => {
    return Tweet.findByPk(req.params.tweet_id, { include: [Reply, User] }).then(
      tweet => {
        const replies = tweet.Replies
        const tweetUser = tweet.User
        return res.render('replies', { tweet, replies, tweetUser })
      }
    )
  },

  postTweetReply: (req, res) => {
    if (!req.body.comment) {
      console.error('must input comment')
      return res.redirect('back')
    }
    return Reply.create({
      comment: req.body.comment,
      TweetId: req.params.tweet_id
    }).then(reply => {
      res.redirect('back')
    })
  }
}

module.exports = replyController

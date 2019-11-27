const db = require('../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply

const replyController = {
  getTweetReplies: (req, res) => {
    return Tweet.findByPk(req.params.tweet_id, { include: Reply }).then(
      tweet => {
        const replies = tweet.Replies
        return res.render('replies', { tweet, replies })
      }
    )
  }
}

module.exports = replyController

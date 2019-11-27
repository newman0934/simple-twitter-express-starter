const db = require('../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply

const replyController = {
  getTweetReplies: (req, res) => {
    return Tweet.findByPk(req.params.tweet_id, { include: [Reply, User] }).then(
      tweet => {
        console.log(tweet)
        const replies = tweet.Replies
        const tweetUser = tweet.User
        return res.render('replies', { tweet, replies, tweetUser })
      }
    )
  }
}

module.exports = replyController

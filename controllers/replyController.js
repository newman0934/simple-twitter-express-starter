const db = require('../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply

const replyController = {
  getTweetReply: (req, res) => {
    return Tweet.findByPk(req.params.tweet_id, {
      include: [
        { model: Reply, include: [User] },
        {
          model: User,
          include: [
            Tweet,
            { model: User, as: 'Followers' },
            { model: User, as: 'Followings' }
          ]
        }
      ]
    }).then(tweet => {
      const replies = tweet.Replies
      const tweetUser = tweet.User
      const currentUser = req.user
      const isFollowed = tweetUser.Followers.map(d => d.id).includes(
        currentUser.id
      )
      console.log(isFollowed)
      return res.render('replies', {
        tweet,
        replies,
        tweetUser,
        currentUser,
        isFollowed
      })
    })
  },

  postTweetReply: (req, res) => {
    if (!req.body.comment) {
      console.error('must input comment')
      return res.redirect('back')
    }
    return Reply.create({
      comment: req.body.comment,
      UserId: req.user.id,
      TweetId: req.params.tweet_id
    }).then(reply => {
      res.redirect('back')
    })
  }
}

module.exports = replyController

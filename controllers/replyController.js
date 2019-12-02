const db = require('../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Like = db.Like

const _helpers = require('../_helpers')

const replyController = {
  getTweetReply: (req, res) => {
    return Tweet.findByPk(req.params.tweet_id, {
      include: [
        Like,
        { model: Reply, include: [User] },
        {
          model: User,
          include: [
            Like,
            Tweet,
            { model: User, as: 'Followers' },
            { model: User, as: 'Followings' }
          ]
        }
      ]
    }).then(tweet => {
      const replies = tweet.Replies
      const tweetUser = tweet.User
      const currentUser = _helpers.getUser(req)
      const isFollowed = tweetUser.Followers.map(d => d.id).includes(
        currentUser.id
      )
      const likedByUser = tweet.Likes.map(like => like.UserId).includes(
        currentUser.id
      )
      return res.render('replies', {
        tweet,
        replies,
        tweetUser,
        currentUser,
        isFollowed,
        likedByUser
      })
    })
  },

  postTweetReply: (req, res) => {
    if (!req.body.comment) {
      console.error('must input comment')
      return res.redirect('back')
    }
    return Reply.create({
      UserId: _helpers.getUser(req).id,
      TweetId: req.params.tweet_id,
      comment: req.body.comment
    }).then(reply => {
      res.redirect('back')
    })
  }
}

module.exports = replyController

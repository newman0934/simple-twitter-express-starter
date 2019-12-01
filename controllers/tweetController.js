const db = require('../models')
const Tweet = db.Tweet
const Reply = db.Reply
const User = db.User
const Like = db.Like
const helpers = require('../_helpers')

const tweetController = {
  getTweets: async (req, res) => {
    // 取得 /tweets 右半邊資料
    let sortedUserList = []
    await User.findAll({ include: { model: User, as: 'Followers' } }).then(
      users => {
        users.sort((a, b) => {
          return b.Followers.length - a.Followers.length
        })
        // 迭代 user.Followers，若包含登入者則回傳 user.isFollowed = true
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < users[i].Followers.length; j++) {
            if (users[i].Followers[j].id === req.user.id) {
              users[i].isFollowed = true
            }
          }
        }
        sortedUserList = users.slice(0, 10)
      }
    )
    // 取得 /tweets 左半邊資料並渲染
    return Tweet.findAll({
      include: [Reply, User, Like],
      order: [['createdAt', 'DESC']]
    }).then(tweets => {
      tweets.map(tweet => {
        tweet.Likes.map(like => {
          if (+like.UserId === +req.user.id) return (tweet.likedByUser = true)
        })
      })
      return res.render('tweets', { tweets, sortedUserList })
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

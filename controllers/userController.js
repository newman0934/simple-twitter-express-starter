const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const User = db.User
const Tweet = db.Tweet
const Reply = db.Reply
const Followship = db.Followship
const Like = db.Like
const { Op } = (sequelize = require('sequelize'))
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

let userController = {
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入')
    return res.redirect('/tweets')
  },
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    if (req.body.passwordCheck != req.body.password) {
      req.flash('error_messages', '兩次密碼輸入不同')
      return res.redirect('/signup')
    } else {
      const { name, email, password, passwordCheck } = req.body
      if (!name || !email || !password || !passwordCheck) {
        return req.flash('error_messages', '所有欄位皆為必填')
      }
      User.findOne({
        where: {
          [Op.or]: [{ email }, { name }]
        }
      }).then(user => {
        if (user) {
          let errors = []
          errors.push({ message: '使用者名稱或信箱重複' })
          return res.render('signup', { errors, name, email })
        } else {
          User.create({
            name,
            email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            ),
            avatar: 'https://fakeimg.pl/300x300/'
          }).then(user => {
            return res.redirect('/signin')
          })
        }
      })
    }
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功')
    req.session.destroy()
    req.logout()
    res.redirect('/signin')
  },
  getUserTweets: (req, res) => {
    return User.findByPk(req.params.id, {
      include: [
        Like,
        { model: Tweet, include: [Reply, Like] },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    }).then(user => {
      const isFollowed = user.Followers.map(d => d.id).includes(req.user.id)
      const tweets = user.Tweets
      const isCurrentUser = +req.user.id === +req.params.id ? true : false
      tweets.map(tweet => {
        tweet.Likes.map(like => {
          if (like.UserId === req.user.id) return (tweet.likedByUser = true)
        })
      })
      res.render('user/user', {
        user,
        tweets,
        isCurrentUser,
        isFollowed
      })
    })
  },

  getUserEdit: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      res.render('user/edit', { user })
    })
  },

  //編輯使用者資料
  postUser: (req, res) => {
    if (Number(req.params.id) !== Number(req.user.id)) {
      return res.redirect('back')
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return User.findByPk(req.params.id).then(user => {
          user
            .update({
              name: req.body.name,
              introduction: req.body.introduction,
              avatar: file ? img.data.link : null
            })
            .then(user => {
              req.flash(
                'success_messages',
                `${user.name} was successfully to update.`
              )
              res.redirect(`/users/${user.id}/tweets`)
            })
        })
      })
    } else {
      return User.findByPk(req.params.id).then(user => {
        user
          .update({
            name: req.body.name,
            introduction: req.body.introduction,
            avatar: user.avatar
          })
          .then(user => {
            req.flash(
              'success_messages',
              `${user.name} was successfully to update.`
            )
            res.redirect(`/users/${user.id}/tweets`)
          })
      })
    }
  },
  getUserFollowings: (req, res) => {
    return User.findByPk(req.params.id, {
      include: [
        Like,
        { model: Tweet, include: [Reply] },
        { model: User, as: 'Followers' },
        {
          model: User,
          as: 'Followings',
          include: { model: User, as: 'Followers' }
        }
      ]
    }).then(user => {
      /* 
        1. 遍歷 user.Following 找到該 user 的追蹤者
        2. 遍歷 該 user 追蹤者中的追隨者
        3. 如果追隨者中包含 user 就傳入 followerHaveCurrentUser 為 true
      */
      for (let i = 0; i < user.Followings.length; i++) {
        for (let j = 0; j < user.Followings[i].Followers.length; j++) {
          if (+user.Followings[i].Followers[j].id === req.user.id) {
            user.Followings[i].followerHaveCurrentUser = true
          }
        }
      }
      res.render('user/followings', { user })
    })
  },

  getUserFollowers: (req, res) => {
    return User.findByPk(req.params.id, {
      include: [
        { model: Tweet, include: [Reply] },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    }).then(user => {
      res.render('user/followers', { user })
    })
  },

  addFollowing: (req, res) => {
    return Followship.create({
      followerId: req.user.id,
      followingId: req.body.id
    }).then(followship => {
      return res.redirect('back')
    })
  },

  removeFollowing: (req, res) => {
    return Followship.destroy({
      where: {
        followerId: req.user.id,
        followingId: req.params.followingId
      }
    }).then(() => {
      return res.redirect('back')
    })
  },

  addLike: (req, res) => {
    return Like.create({
      UserId: req.user.id,
      TweetId: req.params.id
    }).then(like => {
      return res.redirect('back')
    })
  },

  removeLike: (req, res) => {
    return Like.destroy({
      where: {
        UserId: req.user.id,
        TweetId: req.params.id
      }
    }).then(like => {
      return res.redirect('back')
    })
  }
}

module.exports = userController

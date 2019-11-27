const db = require('../models')
const User = db.User
const Tweet = db.Tweet

const userController = {
  getUserTweets: (req, res) => {
    return User.findByPk(req.params.id, { include: Tweet }).then(user => {
      const tweets = user.Tweets
      res.render('user/user', { user, tweets })
    })
  }
}

module.exports = userController

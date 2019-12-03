const db = require("../models");
const Tweet = db.Tweet;
const User = db.User;
const Reply = db.Reply

const adminController = {
  getTweets: (req, res) => {
    return Tweet.findAll({
      include: [
        { model: User, attributes: ["name"] },
        { model: Reply, attributes: ["id", "comment"] }
      ],
      order: [["id", "ASC"]]
    }).then(tweets => {
      return res.render("admin/tweets", { tweets });
    });
  },

  deleteTweet: (req, res) => {
    return Tweet.findByPk(req.params.id).then(tweet => {
      tweet.destroy().then(tweet => {
        res.redirect("/admin/tweets");
      });
    });
  },

  getUsers: (req, res) => {
    return User.findAll({
      include: [{all: true}]
    }).then(users => {
      users = users.map(user => ({
        ...user.dataValues,
        TweetCount:user.Tweets.length
      }))
      users = users.sort((a, b) => b.TweetCount - a.TweetCount)
      return res.render("admin/users", { users });
    });
  }
};

module.exports = adminController;

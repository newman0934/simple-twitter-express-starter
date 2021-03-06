'use strict'
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define(
    'Tweet',
    {
      description: DataTypes.TEXT,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Tweet.associate = function (models) {
    Tweet.belongsTo(models.User)
    Tweet.hasMany(models.Like)
    Tweet.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'TweetId',
      as: 'LikeUsers'
    })
    Tweet.hasMany(models.Reply)
  }
  return Tweet
}

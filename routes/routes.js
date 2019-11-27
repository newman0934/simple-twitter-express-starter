const express = require('express')
const router = express.Router()
const tweetController = require('./../controllers/tweetController')
const adminController = require('./../controllers/adminController')
const replyController = require('./../controllers/replyController')

router.get('/', (req, res) => res.redirect('/tweets'))
router.get('/tweets', tweetController.getTweets)
router.post('/tweets', tweetController.postTweets)

router.get('/tweets/:tweet_id/replies', replyController.getTweetReplies)
router.post('/tweets/:tweet_id/replies', (req, res) =>
  res.send('post /tweets/:tweet_id/replies')
)
router.get('/users/:id/tweets', (req, res) => res.render('user/user'))
router.get('/users/:id/followings', (req, res) => res.render('user/followings'))
router.get('/users/:id/followers', (req, res) => res.render('user/followers'))
router.post('/followships', (req, res) => res.send('post /followships'))
router.delete('/followships/:followingId', (req, res) =>
  res.send('delete /followships/:followingId')
)
router.get('/users/:id/likes', (req, res) => res.render('user/like'))
router.post('/tweets/:id/like', (req, res) => res.send('post /tweets/:id/like'))
router.post('/tweets', (req, res) => res.send('post /tweets/:id/unlike'))
router.get('/users/:id/edit', (req, res) => res.render('user/edit'))
router.post('/users/:id/edit', (req, res) => res.send('post /users/:id/edit'))

router.get('/admin/tweets', adminController.getTweets)
router.delete('/admin/tweets/:id', adminController.deleteTweet)
router.get('/admin/users', adminController.getUsers)

module.exports = router

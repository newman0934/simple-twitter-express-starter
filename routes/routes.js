const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const passport = require("../config/passport")

const authenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/signin")
}

const authenticatedAdmin = (req, res, next) => {
  if(req.isAuthenticated()){
    if(req.user.role){
      return next()
    }
    return res.redirect("/")
  }
  res.redirect("/signin")
}

router.get('/', (req, res) => res.redirect('/tweets'))
router.get('/tweets', (req, res) => res.render('tweets'))
router.post('/tweets', (req, res) => res.send('post /tweets'))
router.get('/tweets/:tweet_id/replies', (req, res) => res.render('replies'))
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
router.get('/admin/tweets', (req, res) => res.render('admin/tweets'))
router.delete('/admin/tweets/:id', (req, res) =>
  res.send('delete /admin/tweets/:id')
)
router.get('/admin/users', (req, res) => res.render('admin/users'))
router.get("/signup", userController.signUpPage)
router.post("/signup", userController.signUp)
router.get("/signin", userController.signInPage)
router.post(
  "/signin",
  passport.authenticate("local", {
      failureRedirect: "/signin",
      failureFlash: true
  }),
  userController.signIn
);

module.exports = router

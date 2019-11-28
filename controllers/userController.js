const bcrypt = require("bcrypt-nodejs")
const db = require("../models")
const User = db.User
const Tweet = db.Tweet
const Reply = db.Reply
const { Op } = sequelize = require('sequelize')

let userController = {
    signInPage: (req, res) => {
        return res.render("signin")
    },
    signIn: (req, res) => {
        req.flash("success_messages", "成功登入")
        return res.redirect("/tweets")
    },
    signUpPage: (req, res) => {
        return res.render("signup")
    },
    signUp: (req, res) => {
        if (req.body.passwordCheck != req.body.password) {
            req.flash("error_messages", "兩次密碼輸入不同")
            return res.redirect("/signup")
        } else {
            const { name, email, password, passwordCheck } = req.body
            if (!name || !email || !password || !passwordCheck) {
                return req.flash("error_messages", "所有欄位皆為必填")
            }
            User.findOne({
                where: {
                    [Op.or]: [
                        { email }, { name }
                    ]
                }
            }).then(user => {
                if (user) {
                    let errors = []
                    errors.push({ message: "使用者名稱或信箱重複" })
                    return res.render("signup", { errors, name, email })
                } else {
                    User.create({
                        name,
                        email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
                    }).then(user => {
                        return res.redirect("/signin")
                    })
                }
            })
        }
    },
    logout: (req, res) => {
        req.flash("success_messages", "登出成功")
        req.logout()
        res.redirect("/signin")
    },
    getUserTweets: (req, res) => {
        return User.findByPk(req.params.id, {
            include: { model: Tweet, include: [Reply] }
        }).then(user => {
            const tweets = user.Tweets
            res.render('user/user', { user, tweets })
        })
    },

    getUserEdit: (req, res) => {
        return User.findByPk(req.params.id).then(user => {
            res.render('user/edit', { user })
        })
    }
}

module.exports = userController


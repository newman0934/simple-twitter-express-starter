const bcrypt = require("bcrypt-nodejs")
const db = require("../models")
const User = db.User

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
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (user) {
                    req.flash("error_messages", "信箱重複")
                    return res.redirect("/signup")
                } else {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
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
    }
}

module.exports = userController
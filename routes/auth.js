const express = require('express');
const router = express.Router();



var Recaptcha = require('express-recaptcha').Recaptcha;
//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY');
//or with options
var options = { 'theme': 'dark' };
var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY', options);
// appeler le model User 
const User = require('../models/user');

// appeler bcrypt
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


/* GET home page */
// router.get('/signup', (req, res, next) => {
//     res.render('auth/signup');
// });


router.get('/signup', recaptcha.middleware.render, function (req, res) {
    res.render('auth/signup', { captcha: res.recaptcha });
});
router.post('/signup', (req, res, next) => {
    let { username, password } = req.body

    // validation 

    // USername ou pas est vide 
    if (username === "" || password === "") {
        res.render("auth/signup", {
            errorMessage: "Indicate a username and a password to sign up"
        });
        return;
    }
    // Escxt ce que le USER existe déja ?

    User.findOne({ username: username })
        .then(user => {
            console.log("user => is ", user);
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The username already exists!"
                });
                return;
            }
        })

    // Création 


    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    User.create({
        username, password: hashPass
    })
        .then(user => {
            console.log('user', user)
            res.redirect('/signup');
        })
        .catch(err => console.log('error', err))

});



module.exports = router;
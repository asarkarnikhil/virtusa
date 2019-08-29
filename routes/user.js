const router = require('express').Router();
const User = require('../models/usermodel');

router.post('/createuser', (req, res, next) => {
    User.findOne({ username: req.body.username }).then((currentUser) => {
        if (currentUser) {
            // already have this user
            console.log('user with username: ', req.body.username, ' already exists.');
            res.status(200).json({
                message: 'user with username: '+ req.body.username+ ' already exists.'
            });
        } else {
            // if not, create user in our db
            new User({  
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                emailaddress: req.body.emailaddress,
                username: req.body.username,
                password: req.body.password
            }).save().then((newUser) => {
                console.log('created new user: ', newUser); 
                res.status(200).json({
                    message: 'created new user',
                    result: newUser
                });           
            });
        }

    }).catch((error) =>{
        next(error);
    });
});

router.get('/getuserlist', (req, res, next) => {
User.find().then((users) => {
//    res.writeHead(200)
    res.status(200).json({message:'user list', result:users});
}).catch((error)=>{
    next(error);
});
});

module.exports = router;
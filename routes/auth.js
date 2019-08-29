const router = require('express').Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

router.get('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'testuser',
        email: 'testuser@gmail.com'
    }

    jwt.sign({ user }, keys.jwt.authkey, { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
});

module.exports = router;
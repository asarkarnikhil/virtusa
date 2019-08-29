const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const parser = require('body-parser');
const errorhandler = require('./utility/errorhandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const http = require('http');
const app = express();

// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {    
//         console.log('connected to db');
// });

let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
  }; 

//db connection      
mongoose.connect(keys.mongodb.dbURI, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



app.use(parser.urlencoded({
    extended: false
}));
app.use(parser.json());

// set up routes
app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);


// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

//error handler middleware
app.use(errorhandler);

const server = http.createServer(app);


//server.listen(5000, () => console.log('Server started on port 5000'));
server.listen(process.env.PORT || 5000);
console.log("Server running at http://localhost:5000/");

module.exports = server;

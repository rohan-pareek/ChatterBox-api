const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');

// Routes
const ChatRouter = require('./Routes/Chat');
const UserRouter = require('./Routes/User');

// setup mongoose connection
mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) console.log('MongoDB Error: ', err.message);
    else console.log('Database connected suucessfully')
})

// body parser
app.use(bodyParser.json());

// Connecting Routes
app.use('/api/chat', ChatRouter)
app.use('/api/user', UserRouter)

module.exports = app;
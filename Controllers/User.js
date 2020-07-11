const User = require('../Models/User');
const mongoose = require('mongoose');
const sendResponse = require('../common/SendResponse');
const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.signup = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        password: req.body.password? hash.generate(req.body.password): null
    })
    User.findOne({userName: req.body.userName}, (err, doc) => {
        if(err) sendResponse(res, 0, err.message, null);
        else if(doc) {
            sendResponse(res, 0, 'User already exists', null);
        } else {
            user.save((err, doc) => {
                if(err) sendResponse(res, 0, err.message, null);
                else sendResponse(res, 1, 'Account created successfully', null);
            })        
        }
    })
}

exports.login = (req, res, next) => {
    User.findOne({userName: req.body.userName}, (err, user) => {
        if(err) sendResponse(res, 0, err.message, null);
        else if(user) {
            if(hash.verify(req.body.password, user.password)) {
                jwt.sign({user}, config.jwtSecret, {expiresIn: 60}, (err, token) => {
                    if(err) sendResponse(res, 0, err.message, null);
                    else {
                        sendResponse(res, 1, 'Successfully logged in', {userName: user.userName, token});
                    }
                })
            } else {
                sendResponse(res, 0, 'Invalid credentials', null);
            }
        }
        else {
            sendResponse(res, 0, 'User not found', null);
        }
    })
}
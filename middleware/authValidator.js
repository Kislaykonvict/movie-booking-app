const User = require('../models/user.model');
const constants = require('../utils/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/server.config')


exports.isAdmin = async (req, res, next) => {
    if(req.role == constants.userTypes.admin) {
        next();
    }
    else {
        res.status(403).send({
            message : "Require Admin Role!"
        });
        return;
    }

}

    
exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        res.status(401).send({
            message : `Token is not provided!`
        })
        return;
    }

    jwt.verify(token, config.SECRET, (err, payload) => {
        if(err) {
            res.status(401).send({
                message : `Unauthorized!`
            })
            return;
        }
        req.userId = payload.id;
        req.role = payload.role;
        next();
    })
}
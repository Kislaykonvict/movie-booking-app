const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const { userStatus, userTypes} = require('../utils/constants');
const jwt = require('jsonwebtoken');
const config = require('../config/server.config');

exports.signUp = async (req, res) => {

    const userId = await User.findOne({ userId : req.body.userId});
    if(userId) {
        console.log("Inside this");
        res.status(409).send({
            message : `Failed! userId already exists!`
        });
        return;
    }

    const email = await User.findOne({ email : req.body.email });
    if(email) {
        res.status(409).send({
            message : `Failed! email already exists!`
        });
        return;
    }

    const body = req.body;

    const userObj = {
        userId : body.userId,
        name : body.name,
        email : body.email,
        userStatus : body.userType === userTypes.customer ? userStatus.approved : userStatus.pending,
        userType : body.userType,
        password : bcrypt.hashSync(body.password, 8)
    }

    try {
        const createdUserInDb = await User.create(userObj);
        const resObj = {
            userId : createdUserInDb.userId,   
            name : createdUserInDb.name,
            email : createdUserInDb.email,
            userType : createdUserInDb.userType,
            userStatus : createdUserInDb.userStatus
        }
        console.log(`user created successfully!`);
        res.status(201).send({
            message : `Signed Up successfully!`,
            resObj : resObj
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request, Please try again after sometime!`
        })
    }
}

exports.signIn = async (req, res) => {
    const body = req.body;
    const password = body.password;

    const queryObject = {};
    if(req.body.email){
        queryObject.email = req.body.email;
    }
    if(req.body.id){
        queryObject.userId = req.body.userId;
    }

    try {
        const userInDb = await User.findOne(queryObject);
        if(!userInDb) {
            res.status(404).send({
                message : `User not found!`
            });
            return;
        }
        if(userInDb.userStatus !== 'APPROVED') {
            res.status(400).send({
                message : `Can't allow login as your status is ${userInDb.userStatus}`
            });
            return;
        }

        var isPasswordValid = bcrypt.compareSync(password, userInDb.password);
        
        if(!isPasswordValid) {
            res.status(401).send({
                message : `Invalid Password!`
            });
            return;
        }

        const token = jwt.sign({ id : userInDb.userId, role : userInDb.userType }, config.SECRET, {
            expiresIn : 86400 //24hrs
        })

        res.status(200).send({
            userId : userInDb.userId,
            name : userInDb.name,
            email : userInDb.email,
            userType : userInDb.userType,
            userStatus : userInDb.userStatus,
            accessToken : token
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request, Please try again after sometime!`
        })
    }
}
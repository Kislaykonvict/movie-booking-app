const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const config = require('../config/server.config');

exports.updatePassword = async (req, res) => {
    
    const newPassword = req.body.newPassword;

    // const oldPassword = await User.findOne({userId : userId});
    // const samePassword = bcrypt.compare(newPassword, oldPassword.password);
    // if(samePassword) {
    //     res.status(200).send({
    //         message : `New password is same as old password!`
    //     })
    //     return;
    // }
    
    try {
        const userInDb = await User.findOneAndUpdate(
            {
                userId : req.userId
            },
            {
                password : bcrypt.hashSync(newPassword, 8)
            }
        ).exec()
        res.status(200).send({  
            message : `Password has been updated successfully!`
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request, Please try again after sometime!`
        })
    }
}


exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userInDb = await User.findOneAndUpdate(
            {
                userId : userId
            },
            {
                name : req.body.name,
                userStatus : req.body.userStatus,
                userType : req.body.userType
            }
        ).exec();

        res.status(200).send({
            message : `User has been updated successfully!`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request, Please try again after sometime!`
        })
    };  
}    

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).send({
            message : `here are the list of all the users`,
            users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request, Please try again after sometime!`
        })
    }
}
const mongoose = require('mongoose');

const { userStatus , userTypes } = require('../utils/constants')

const userSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        minlength : 10
    },
    password : {
        type : String,
        required : true
    },
    userStatus : {
        type : String,
        enum : userStatus
    },
    userType : {
        type : String,
        enum : userTypes,
        required : true
    }
},
{timestamps : true}
)

module.exports = mongoose.model('User', userSchema);   
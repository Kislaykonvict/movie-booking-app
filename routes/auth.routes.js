const express = require('express');
const { signUp, signIn } = require('../controllers/authController');
const { userReqVal } = require('../middleware/userValidator');


const router = express.Router();

router.post('/signup', userReqVal, signUp);
router.post('/signin', signIn);

module.exports = router;
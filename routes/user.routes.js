const express = require('express');
const { updatePassword, updateUser, getAllUsers } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authValidator');
const { userStatusAndTypeVal } = require('../middleware/userValidator');

const router = express.Router();

router.put('/passUpdate', [verifyToken], updatePassword);
router.put('/userUpdate/:userId', [verifyToken, isAdmin, userStatusAndTypeVal], updateUser);
router.get('/getAllUsers', [verifyToken, isAdmin], getAllUsers)

module.exports = router;
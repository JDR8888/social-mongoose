const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
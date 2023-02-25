const router = require('express').Router();
const { getAllUsers, postUser, loginUser } = require('../controllers/users_controller');
const { auth } = require('../utils/user_authentication');

router.get('/', auth ,getAllUsers);


router.post('/', postUser);

router.post('/login', loginUser);


module.exports = router;
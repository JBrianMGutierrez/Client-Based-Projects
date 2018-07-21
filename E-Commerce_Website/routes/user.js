var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');
var csrf = require('csurf');
var csrfProtection = csrf({});

router.use(csrfProtection);

router.get('/profile', user_controller.isUserLogin, user_controller.profile);

router.get('/sign_out', user_controller.isUserLogin, user_controller.sign_out);

router.use('/', user_controller.userNotLogin, user_controller.logoutNext);

router.get('/sign_up', user_controller.sign_up);

router.post('/sign_up', user_controller.create);
// redirect to the assigned route stated in the app.js which is users/profile
router.get('/sign_in', user_controller.sign_in);

router.post('/sign_in', user_controller.login);

module.exports = router;



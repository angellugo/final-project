const router = require('express').Router();
const AccountController = require('../../controllers/AccountController');

// Matches with "/api/account"
router.route('/newSignUp')
    .post(AccountController.signUp);
router.route('/newEmployee')
    .post(AccountController.newEmployee);
router.route('/signIn')
    .post(AccountController.signIn);
router.route('/verify')
    .get(AccountController.verify);
router.route('/logout')
    .get(AccountController.logout);

module.exports = router;

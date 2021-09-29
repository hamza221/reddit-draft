const router = require("express").Router();
const AuthController = require("../controllers/AuthController");


router.route('/login')
      .get(AuthController.loginPage)
      .post(AuthController.login);

router.route('/register')
      .get(AuthController.registerPage)
      .post(AuthController.register)

router.route('/forgot_password')
      .get(AuthController.forgotPasswordPage)
      .post(AuthController.getResetToken)

router.route('/reset_password/:resetToken')
      .get(AuthController.resetPasswordPage)
      .post(AuthController.resetPassword)

router.post('/logout',AuthController.logout)


module.exports = router;

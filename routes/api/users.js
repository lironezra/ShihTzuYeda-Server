const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const UserController = require('../../controllers/users');
const passportConf = require('../../passport'); // loading passport configuration

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportFacebook = passport.authenticate('facebooktoken', {
  session: false
});

router.post(
  '/signup',
  validateBody(schemas.registerSchema),
  UserController.signUp
);

router
  .route('/signin')
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UserController.signIn
  );

router.route('/secret').get(passportJWT, UserController.secret);

router
  .route('/auth/facebook')
  .post(passportFacebook, UserController.facebookOAuth);

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const DryFoodController = require('../../controllers/dryFood');
const passportConf = require('../../passport'); // loading passport configuration
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   PUT api/dryfood/
// @desc    Add dry food item
// @access  Private
router
  .route('/')
  .put(
    validateBody(schemas.dryFoodSchema),
    passportJWT,
    DryFoodController.addDryFood
  );

module.exports = router;

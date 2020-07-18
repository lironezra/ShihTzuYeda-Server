const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const RegularFoodController = require('../../controllers/regularFood');
const passportConf = require('../../passport'); // loading passport configuration
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   PUT api/dryfood
// @desc    Craete dry food item
// @access  Private
router
  .route('/')
  .put(
    validateBody(schemas.regularFoodScema),
    passportJWT,
    RegularFoodController.addRegularFood
  );

// @route   GET api/regularfood
// @desc    Get all regular food items
// @access  Private
router.route('/').get(passportJWT, RegularFoodController.getAllRegularFoods);

// @route   GET api/regularfood/:id
// @desc    Get food by id
// @access  Private
router.route('/:id').get(passportJWT, RegularFoodController.getRegularFoodById);

// @route   DELETE api/regularfood/:id
// @desc    Delete regular food
// @access  Private
router
  .route('/:id')
  .delete(passportJWT, RegularFoodController.deleteRegularFood);

module.exports = router;

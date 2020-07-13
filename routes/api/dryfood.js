const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const DryFoodController = require('../../controllers/dryFood');
const passportConf = require('../../passport'); // loading passport configuration
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   PUT api/dryfood
// @desc    Craete dry food item
// @access  Private
router
  .route('/')
  .put(
    validateBody(schemas.dryFoodSchema),
    passportJWT,
    DryFoodController.addDryFood
  );

// @route   GET api/dryfood
// @desc    Get all dry food items
// @access  Private
router.route('/').get(passportJWT, DryFoodController.getAllDryFoods);

// @route   GET api/dryfood/:id
// @desc    Get food by id
// @access  Private
router.route('/:id').get(passportJWT, DryFoodController.getDryFodById);

// @route   DELETE api/dryfood/:id
// @desc    Delete dry food
// @access  Private
router.route('/:id').delete(passportJWT, DryFoodController.deleteDryFood);

// @route   PUT api/dryfood/like/:id
// @desc    Like a dry food
// @access  Private
router.route('/like/:id').put(passportJWT, DryFoodController.likeADryFood);

// @route   PUT api/dryfood/unlike/:id
// @desc    Unlike a dry food
// @access  Private
router.route('/unlike/:id').put(passportJWT, DryFoodController.unlikeADryFood);

module.exports = router;

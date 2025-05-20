const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const recipeController = require('../controllers/recipeController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Auth
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rezept
router.post('/recipes', verifyToken, recipeController.createRecipe);
router.get('/recipes', verifyToken, recipeController.getAllRecipes);

module.exports = router;

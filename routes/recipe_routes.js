/**
 * For routes regarding students. Assigned to Mike
 */
const express = require('express');
const router = express.Router();
const recipes = require('../services/recipes');
router.use(
    express.urlencoded({
        extended: true,
    })
);

// Read all
router.get('/recipes', async function (req, res) {
    const recipeResults = await recipes.getRecipes();
    res.render("recipes/recipes", { recipes: recipeResults });
});

// Create
router.post('/recipes/create', async function (req, res) {
    try {
        await recipes.createRecipe(req.body);
        res.redirect("/recipes");
    }
    catch (err) {
        console.log("Error creating recipe: ", err);
        res.redirect('/recipes');
    }
});

// New Recipe Page
router.get('/recipes/new', async function (req, res) {
    // Get all aisles and pass them down
    res.render("recipes/add_recipes");
});

// Read One
router.get('/recipes/:id/edit', async function (req, res) {
    const recipeResult = await recipes.getRecipeById(req.params.id);
    res.render("recipes/edit_recipes", { recipe: recipeResult[0] });
});

// Update
router.post('/recipes/:id/edit', async function (req, res) {
    try {
        await recipes.updateRecipe(req.params.id, req.body);
        res.redirect("/recipes");
    }
    catch (err) {
        console.log("Error updating recipe: ", err);
        res.redirect('/recipes');
    }
});

// Delete
router.post('/recipes/:id/delete', async function (req, res) {
    try {
        await recipes.deleteRecipe(req.params.id);
        res.redirect("/recipes");
    }
    catch (err) {
        console.log("Error deleting recipe: ", err);
        res.redirect('/recipes');
    }
});

module.exports = router;
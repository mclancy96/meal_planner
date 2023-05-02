/**
 * For routes regarding students. Assigned to Mike
 */
const express = require('express');
const router = express.Router();
const recipes = require('../services/recipe_services');
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

// Edit the recipe for a meal
router.get('/recipes/:meal_id/edit', async function (req, res) {
    const recipeResult = await recipes.getRecipeByMealId(req.params.meal_id);
    res.render("recipes/edit_recipes", { recipes: recipeResult });
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
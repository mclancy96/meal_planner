/**
 * For routes regarding students. Assigned to Mike
 */
const express = require('express');
const router = express.Router();
const meals = require('../services/meal_services');
const recipes = require('../services/recipe_services');
const ingredients = require('../services/ingredient_services');
router.use(
    express.urlencoded({
        extended: true,
    })
);

// Read all
router.get('/meals', async function (req, res) {
    const mealResults = await meals.getMeals();
    res.render("meals/meals", { meals: mealResults });
});

// Create
router.post('/meals/create', async function (req, res) {
    try {
        await meals.createMeal(req.body);
        const newMeal = await meals.getMealByName(req.body.name);
        for (let i = 0; i < 20; i++) {
            let amount = req.body[`amount_${i}`];
            let unit = req.body[`unit_${i}`];
            let ingredient_id = req.body[`ingredient_id_${i}`];
            if (!amount || !unit || !ingredient_id) {
                break;
            }
            let recipeBody = {
                amount: amount,
                unit: unit,
                ingredient_id: ingredient_id
            };
            await recipes.createRecipe(recipeBody);
        }
        res.redirect("/meals");
    }
    catch (err) {
        console.log("Error creating meal: ", err);
        res.redirect('/meals');
    }
});

// New Meal Page
router.get('/meals/new', async function (req, res) {
    const ingredientsResult = await ingredients.getIngredients();
    res.render("meals/add_meals", { ingredients: ingredientsResult });
});

// Read one
router.get('/meals/:id', async function (req, res) {
    const mealResult = await meals.getMealById(req.params.id);
    const ingredientsResult = await recipes.getRecipeByMealId(req.params.id);
    res.render("meals/meal_single", { meal: mealResult[0], ingredients: ingredientsResult });
});


// Read One
router.get('/meals/:id/edit', async function (req, res) {
    const mealResult = await meals.getMealById(req.params.id);
    res.render("meals/edit_meals", { meal: mealResult[0] });
});

// Update
router.post('/meals/:id/edit', async function (req, res) {
    try {
        await meals.updateMeal(req.params.id, req.body);
        res.redirect("/meals");
    }
    catch (err) {
        console.log("Error updating meal: ", err);
        res.redirect('/meals');
    }
});

// Delete
router.post('/meals/:id/delete', async function (req, res) {
    try {
        await meals.deleteMeal(req.params.id);
        res.redirect("/meals");
    }
    catch (err) {
        console.log("Error deleting meal: ", err);
        res.redirect('/meals');
    }
});

module.exports = router;
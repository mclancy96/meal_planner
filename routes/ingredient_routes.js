/**
 * For routes regarding students. Assigned to Mike
 */
const express = require('express');
const router = express.Router();
const ingredients = require('../services/ingredients');
router.use(
    express.urlencoded({
        extended: true,
    })
);

// Read all
router.get('/ingredients', async function (req, res) {
    const ingredientResults = await ingredients.getIngredients();
    res.render("ingredients/ingredients", { ingredients: ingredientResults });
});

// Create
router.post('/ingredients/create', async function (req, res) {
    try {
        await ingredients.createIngredient(req.body);
        res.redirect("/ingredients");
    }
    catch (err) {
        console.log("Error creating ingredient: ", err);
        res.redirect('/ingredients');
    }
});

// New Ingredient Page
router.get('/ingredients/new', async function (req, res) {
    // Get all aisles and pass them down
    res.render("ingredients/add_ingredients");
});

// Read One
router.get('/ingredients/:id/edit', async function (req, res) {
    const ingredientResult = await ingredients.getIngredientById(req.params.id);
    res.render("ingredients/edit_ingredients", { ingredient: ingredientResult[0] });
});

// Update
router.post('/ingredients/:id/edit', async function (req, res) {
    try {
        await ingredients.updateIngredient(req.params.id, req.body);
        res.redirect("/ingredients");
    }
    catch (err) {
        console.log("Error updating ingredient: ", err);
        res.redirect('/ingredients');
    }
});

// Delete
router.post('/ingredients/:id/delete', async function (req, res) {
    try {
        await ingredients.deleteIngredient(req.params.id);
        res.redirect("/ingredients");
    }
    catch (err) {
        console.log("Error deleting ingredient: ", err);
        res.redirect('/ingredients');
    }
});

module.exports = router;
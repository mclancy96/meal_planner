/**
 * For routes regarding students. Assigned to Mike
 */
const express = require('express');
const router = express.Router();
const plannedMeals = require('../services/planned_meal_services');
router.use(
    express.urlencoded({
        extended: true,
    })
);

// Read all
router.get('/planned_meals', async function (req, res) {
    const plannedMealResults = await plannedMeals.getPlannedMeals();
    res.render("plannedMeals/plannedMeals", { plannedMeals: plannedMealResults });
});

// Create
router.post('/planned_meals/create', async function (req, res) {
    try {
        await plannedMeals.createPlannedMeal(req.body);
        res.redirect("back");
    }
    catch (err) {
        console.log("Error creating plannedMeal: ", err);
        res.redirect('back');
    }
});

// New PlannedMeal Page
router.get('/planned_meals/new', async function (req, res) {
    // Get all aisles and pass them down
    res.render("plannedMeals/add_plannedMeals");
});

// Read One
router.get('/planned_meals/:id/edit', async function (req, res) {
    const plannedMealResult = await plannedMeals.getPlannedMealById(req.params.id);
    res.render("plannedMeals/edit_plannedMeals", { plannedMeal: plannedMealResult[0] });
});

// Update
router.post('/planned_meals/:id/edit', async function (req, res) {
    try {
        await plannedMeals.updatePlannedMeal(req.params.id, req.body);
        res.redirect("back");
    }
    catch (err) {
        console.log("Error updating plannedMeal: ", err);
        res.redirect('back');
    }
});

// Delete
router.post('/planned_meals/:id/delete', async function (req, res) {
    try {
        await plannedMeals.deletePlannedMeal(req.params.id);
        res.redirect("/plannedMeals");
    }
    catch (err) {
        console.log("Error deleting plannedMeal: ", err);
        res.redirect('/plannedMeals');
    }
});

module.exports = router;
/**
 * This holds the queries for meals
 */

const db = require('./db');

async function getMeals() {

    const meals = await db.query(
        `SELECT * FROM Meals;`
    );

    return meals;
}

async function getMealById(mealId) {
    const meal = await db.query(
        `SELECT * FROM Meals WHERE meal_id = ${mealId};`
    );
    return meal;
}

async function createMeal(mealObject) {
    const updateStatus = await db.query(
        `INSERT INTO Meals (name, servings, calories, cookTime, recipe_url)
        VALUES("${mealObject.name}", 
        "${mealObject.servings}",
        "${mealObject.calories}", 
        "${mealObject.cookTime}", 
        "${mealObject.recipe_url}");`
    );
    return updateStatus;
}

async function updateMeal(mealId, mealObject) {
    const updateStatus = await db.query(
        `UPDATE Meals
        SET name = "${mealObject.name}", 
        servings= "${mealObject.servings}",
        calories="${mealObject.calories}", 
        cookTime="${mealObject.cookTime}", 
        recipe_url = "${mealObject.recipe_url}"
        WHERE meal_id = "${mealId}";`
    );
    return updateStatus;
}

async function deleteMeal(mealId) {
    const updateStatus = await db.query(
        `DELETE FROM Meals WHERE meal_id = "${mealId}";`
    );

    return updateStatus;
}

module.exports = {
    getMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
}
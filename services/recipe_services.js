/**
 * This holds the queries for recipes
 */

const db = require('./db');

async function getRecipes(meal_id) {

    const recipes = await db.query(
        `SELECT * FROM Recipes where meal_id = ${meal_id}`
    );

    return recipes;
}

async function getRecipeById(recipeId) {
    const recipe = await db.query(
        `SELECT * FROM Recipes WHERE recipe_id = ${recipeId}`
    );
    return recipe;
}

async function createRecipe(recipeObject) {
    const updateStatus = await db.query(
        `INSERT INTO Recipes (meal_id, ingredient_id, amount, unit)
        VALUES("${recipeObject.meal_id}", 
        "${recipeObject.ingredient_id}",
        "${recipeObject.amount}", 
        "${recipeObject.unit}";`
    );
    return updateStatus;
}

async function updateRecipe(recipeId, recipeObject) {
    const updateStatus = await db.query(
        `UPDATE Recipes
        SET meal_id = "${recipeObject.meal_id}", 
        ingredient_id= "${recipeObject.ingredient_id}",
        amount="${recipeObject.amount}", 
        unit="${recipeObject.unit}"
        WHERE recipe_id = "${recipeId}";`
    );
    return updateStatus;
}

async function deleteRecipe(recipeId) {
    const updateStatus = await db.query(
        `DELETE FROM Recipes WHERE recipe_id = "${recipeId}";`
    );

    return updateStatus;
}

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
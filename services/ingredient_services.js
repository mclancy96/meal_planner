/**
 * This holds the queries for ingredients
 */

const db = require('./db');

async function getIngredients() {

    const ingredients = await db.query(
        `SELECT * FROM Ingredients ORDER BY name;`
    );

    return ingredients;
}

async function getIngredientById(ingredientId) {
    const ingredient = await db.query(
        `SELECT * FROM Ingredients WHERE ingredient_id = ${ingredientId}`
    );
    return ingredient;
}

async function createIngredient(ingredientObject) {
    const updateStatus = await db.query(
        `INSERT INTO Ingredients (name, aisle_id, temperature, details)
        VALUES("${ingredientObject.name}", 
        "${ingredientObject.aisle_id}",
        "${ingredientObject.temperature}", 
        "${ingredientObject.details}");`
    );
    return updateStatus;
}

async function updateIngredient(ingredientId, ingredientObject) {
    const updateStatus = await db.query(
        `UPDATE Ingredients
        SET name = "${ingredientObject.name}", 
        aisle_id= "${ingredientObject.aisle_id}",
        temperature="${ingredientObject.temperature}", 
        details="${ingredientObject.details}"
        WHERE ingredient_id = "${ingredientId}";`
    );
    return updateStatus;
}

async function deleteIngredient(ingredientId) {
    const updateStatus = await db.query(
        `DELETE FROM Ingredients WHERE ingredient_id = "${ingredientId}";`
    );

    return updateStatus;
}

module.exports = {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}
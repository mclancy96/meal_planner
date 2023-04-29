/**
 * This holds the queries for recipes
 */

const db = require('./db');

async function getRecipes() {

    const recipes = await db.query(
        `SELECT * FROM Recipes`
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
        `INSERT INTO Recipes (name, street_address, city, state, zip_code, email, phone_number)
        VALUES("${recipeObject.name}", 
        "${recipeObject.street_address}",
        "${recipeObject.city}", 
        "${recipeObject.state}", 
        "${recipeObject.zip_code}", 
        "${recipeObject.email}", 
        "${recipeObject.phone_number}");`
    );
    return updateStatus;
}

async function updateRecipe(recipeId, recipeObject) {
    const updateStatus = await db.query(
        `UPDATE Recipes
        SET name = "${recipeObject.name}", 
        street_address= "${recipeObject.street_address}",
        city="${recipeObject.city}", 
        state="${recipeObject.state}", 
        zip_code = "${recipeObject.zip_code}", 
        email = "${recipeObject.email}", 
        phone_number= "${recipeObject.phone_number}"
        WHERE recipe_id = "${recipeId}";`
    );
    return updateStatus;
}

async function deleteRecipe(recipeId) {

    // obtain all the classes that the recipe is registered for
    const registeredClasses = await db.query(
        `SELECT class_id FROM Registrations WHERE recipe_id = "${recipeId}";`
    );

    // as long as a recipe is registered for a class, loop through all the classes and decrement class_enrollment by 1
    if (registeredClasses.length !== 0) {
        for (class_obj of registeredClasses) {
            const cur_enrollment_now = await db.query(
                `SELECT current_enrollment FROM Classes WHERE class_id = ${class_obj.class_id};`
            );
            const cur_enrollment_now_num = cur_enrollment_now[0].current_enrollment

            await db.query(`
                UPDATE Classes
                SET current_enrollment = ${cur_enrollment_now_num - 1}
                WHERE class_id = ${class_obj.class_id}`);
        }
    }

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
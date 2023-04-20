/**
 * This holds the queries for ingredients
 */

const db = require('./db');

async function getIngredients() {

    const ingredients = await db.query(
        `SELECT * FROM Ingredients`
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
        `INSERT INTO Ingredients (name, street_address, city, state, zip_code, email, phone_number)
        VALUES("${ingredientObject.name}", 
        "${ingredientObject.street_address}",
        "${ingredientObject.city}", 
        "${ingredientObject.state}", 
        "${ingredientObject.zip_code}", 
        "${ingredientObject.email}", 
        "${ingredientObject.phone_number}");`
    );
    return updateStatus;
}

async function updateIngredient(ingredientId, ingredientObject) {
    const updateStatus = await db.query(
        `UPDATE Ingredients
        SET name = "${ingredientObject.name}", 
        street_address= "${ingredientObject.street_address}",
        city="${ingredientObject.city}", 
        state="${ingredientObject.state}", 
        zip_code = "${ingredientObject.zip_code}", 
        email = "${ingredientObject.email}", 
        phone_number= "${ingredientObject.phone_number}"
        WHERE ingredient_id = "${ingredientId}";`
    );
    return updateStatus;
}

async function deleteIngredient(ingredientId) {

    // obtain all the classes that the ingredient is registered for
    const registeredClasses = await db.query(
        `SELECT class_id FROM Registrations WHERE ingredient_id = "${ingredientId}";`
    );

    // as long as a ingredient is registered for a class, loop through all the classes and decrement class_enrollment by 1
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
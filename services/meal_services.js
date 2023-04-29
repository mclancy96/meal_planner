/**
 * This holds the queries for meals
 */

const db = require('./db');

async function getMeals() {

    const meals = await db.query(
        `SELECT * FROM Meals`
    );

    return meals;
}

async function getMealById(mealId) {
    const meal = await db.query(
        `SELECT * FROM Meals WHERE meal_id = ${mealId}`
    );
    return meal;
}

async function createMeal(mealObject) {
    const updateStatus = await db.query(
        `INSERT INTO Meals (name, street_address, city, state, zip_code, email, phone_number)
        VALUES("${mealObject.name}", 
        "${mealObject.street_address}",
        "${mealObject.city}", 
        "${mealObject.state}", 
        "${mealObject.zip_code}", 
        "${mealObject.email}", 
        "${mealObject.phone_number}");`
    );
    return updateStatus;
}

async function updateMeal(mealId, mealObject) {
    const updateStatus = await db.query(
        `UPDATE Meals
        SET name = "${mealObject.name}", 
        street_address= "${mealObject.street_address}",
        city="${mealObject.city}", 
        state="${mealObject.state}", 
        zip_code = "${mealObject.zip_code}", 
        email = "${mealObject.email}", 
        phone_number= "${mealObject.phone_number}"
        WHERE meal_id = "${mealId}";`
    );
    return updateStatus;
}

async function deleteMeal(mealId) {

    // obtain all the classes that the meal is registered for
    const registeredClasses = await db.query(
        `SELECT class_id FROM Registrations WHERE meal_id = "${mealId}";`
    );

    // as long as a meal is registered for a class, loop through all the classes and decrement class_enrollment by 1
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
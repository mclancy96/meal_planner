/**
 * This holds the queries for plannedMeals
 */

const db = require('./db');

async function getPlanned_Meals() {

    const plannedMeals = await db.query(
        `SELECT * FROM Planned_Meals`
    );

    return plannedMeals;
}

async function getPlanned_MealById(plannedMealId) {
    const plannedMeal = await db.query(
        `SELECT * FROM Planned_Meals WHERE plannedMeal_id = ${plannedMealId}`
    );
    return plannedMeal;
}

async function createPlanned_Meal(plannedMealObject) {
    const updateStatus = await db.query(
        `INSERT INTO Planned_Meals (name, street_address, city, state, zip_code, email, phone_number)
        VALUES("${plannedMealObject.name}", 
        "${plannedMealObject.street_address}",
        "${plannedMealObject.city}", 
        "${plannedMealObject.state}", 
        "${plannedMealObject.zip_code}", 
        "${plannedMealObject.email}", 
        "${plannedMealObject.phone_number}");`
    );
    return updateStatus;
}

async function updatePlanned_Meal(plannedMealId, plannedMealObject) {
    const updateStatus = await db.query(
        `UPDATE Planned_Meals
        SET name = "${plannedMealObject.name}", 
        street_address= "${plannedMealObject.street_address}",
        city="${plannedMealObject.city}", 
        state="${plannedMealObject.state}", 
        zip_code = "${plannedMealObject.zip_code}", 
        email = "${plannedMealObject.email}", 
        phone_number= "${plannedMealObject.phone_number}"
        WHERE plannedMeal_id = "${plannedMealId}";`
    );
    return updateStatus;
}

async function deletePlanned_Meal(plannedMealId) {

    // obtain all the classes that the plannedMeal is registered for
    const registeredClasses = await db.query(
        `SELECT class_id FROM Registrations WHERE plannedMeal_id = "${plannedMealId}";`
    );

    // as long as a plannedMeal is registered for a class, loop through all the classes and decrement class_enrollment by 1
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
        `DELETE FROM Planned_Meals WHERE plannedMeal_id = "${plannedMealId}";`
    );

    return updateStatus;
}

module.exports = {
    getPlanned_Meals,
    getPlanned_MealById,
    createPlanned_Meal,
    updatePlanned_Meal,
    deletePlanned_Meal
}
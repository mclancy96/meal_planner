/**
 * This holds the queries for plannedMeals
 */

const db = require('./db');

async function getPlannedMeals(startDate, endDate) {
    const plannedMeals = await db.query(
        `SELECT * FROM Planned_Meals where date between '${startDate}' and '${endDate}' ORDER BY date;`
    );

    return plannedMeals;
}

async function getPlannedMealById(plannedMealId) {
    const plannedMeal = await db.query(
        `SELECT * FROM Planned_Meals WHERE planned_meal_id = ${plannedMealId}`
    );
    return plannedMeal;
}

async function createPlannedMeal(plannedMealObject) {
    const updateStatus = await db.query(
        `INSERT INTO Planned_Meals (date, meal_id)
        VALUES("${plannedMealObject.date}", 
        "${plannedMealObject.meal_id}");`
    );
    return updateStatus;
}

async function updatePlannedMeal(plannedMealId, plannedMealObject) {
    const updateStatus = await db.query(
        `UPDATE Planned_Meals
        SET date = "${plannedMealObject.date}", 
        meal_id= "${plannedMealObject.meal_id}"
        WHERE planned_meal_id = "${plannedMealId}";`
    );
    return updateStatus;
}

async function deletePlannedMeal(plannedMealId) {
    const updateStatus = await db.query(
        `DELETE FROM Planned_Meals WHERE planned_meal_id = "${plannedMealId}";`
    );

    return updateStatus;
}

module.exports = {
    getPlannedMeals,
    getPlannedMealById,
    createPlannedMeal,
    updatePlannedMeal,
    deletePlannedMeal
}
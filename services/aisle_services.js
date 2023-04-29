/**
 * This holds the queries for aisles
 */

const db = require('./db');

async function getAisles() {

    const aisles = await db.query(
        `SELECT * FROM Aisles`
    );

    return aisles;
}

async function getAisleById(aisleId) {
    const aisle = await db.query(
        `SELECT * FROM Aisles WHERE aisle_id = ${aisleId}`
    );
    return aisle;
}

async function createAisle(aisleObject) {
    const updateStatus = await db.query(
        `INSERT INTO Aisles (name, store, aisle_number)
        VALUES("${aisleObject.name}", 
        "${aisleObject.store}",
        "${aisleObject.aisle_number}");`
    );
    return updateStatus;
}

async function updateAisle(aisleId, aisleObject) {
    const updateStatus = await db.query(
        `UPDATE Aisles
        SET name = "${aisleObject.name}", 
        store= "${aisleObject.store}",
        aisle_number="${aisleObject.aisle_number}"
        WHERE aisle_id = "${aisleId}";`
    );
    return updateStatus;
}

async function deleteAisle(aisleId) {
    const updateStatus = await db.query(
        `DELETE FROM Aisles WHERE aisle_id = "${aisleId}";`
    );

    return updateStatus;
}

module.exports = {
    getAisles,
    getAisleById,
    createAisle,
    updateAisle,
    deleteAisle
}
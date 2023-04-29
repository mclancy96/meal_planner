/**
 * For routes regarding students. Assigned to Mike
 */
const express = require('express');
const router = express.Router();
const aisles = require('../services/aisle_services');
router.use(
    express.urlencoded({
        extended: true,
    })
);

// Read all
router.get('/aisles', async function (req, res) {
    const aisleResults = await aisles.getAisles();
    res.render("aisles/aisles", { aisles: aisleResults });
});

// Create
router.post('/aisles/create', async function (req, res) {
    try {
        await aisles.createAisle(req.body);
        res.redirect("/aisles");
    }
    catch (err) {
        console.log("Error creating aisle: ", err);
        res.redirect('/aisles');
    }
});

// New Aisle Page
router.get('/aisles/new', async function (req, res) {
    // Get all aisles and pass them down
    res.render("aisles/add_aisles");
});

// Read One
router.get('/aisles/:id/edit', async function (req, res) {
    const aisleResult = await aisles.getAisleById(req.params.id);
    res.render("aisles/edit_aisles", { aisle: aisleResult[0] });
});

// Update
router.post('/aisles/:id/edit', async function (req, res) {
    try {
        await aisles.updateAisle(req.params.id, req.body);
        res.redirect("/aisles");
    }
    catch (err) {
        console.log("Error updating aisle: ", err);
        res.redirect('/aisles');
    }
});

// Delete
router.post('/aisles/:id/delete', async function (req, res) {
    try {
        await aisles.deleteAisle(req.params.id);
        res.redirect("/aisles");
    }
    catch (err) {
        console.log("Error deleting aisle: ", err);
        res.redirect('/aisles');
    }
});

module.exports = router;
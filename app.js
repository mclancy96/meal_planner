/*
    SETUP
*/

/*
    ALL THE CODE IN THIS PROJECT IS OUR ORIGINAL WORK
*/
const express = require('express');
var app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
require("dotenv").config();
const PORT = process.env.PORT;

// Import routes
const ingredientRoutes = require('./routes/ingredient_routes.js');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


/*
    ROUTES
*/

app.get('/', async function (req, res) {
    res.render("index");
});

app.use(ingredientRoutes);

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


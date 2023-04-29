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
const dateFuncs = require('./public/dateFunctions')

// Import routes
const ingredientRoutes = require('./routes/ingredient_routes.js');
const mealRoutes = require('./routes/meal_routes.js');
const aisleRoutes = require('./routes/aisle_routes.js');
const recipeRoutes = require('./routes/recipe_routes.js');
const plannedMealRoutes = require('./routes/planned_meal_routes.js');

// Services
const plannedMealServices = require('./services/planned_meal_services');
const mealServices = require('./services/meal_services');
// const recipeServices = require('./services/recipe_services');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


/*
    ROUTES
*/

app.get('/', async function (req, res) {
    const days = dateFuncs.getDayList();
    const dateRange = dateFuncs.getStartAndEndDate();
    const plannedMeals = await plannedMealServices.getPlannedMeals(dateRange[0], dateRange[1]);
    console.log(plannedMeals);
    const mealList = [];
    for (meal of plannedMeals) {
        const mealDetails = await mealServices.getMealById(meal.meal_id);
        mealList.push(mealDetails[0])
    }
    console.log(mealList);
    res.render("index", { days: days, meals: mealList, plannedMeals: plannedMeals });
});

app.use(ingredientRoutes);
app.use(mealRoutes);
app.use(aisleRoutes);
app.use(recipeRoutes);
app.use(plannedMealRoutes);

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


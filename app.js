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


// Import routes
const studentRoutes = require('./routes/student_routes.js');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


/*
    ROUTES
*/

app.get('/', function (req, res) {
    res.sendFile("./index.html", { root: __dirname });
});

app.use(studentRoutes);

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});




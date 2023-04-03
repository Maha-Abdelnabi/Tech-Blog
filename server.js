// Dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();
//i need to require sequlize, routes
const routes = require("./contollers");
const sequelize = require('./config/connection');


// Initialize handlebars for the html templates
const hbs = exphbs.create({});

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Set handlebars as the template engine for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Inform Express.js on which template engine to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Give the server the path to the routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});


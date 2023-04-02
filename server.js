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

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Inform Express.js on which template engine to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Give the server the path to the routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  console.log(`Now listening to ${PORT}!`);
});

// Dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();
//i need to require sequlize, routes


// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Inform Express.js on which template engine to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Now listening to ${PORT}!`);
});

// Dependencies
const path = require("path");
const express = require("express");
// Express session to handle session cookies
const session = require("express-session");
const exphbs = require("express-handlebars");
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();
//i need to require sequlize, routes
const routes = require("./contollers");
const sequelize = require('./config/connection');


// Initialize handlebars for the html templates
const hbs = exphbs.create({});

// Initialize sessions
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Give the server a path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as the template engine for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Inform Express.js on which template engine to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tell the app to use Express Session for the session handling
app.use(session(sess));

// Give the server the path to the routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});


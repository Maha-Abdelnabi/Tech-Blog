const router = require("express").Router();
// API routes folder
const apiRoutes = require("./api");
// Homepage routes
const homeRoutes = require("./home-routs");
// Dashboard Routes
const dashboardRoutes = require('./dashboard-routes.js');


// Define the path for the server for the API routes
router.use('/api', apiRoutes);

// Define the path for the home page
router.use('/', homeRoutes);

// Define the path for the dashboard
router.use('/dashboard', dashboardRoutes);



router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
const router = require("express").Router();
// API routes folder
const apiRoutes = require("./api");
// Homepage routes


// Define the path for the server for the API routes
router.use('/api', apiRoutes);

// Define a catch-all route for any resource that doesn't exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
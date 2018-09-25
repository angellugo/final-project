const router = require('express').Router();
const employeeRoutes = require('./employee');

// Employee routes
router.use('/books', employeeRoutes);

module.exports = router;

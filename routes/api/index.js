const router = require('express').Router();
const employeeRoutes = require('./employee');

// Employee routes
router.use('/employee', employeeRoutes);

module.exports = router;

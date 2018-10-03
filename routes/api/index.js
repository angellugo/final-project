const router = require('express').Router();
const employeeRoutes = require('./employee');
const accountRoutes = require('./account');

// Employee routes
router.use('/employee', employeeRoutes);
router.use('/account', accountRoutes);

module.exports = router;

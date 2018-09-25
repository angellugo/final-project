const router = require('express').Router();
const employeeController = require('../../controllers/EmployeeController');

// Matches with "/api/employee"
router.route('/')
    .get(employeeController.findAll)
    .post(employeeController.create);

// Matches with "/api/employee/clockIn/:id"
router
    .route('/clockIn/:id')
    .put(employeeController.clockIn);
// Matches with "/api/employee/clockOut/:id"
router
    .route('/clockOut/:id')
    .put(employeeController.clockOut);

module.exports = router;

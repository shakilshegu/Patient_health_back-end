const express = require('express');
const { getPatients, getPatientById, addHealthRecord, addPatient } = require('../controllers/patientController');
const { createPARequest, getPARequests } = require('../controllers/priorAuthorizationController');
const router = express.Router();

// Define routes
router.post('/add', addPatient) 
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/:id/health-records', addHealthRecord); 

//prior Route
router.post('/prior/create',createPARequest)
router.get('/prior', getPARequests);

module.exports = router;

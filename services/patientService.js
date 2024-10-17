const Patient = require('../models/Patient');

// Fetch all patients
const findAllPatients = async () => {
    return await Patient.find();
};

// Find a patient by ID
const findPatientById = async (id) => {
    return await Patient.findById(id);
};

// Add a health record
const saveHealthRecord = async (id, healthRecord) => {
    const patient = await findPatientById(id);
    if (patient) {
        patient.healthRecords.push(healthRecord);
        return await patient.save();
    }
    return null;
};

module.exports = { findAllPatients, findPatientById, saveHealthRecord };

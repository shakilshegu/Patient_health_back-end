const Patient = require('../models/Patient');

const addPatient = async (req, res) => {
    const { name, age, phoneNumber,condition } = req.body;

    try {
        const newPatient = new Patient({ name, age,phoneNumber, condition });
        await newPatient.save();
        
        return res.status(201).json({
            success: true,
            message: 'Patient added successfully',
            data: newPatient,
        });
    } catch (error) {
        console.error('Error adding patient:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add patient',
            error: error.message,
        });
    }
};

// Get all patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching patients', error: error.message });
    }
};

// Get patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching patient', error: error.message });
    }
};

// Add a health record
const addHealthRecord = async (req, res) => {
    const { id } = req.params;
    const { treatment, medication, labResults } = req.body;

    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        patient.healthRecords.push({ treatment, medication, labResults });
        await patient.save();
        res.status(201).json({ success: true, message: 'Health record added successfully', data: patient });
    } catch (error) {
        console.error('Error adding health record:', error);
        res.status(500).json({ success: false, message: 'Server error while adding health record', error: error.message });
    }
};

module.exports = { getPatients, getPatientById, addHealthRecord, addPatient };

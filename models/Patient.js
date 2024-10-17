const mongoose = require('mongoose');

const HealthRecordSchema = new mongoose.Schema({
    treatment: String,
    medication: String,
    labResults: String,
    date: { type: Date, default: Date.now }
}, { _id: false });

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    condition: { type: String, required: true },
    healthRecords: [HealthRecordSchema]
}, { timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;

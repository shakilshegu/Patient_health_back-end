const mongoose = require('mongoose');
const Patient = require("./PriorAuthorization")

const PriorAuthorizationSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    treatmentType: {
        type: String,
        required: true 
    },
    insurancePlan: {
        type: String,
        required: true 
    },
    dateOfService: {
        type: Date,
        required: true
    },
    diagnosisCode: {
        type: String,
        required: true 
    },
    medication: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied'],
        default: 'Pending'
    },
    providerNotes: {
        type: String,
        default: '' 
    },
    insuranceCompany: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('PriorAuthorization', PriorAuthorizationSchema);

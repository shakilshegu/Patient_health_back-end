const { createPARequestService } = require('../services/priorAuthorizationService');
const PriorAuthorization = require('../models/PriorAuthorization');
const createPARequest = async (req, res) => {
    try {
        const {
            patientId,
            treatmentType,
            insurancePlan,
            dateOfService,
            diagnosisCode,
            medication,
            providerNotes,
            insuranceCompany
        } = req.body;

        // Call the service to create a new prior authorization request
        const savedRequest = await createPARequestService({
            patientId,
            treatmentType,
            insurancePlan,
            dateOfService,
            diagnosisCode,
            medication,
            providerNotes,
            insuranceCompany
        });

        res.status(201).json({succuss:true, message: 'Prior authorization request created successfully.', request: savedRequest });
    } catch (error) {
        console.error("Error creating prior authorization request:", error);
        res.status(500).json({ succuss:false ,message: 'Failed to create prior authorization request.', error: error.message });
    }
};

const getPARequests = async (req, res) => {
    try {
        const { patientId } = req.query; 

        let filter = {};
        if (patientId) {
            filter.patientId = patientId; 
        }

        const requests = await PriorAuthorization.find(filter).populate('patientId', 'name'); 

        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching prior authorization requests:", error);
        res.status(500).json({ message: 'Failed to fetch prior authorization requests.', error: error.message });
    }
};

const getAllDataPAR = async (req, res) => {
    try {
        const allData = await PriorAuthorization.find().populate('patientId');
        if (allData.length === 0) {
            return res.status(404).json({ message: 'No prior authorizations found.' });
        }
        res.status(200).json(allData);
    } catch (error) {
        console.error('Error fetching prior authorizations:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    createPARequest,
    getPARequests,
    getAllDataPAR
};

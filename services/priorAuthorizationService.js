const PriorAuthorization = require('../models/PriorAuthorization');

// Service to handle prior authorization logic
const createPARequestService = async (requestData) => {
    const newPARequest = new PriorAuthorization(requestData);
    return await newPARequest.save();
};

module.exports = {
    createPARequestService
};

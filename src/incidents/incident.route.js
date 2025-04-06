const express = require('express');
const {
    createAnIncident,
    getAllIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
} = require('./incident.controller');
const router = express.Router();

// Creates a new incident record in the database
router.post('/create-incident', createAnIncident);
// Retrieves all incidents from the database
router.get('/', getAllIncidents);
// Retrieves a specific incident by its ID
router.get('/:id', getIncidentById);
// Updates an existing incident record by ID
router.put('/edit/:id', updateIncident);
// Deletes an incident record by ID
router.delete('/:id', deleteIncident);

module.exports = router;

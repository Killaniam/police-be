const express = require('express');
const {
    createAnIncident,
    getAllIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
} = require('./incident.controller');
const router = express.Router();

router.post('/create-incident', createAnIncident);
router.get('/', getAllIncidents);
router.get('/:id', getIncidentById);
router.put('/edit/:id', updateIncident);
router.delete('/:id', deleteIncident);

module.exports = router;

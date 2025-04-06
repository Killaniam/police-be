const Incident = require('./incident.model');

const createAnIncident = async (req, res) => {
    try {
        // Gets the client's IP address from the request object
        const clientIP = req.ip || req.connection.remoteAddress;

        // Calculates timestamp from 1 hour ago and counts incidents from this IP in last hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const incidentCount = await Incident.countDocuments({
            createdAt: { $gte: oneHourAgo },
            createdByIP: clientIP,
        });

        // Returns error response if user has created more than 3 incidents in last hour
        if (incidentCount >= 3) {
            return res.status(429).json({
                success: false,
                message: 'Maximum 3 incidents allowed per hour',
            });
        }

        // Creates new incident document with request body data and client IP
        const newIncident = new Incident({
            ...req.body,
            createdByIP: clientIP,
        });
        // Saves the new incident to database
        await newIncident.save();
        // Returns success response with created incident data
        res.status(200).send({
            message: 'Incident created successfully',
            incident: newIncident,
        });
    } catch (error) {
        // Logs error and returns error response if incident creation fails
        console.error('Error creating incident', error);
        res.status(500).send({
            message: 'Error creating incident',
        });
    }
};

const getAllIncidents = async (req, res) => {
    try {
        // Retrieves all incidents sorted by creation date in descending order
        const incidents = await Incident.find().sort({ createdAt: -1 });
        // Returns success response with fetched incidents
        res.status(200).send({
            message: 'Incident fetched successfully',
            incidents,
        });
    } catch (error) {
        // Logs error and returns error response if fetching fails
        console.error('Error creating incident', error);
        res.status(500).send({
            message: 'Failed to fetch incident',
        });
    }
};

const getIncidentById = async (req, res) => {
    try {
        // Finds and returns a single incident by its ID
        const incident = await Incident.findById(req.params.id);
        // Returns success response with fetched incident
        res.status(200).send({
            message: 'Incident fetched successfully',
            incident,
        });
    } catch (error) {
        // Logs error and returns error response if fetching fails
        console.error('Error fetching incident', error);
        res.status(500).send({
            message: 'Failed to fetch incident',
        });
    }
};

const updateIncident = async (req, res) => {
    try {
        // Extracts ID from request parameters and updates incident with request body data
        const { id } = req.params;
        const updatedIncident = await Incident.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        // Returns not found response if incident doesn't exist
        if (!updatedIncident) {
            res.status(404).send({ message: 'Incident not found' });
        }
        // Returns success response with updated incident data
        res.status(200).send({
            message: 'Incident updated successfully',
            incident: updateIncident,
        });
    } catch (error) {
        // Logs error and returns error response if update fails
        console.log('Error updating incident', error);
        res.status(500).send({ message: 'Failed to update Incident' });
    }
};

const deleteIncident = async (req, res) => {
    try {
        // Extracts ID from request parameters and deletes the incident
        const { id } = req.params;
        const deletedIncident = await Incident.findByIdAndDelete(id);
        // Returns not found response if incident doesn't exist
        if (!deletedIncident) {
            res.status(404).send({ message: 'Incident not found' });
        }
        // Returns success response with deleted incident data
        res.status(200).send({
            message: 'Incident deleted successfully',
            incident: deletedIncident,
        });
    } catch (error) {
        // Logs error and returns error response if deletion fails
        console.log('Error deleting incident', error);
        res.status(500).send({ message: 'Failed to delete Incident' });
    }
};

module.exports = {
    createAnIncident,
    getAllIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
};

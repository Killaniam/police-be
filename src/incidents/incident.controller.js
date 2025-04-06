const Incident = require('./incident.model');

const createAnIncident = async (req, res) => {
    try {
        // Get client IP address
        const clientIP = req.ip || req.connection.remoteAddress;

        // Check number of incidents created in last hour from this IP
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const incidentCount = await Incident.countDocuments({
            createdAt: { $gte: oneHourAgo },
            createdByIP: clientIP,
        });

        // Return error if limit exceeded (changed to return early to prevent incident creation)
        if (incidentCount >= 3) {
            return res.status(429).json({
                success: false,
                message: 'Maximum 3 incidents allowed per hour',
            });
        }

        // matches Incident from Incident.model Schema with form data coming from police-app mobile app
        const newIncident = new Incident({
            // Fixed: Changed to use 'new' keyword
            ...req.body,
            createdByIP: clientIP,
        });
        // save if matches
        await newIncident.save();
        //sends data back to mobile app if success
        res.status(200).send({
            message: 'Incident created successfully',
            incident: newIncident,
        });
    } catch (error) {
        // sends error back to mobile app if error
        console.error('Error creating incident', error);
        res.status(500).send({
            message: 'Error creating incident',
        });
    }
};

const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ createdAt: -1 });
        res.status(200).send({
            message: 'Incident fetched successfully',
            incidents,
        });
    } catch (error) {
        console.error('Error creating incident', error);
        res.status(500).send({
            message: 'Failed to fetch incident',
        });
    }
};

const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        res.status(200).send({
            message: 'Incident fetched successfully',
            incident,
        });
    } catch (error) {
        console.error('Error fetching incident', error);
        res.status(500).send({
            message: 'Failed to fetch incident',
        });
    }
};

const updateIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIncident = await Incident.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedIncident) {
            res.status(404).send({ message: 'Incident not found' });
        }
        res.status(200).send({
            message: 'Incident updated successfully',
            incident: updateIncident,
        });
    } catch (error) {
        console.log('Error updating incident', error);
        res.status(500).send({ message: 'Failed to update Incident' });
    }
};

const deleteIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncident = await Incident.findByIdAndDelete(id);
        if (!deletedIncident) {
            res.status(404).send({ message: 'Incident not found' });
        }
        res.status(200).send({
            message: 'Incident deleted successfully',
            incident: deletedIncident,
        });
    } catch (error) {
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

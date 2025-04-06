const { default: mongoose } = require('mongoose');

// Defines the schema structure for incident records with required fields and data types
const incidentSchema = new mongoose.Schema(
    {
        // Stores the type/category of the incident as a required string
        incidentType: {
            type: String,
            required: true,
        },
        // Records who submitted the incident report as a required non-unique string
        submittedBy: {
            type: String,
            required: true,
            unique: false,
        },
        // Stores information about suspected persons involved in the incident
        suspects: String,
        // Contains additional details about the suspects
        suspectsDetails: String,
        // Records the IP address of who created the incident report
        createdByIP: {
            type: String,
            required: true,
        },
        // Stores the URL or path to any image related to the incident
        image: {
            type: String,
        },
        // Contains the main description and information about the incident
        incidentDetails: {
            type: String,
            required: true,
        },
        // Stores the geographical location data of where the incident occurred
        location: {
            type: {
                // Records the longitude coordinate of the incident location
                longitude: {
                    type: Number,
                    required: true,
                },
                // Records the latitude coordinate of the incident location
                latitude: {
                    type: Number,
                    required: true,
                },
                // Stores the physical address of the incident location
                address: {
                    type: String,
                },
            },
            required: true,
        },
        // Stores any additional comments about the incident
        comment: String,
        // Records the time when the incident occurred
        time: String,
        // Automatically records when the incident report was created
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // Tracks whether the incident has been resolved or not
        resolved: {
            type: Boolean,
            default: false,
        },
    },
    // Enables automatic timestamp fields (createdAt, updatedAt)
    {
        timestamps: true,
    }
);

// Updates the updatedAt timestamp before saving any modifications to the incident
incidentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Creates the Incident model using the defined schema
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;

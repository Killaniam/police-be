const { default: mongoose } = require('mongoose');

const incidentSchema = new mongoose.Schema(
    {
        incidentType: {
            type: String,
            required: true,
        },
        submittedBy: {
            type: String,
            required: true,
            unique: false,
        },
        suspects: String,
        suspectsDetails: String,
        createdByIP: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        incidentDetails: {
            type: String,
            required: true,
        },
        location: {
            type: {
                longitude: {
                    type: Number,
                    required: true,
                },
                latitude: {
                    type: Number,
                    required: true,
                },
                address: {
                    type: String,
                },
            },
            required: true,
        },
        comment: String,
        time: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
        resolved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
incidentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;

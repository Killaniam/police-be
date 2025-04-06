const { default: mongoose } = require('mongoose');

// Defines the structure of a notice document with title and description fields
const noticeSchema = new mongoose.Schema(
    {
        // Title field that must be provided as a string
        title: {
            type: String,
            required: true,
        },
        // Description field that must be provided as a string
        description: {
            type: String,
            required: true,
        },
    },
    // Adds automatic timestamp fields (createdAt, updatedAt) to the schema
    {
        timestamps: true,
    }
);

// Creates a Notice model from the schema for database operations
const Notice = mongoose.model('Notice', noticeSchema);

// Exports the Notice model to be used in other files
module.exports = Notice;

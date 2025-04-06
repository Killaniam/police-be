const express = require('express');
const app = express();
const port = 8000; // Sets the port number for the server to listen on
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables from .env file into process.env

// Configures express to parse JSON request bodies
app.use(express.json());
// Enables Cross-Origin Resource Sharing for all routes
app.use(cors());

async function main() {
    // Establishes connection to MongoDB database using connection string from environment variables
    await mongoose.connect(process.env.DB_URL);
    // Sets up the root route that returns a server status message
    app.use('/', (req, res) => {
        res.send('Police-app server is running');
    });
}

const incidentRoutes = require('./src/incidents/incident.route');
const noticeRoutes = require('./src/notices/notice.route');
// Mounts incident-related routes under the /api/incidents path
app.use('/api/incidents', incidentRoutes);
// Mounts notice-related routes under the /api/notices path
app.use('/api/notices', noticeRoutes);

// Initializes database connection and logs success/failure
main()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(err));

// Starts the Express server and logs the port number
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

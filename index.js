const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(cors());

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Police-app server is running');
    });
}

const incidentRoutes = require('./src/incidents/incident.route');
const noticeRoutes = require('./src/notices/notice.route');
app.use('/api/incidents', incidentRoutes);
app.use('/api/notices', noticeRoutes);

main()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

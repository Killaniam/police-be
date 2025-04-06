const Notice = require('./notice.model');

// Creates a new notice document with request body data and saves it to database
const createANotice = async (req, res) => {
    console.log(req.body);
    try {
        const newNotice = await Notice({ ...req.body });
        await newNotice.save();
        res.status(200).send({
            message: 'Notice created successfully',
            notice: newNotice,
        });
    } catch (error) {
        console.error('Error creating Notice', error);
        res.status(500).send({
            message: 'Error creating Notice',
        });
    }
};

// Retrieves all notices from database sorted by creation date in descending order
const getAllNotice = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.status(200).send({
            message: 'Notice fetched successfully',
            notices,
        });
    } catch (error) {
        console.error('Error creating Notice', error);
        res.status(500).send({
            message: 'Failed to fetch Notice',
        });
    }
};

// Finds and returns a specific notice by its ID from the database
const getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        res.status(200).send({
            message: 'Notice fetched successfully',
            notice,
        });
    } catch (error) {
        console.error('Error fetching Notice', error);
        res.status(500).send({
            message: 'Failed to fetch Notice',
        });
    }
};

// Updates an existing notice document by ID with new data from request body
const updateNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedNotice) {
            res.status(404).send({ message: 'Notice not found' });
        }
        res.status(200).send({
            message: 'Notice updated successfully',
            notice: updatedNotice,
        });
    } catch (error) {
        console.log('Error updating Notice', error);
        res.status(500).send({ message: 'Failed to update Notice' });
    }
};

// Removes a notice document from database by its ID
const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotice = await Notice.findByIdAndDelete(id);
        if (!deletedNotice) {
            res.status(404).send({ message: 'Notice not found' });
        }
        res.status(200).send({
            message: 'Notice deleted successfully',
            notice: deletedNotice,
        });
    } catch (error) {
        console.log('Error deleting Notice', error);
        res.status(500).send({ message: 'Failed to delete Notice' });
    }
};

module.exports = {
    createANotice,
    getAllNotice,
    getNoticeById,
    updateNotice,
    deleteNotice,
};

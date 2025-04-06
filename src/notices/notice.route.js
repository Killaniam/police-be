const express = require('express');
const {
    createANotice,
    getAllNotice,
    getNoticeById,
    updateNotice,
    deleteNotice,
} = require('./notice.controller');

const router = express.Router();

// Creates a new notice in the database
router.post('/create-notice', createANotice);
// Gets all notices from the database
router.get('/', getAllNotice);
// Gets a specific notice by ID from the database
router.get('/:id', getNoticeById);
// Updates an existing notice by ID in the database
router.put('/edit/:id', updateNotice);
// Deletes a notice by ID from the database
router.delete('/:id', deleteNotice);

module.exports = router;

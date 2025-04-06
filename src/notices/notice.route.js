const express = require('express');
const {
    createANotice,
    getAllNotice,
    getNoticeById,
    updateNotice,
    deleteNotice,
} = require('./notice.controller');

const router = express.Router();

router.post('/create-notice', createANotice);
router.get('/', getAllNotice);
router.get('/:id', getNoticeById);
router.put('/edit/:id', updateNotice);
router.delete('/:id', deleteNotice);

module.exports = router;

const express = require('express');
const { createEvent, getEvents, filterEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/create', createEvent);
router.get('/getEvents', getEvents);
router.get('/filter', filterEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
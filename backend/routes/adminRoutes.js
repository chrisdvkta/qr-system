const express = require('express');
const { createEvent, editEvent, deleteEvent, getAllEvents } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');


const router = express.Router();

router.route('/events').get(protect,admin,getAllEvents).post(protect,admin,createEvent);
router.route('/events/:id').put(protect,admin,editEvent).delete(protect,admin,deleteEvent);
module.exports = router; 

const express = require('express');
const { buyTicket, getMyTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const { getAllEvents } = require('../controllers/eventController');

const router = express.Router();
router.route('/events').get(protect,getAllEvents);
router.route('/ticket/buy/:eventId').post(protect, buyTicket);
router.route('/tickets/my').get(protect,getMyTickets);
module.exports = router; 
const express = require('express');
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res, next) => notificationController.getNotifications(req, res, next));
router.put('/:id/read', (req, res, next) => notificationController.markAsRead(req, res, next));
router.put('/mark-all-read', (req, res, next) => notificationController.markAllAsRead(req, res, next));

module.exports = router;

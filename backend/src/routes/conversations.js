const express = require('express');
const conversationController = require('../controllers/conversationController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', (req, res, next) => conversationController.createConversation(req, res, next));
router.get('/projects/:projectId', (req, res, next) => conversationController.getConversations(req, res, next));
router.post('/:id/messages', (req, res, next) => conversationController.addMessage(req, res, next));
router.get('/:id/messages', (req, res, next) => conversationController.getMessages(req, res, next));

module.exports = router;

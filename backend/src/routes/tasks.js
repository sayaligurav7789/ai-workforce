const express = require('express');
const taskController = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', (req, res, next) => taskController.createTask(req, res, next));
router.get('/projects/:projectId', (req, res, next) => taskController.getProjectTasks(req, res, next));
router.get('/:id', (req, res, next) => taskController.getTask(req, res, next));
router.put('/:id', (req, res, next) => taskController.updateTask(req, res, next));
router.delete('/:id', (req, res, next) => taskController.deleteTask(req, res, next));

module.exports = router;

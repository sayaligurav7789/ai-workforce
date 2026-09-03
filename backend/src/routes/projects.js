const express = require('express');
const projectController = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', (req, res, next) => projectController.createProject(req, res, next));
router.get('/', (req, res, next) => projectController.getProjects(req, res, next));
router.get('/:id', (req, res, next) => projectController.getProject(req, res, next));
router.put('/:id', (req, res, next) => projectController.updateProject(req, res, next));
router.delete('/:id', (req, res, next) => projectController.deleteProject(req, res, next));
router.post('/:id/members', (req, res, next) => projectController.addMember(req, res, next));
router.delete('/:id/members/:userId', (req, res, next) => projectController.removeMember(req, res, next));

module.exports = router;

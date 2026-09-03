const express = require('express');
const requirementController = require('../controllers/requirementController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', (req, res, next) => requirementController.createRequirement(req, res, next));
router.get('/projects/:projectId', (req, res, next) => requirementController.getProjectRequirements(req, res, next));
router.get('/:id', (req, res, next) => requirementController.getRequirement(req, res, next));
router.put('/:id', (req, res, next) => requirementController.updateRequirement(req, res, next));
router.delete('/:id', (req, res, next) => requirementController.deleteRequirement(req, res, next));

module.exports = router;

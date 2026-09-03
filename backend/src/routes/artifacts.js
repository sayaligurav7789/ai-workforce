const express = require('express');
const artifactController = require('../controllers/artifactController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/projects/:projectId', (req, res, next) => artifactController.getProjectArtifacts(req, res, next));
router.get('/:id', (req, res, next) => artifactController.getArtifact(req, res, next));

module.exports = router;

const express = require('express');

const agentController = require('../controllers/agentController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

// Get all agents
router.get(
  '/',
  (req, res, next) => agentController.getAgents(req, res, next)
);

// Get a specific agent run
router.get(
  '/runs/:runId',
  (req, res, next) => agentController.getAgentRun(req, res, next)
);

// Get all agent runs for a project
router.get(
  '/runs/project/:projectId',
  (req, res, next) => agentController.getProjectAgentRuns(req, res, next)
);

// Run an agent
router.post(
  '/:id/run',
  (req, res, next) => agentController.runAgent(req, res, next)
);

// Get agent details
router.get(
  '/:id',
  (req, res, next) => agentController.getAgent(req, res, next)
);

module.exports = router;
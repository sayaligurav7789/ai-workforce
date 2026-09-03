const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AgentController {

  // GET /api/agents
  async getAgents(req, res, next) {
    try {
      const agents = await prisma.agent.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({
        success: true,
        data: agents
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/agents/:id
  async getAgent(req, res, next) {
    try {
      const agent = await prisma.agent.findUnique({
        where: { id: req.params.id },
        include: {
          agentRuns: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!agent) {
        return res.status(404).json({
          success: false,
          message: 'Agent not found'
        });
      }

      res.status(200).json({
        success: true,
        data: agent
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/agents/:id/run
  async runAgent(req, res, next) {
    try {
      const { id } = req.params;
      const { projectId, input } = req.body;

      // Validate projectId
      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: 'projectId is required'
        });
      }

      // Check agent exists
      const agent = await prisma.agent.findUnique({
        where: { id }
      });

      if (!agent) {
        return res.status(404).json({
          success: false,
          message: 'Agent not found'
        });
      }

      // Check project exists
      const project = await prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      // Create AgentRun
      const agentRun = await prisma.agentRun.create({
        data: {
          projectId,
          agentId: id,
          status: 'RUNNING',
          input: input || {},
          startedAt: new Date()
        },
        include: {
          agent: true,
          project: true
        }
      });

      console.log(`🤖 Agent started: ${agent.name}`);
      console.log(`📁 Project: ${project.name}`);
      console.log(`🆔 Agent Run: ${agentRun.id}`);

      /*
       * AI integration will be added here.
       *
       * For now, we simulate a successful agent execution.
       */

      const output = {
        message: `Agent "${agent.name}" executed successfully.`,
        agentType: agent.type,
        projectId,
        projectName: project.name,
        input: input || {},
        analysis: {
          status: 'SIMULATED',
          message: 'AI processing will be connected in the next step.'
        }
      };

      // Update AgentRun
      const completedRun = await prisma.agentRun.update({
        where: { id: agentRun.id },
        data: {
          status: 'COMPLETED',
          output,
          completedAt: new Date()
        },
        include: {
          agent: true,
          project: true
        }
      });

      console.log(`✅ Agent completed: ${agent.name}`);

      res.status(201).json({
        success: true,
        message: 'Agent executed successfully',
        data: completedRun
      });

    } catch (error) {
      console.error('Agent execution error:', error);

      next(error);
    }
  }

  // GET /api/agents/runs/:runId
  async getAgentRun(req, res, next) {
    try {
      const { runId } = req.params;

      const agentRun = await prisma.agentRun.findUnique({
        where: { id: runId },
        include: {
          agent: true,
          project: true,
          artifacts: true
        }
      });

      if (!agentRun) {
        return res.status(404).json({
          success: false,
          message: 'Agent run not found'
        });
      }

      res.status(200).json({
        success: true,
        data: agentRun
      });

    } catch (error) {
      next(error);
    }
  }

  // GET /api/agents/runs/project/:projectId
  async getProjectAgentRuns(req, res, next) {
    try {
      const { projectId } = req.params;

      const agentRuns = await prisma.agentRun.findMany({
        where: { projectId },
        include: {
          agent: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.status(200).json({
        success: true,
        data: agentRuns
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AgentController();

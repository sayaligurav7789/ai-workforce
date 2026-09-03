const projectService = require('../services/projectService');
const { createProjectSchema, updateProjectSchema } = require('../validators');

class ProjectController {
  async createProject(req, res, next) {
    try {
      const validated = createProjectSchema.parse(req.body);
      const project = await projectService.createProject(
        validated.name,
        validated.description,
        validated.domain,
        req.user.id
      );
      res.status(201).json({
        success: true,
        message: 'Project created',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjects(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
      const projects = await projectService.getProjects(req.user.id, skip, parseInt(limit));
      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      next(error);
    }
  }

  async getProject(req, res, next) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const validated = updateProjectSchema.parse(req.body);
      const project = await projectService.updateProject(req.params.id, validated);
      res.status(200).json({
        success: true,
        message: 'Project updated',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      await projectService.deleteProject(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Project deleted'
      });
    } catch (error) {
      next(error);
    }
  }

  async addMember(req, res, next) {
    try {
      const { userId, role = 'DEVELOPER' } = req.body;
      const member = await projectService.addProjectMember(req.params.id, userId, role);
      res.status(201).json({
        success: true,
        message: 'Member added',
        data: member
      });
    } catch (error) {
      next(error);
    }
  }

  async removeMember(req, res, next) {
    try {
      await projectService.removeProjectMember(req.params.id, req.params.userId);
      res.status(200).json({
        success: true,
        message: 'Member removed'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();

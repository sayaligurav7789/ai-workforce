const requirementService = require('../services/requirementService');
const { createRequirementSchema } = require('../validators');

class RequirementController {
  async createRequirement(req, res, next) {
    try {
      const validated = createRequirementSchema.parse(req.body);
      const requirement = await requirementService.createRequirement(
        validated.projectId,
        validated.reqId,
        validated.title,
        validated.description,
        validated.type,
        validated.priority
      );
      res.status(201).json({
        success: true,
        message: 'Requirement created',
        data: requirement
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectRequirements(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;
      const requirements = await requirementService.getProjectRequirements(req.params.projectId, skip, parseInt(limit));
      res.status(200).json({
        success: true,
        data: requirements
      });
    } catch (error) {
      next(error);
    }
  }

  async getRequirement(req, res, next) {
    try {
      const requirement = await requirementService.getRequirementById(req.params.id);
      if (!requirement) {
        return res.status(404).json({
          success: false,
          message: 'Requirement not found'
        });
      }
      res.status(200).json({
        success: true,
        data: requirement
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRequirement(req, res, next) {
    try {
      const requirement = await requirementService.updateRequirement(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Requirement updated',
        data: requirement
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRequirement(req, res, next) {
    try {
      await requirementService.deleteRequirement(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Requirement deleted'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RequirementController();

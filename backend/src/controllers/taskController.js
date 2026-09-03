const taskService = require('../services/taskService');
const { createTaskSchema, updateTaskSchema } = require('../validators');

class TaskController {
  async createTask(req, res, next) {
    try {
      const validated = createTaskSchema.parse(req.body);
      const task = await taskService.createTask(
        validated.projectId,
        validated.title,
        validated.description,
        validated.priority,
        validated.estimatedEffort,
        validated.dueDate
      );
      res.status(201).json({
        success: true,
        message: 'Task created',
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectTasks(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;
      const tasks = await taskService.getProjectTasks(req.params.projectId, skip, parseInt(limit));
      res.status(200).json({
        success: true,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  }

  async getTask(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const validated = updateTaskSchema.parse(req.body);
      const task = await taskService.updateTask(req.params.id, validated);
      res.status(200).json({
        success: true,
        message: 'Task updated',
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Task deleted'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();

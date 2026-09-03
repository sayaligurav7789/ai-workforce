const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TaskService {
  async createTask(projectId, title, description, priority, estimatedEffort, dueDate, requirementId = null) {
    const task = await prisma.task.create({
      data: {
        projectId,
        requirementId,
        title,
        description,
        priority,
        status: 'OPEN',
        estimatedEffort,
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });
    return task;
  }

  async getProjectTasks(projectId, skip = 0, take = 20) {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      skip,
      take,
      include: {
        assignedUser: { select: { id: true, firstName: true, lastName: true, email: true } },
        assignedAgent: { select: { id: true, name: true, type: true } },
        milestone: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return tasks;
  }

  async getTaskById(taskId) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignedUser: { select: { id: true, firstName: true, lastName: true, email: true } },
        assignedAgent: { select: { id: true, name: true, type: true } },
        milestone: { select: { id: true, name: true } },
        requirement: { select: { id: true, title: true, reqId: true } }
      }
    });
    return task;
  }

  async updateTask(taskId, data) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
      include: {
        assignedUser: { select: { id: true, firstName: true, lastName: true, email: true } },
        assignedAgent: { select: { id: true, name: true, type: true } }
      }
    });
    return task;
  }

  async deleteTask(taskId) {
    await prisma.task.delete({ where: { id: taskId } });
  }
}

module.exports = new TaskService();

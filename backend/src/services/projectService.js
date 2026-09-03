const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProjectService {
  async createProject(name, description, domain, ownerId) {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        domain,
        status: 'PLANNING',
        ownerId,
        members: {
          create: {
            userId: ownerId,
            role: 'OWNER'
          }
        }
      },
      include: {
        members: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } },
        owner: { select: { id: true, email: true, firstName: true, lastName: true } }
      }
    });
    return project;
  }

  async getProjects(userId, skip = 0, take = 10) {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } }
        ]
      },
      skip,
      take,
      include: {
        owner: { select: { id: true, email: true, firstName: true, lastName: true } },
        members: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } },
        _count: { select: { documents: true, requirements: true, tasks: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return projects;
  }

  async getProjectById(projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        owner: { select: { id: true, email: true, firstName: true, lastName: true } },
        members: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } },
        _count: { select: { documents: true, requirements: true, tasks: true, milestones: true } }
      }
    });
    return project;
  }

  async updateProject(projectId, data) {
    const project = await prisma.project.update({
      where: { id: projectId },
      data,
      include: {
        owner: { select: { id: true, email: true, firstName: true, lastName: true } },
        members: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } }
      }
    });
    return project;
  }

  async deleteProject(projectId) {
    await prisma.project.delete({ where: { id: projectId } });
  }

  async addProjectMember(projectId, userId, role = 'DEVELOPER') {
    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId,
        role
      },
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } }
    });
    return member;
  }

  async removeProjectMember(projectId, userId) {
    await prisma.projectMember.delete({
      where: {
        projectId_userId: { projectId, userId }
      }
    });
  }
}

module.exports = new ProjectService();

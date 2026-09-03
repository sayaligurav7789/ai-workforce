const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RequirementService {
  async createRequirement(projectId, reqId, title, description, type, priority, documentId = null) {
    const requirement = await prisma.requirement.create({
      data: {
        projectId,
        documentId,
        reqId,
        title,
        description,
        type,
        priority,
        status: 'DRAFT'
      }
    });
    return requirement;
  }

  async getProjectRequirements(projectId, skip = 0, take = 20) {
    const requirements = await prisma.requirement.findMany({
      where: { projectId },
      skip,
      take,
      include: {
        userStories: { select: { id: true, title: true } },
        tasks: { select: { id: true, title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return requirements;
  }

  async getRequirementById(requirementId) {
    const requirement = await prisma.requirement.findUnique({
      where: { id: requirementId },
      include: {
        userStories: { include: { acceptanceCriteria: true } },
        tasks: { select: { id: true, title: true, status: true } },
        document: { select: { id: true, fileName: true } }
      }
    });
    return requirement;
  }

  async updateRequirement(requirementId, data) {
    const requirement = await prisma.requirement.update({
      where: { id: requirementId },
      data
    });
    return requirement;
  }

  async deleteRequirement(requirementId) {
    await prisma.requirement.delete({ where: { id: requirementId } });
  }
}

module.exports = new RequirementService();

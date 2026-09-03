const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ArtifactController {
  async getProjectArtifacts(req, res, next) {
    try {
      const { artifactType, page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;
      const artifacts = await prisma.generatedArtifact.findMany({
        where: {
          projectId: req.params.projectId,
          ...(artifactType && { artifactType })
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json({
        success: true,
        data: artifacts
      });
    } catch (error) {
      next(error);
    }
  }

  async getArtifact(req, res, next) {
    try {
      const artifact = await prisma.generatedArtifact.findUnique({
        where: { id: req.params.id }
      });
      if (!artifact) {
        return res.status(404).json({
          success: false,
          message: 'Artifact not found'
        });
      }
      res.status(200).json({
        success: true,
        data: artifact
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArtifactController();
